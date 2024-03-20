import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import msal from '@azure/msal-node';
import mustache from 'mustache';
import { Email, MailboxFolder, MsGraphMessage } from './email.types';
import { CustomError } from '../errors/custom-error';
import { Errors } from '../errors/errors.types';
import { Ticket } from '../tickets/entities/ticket.entity';
import { EmailSettingsService } from './email-settings.service';
import { User } from '../users/entities/user.entity';
import { SettingsService } from '../settings/settings.service';
import { Interval } from '@nestjs/schedule';
import { ClientsService } from '../clients/clients.service';
import { TicketsService } from '../tickets/tickets.service';
import { HistoricModule } from '../historic/historic.module';
import { UsersService } from '../users/users.service';

const baseUrl = 'https://graph.microsoft.com/v1.0';

@Injectable()
export class EmailService {
  constructor(
    private readonly emailSettingsService: EmailSettingsService,
    private readonly settingsService: SettingsService,
    private readonly clientsService: ClientsService,
    private readonly ticketsService: TicketsService,
    private readonly usersService: UsersService
  ) {}

  async onModuleInit() {
    // const token = await this.getToken();
    // const folders = await this.listMailFolders('carlos.alvarez@adv-ic.com', token);
    // const inbox = folders.find(x => x.name === 'Bandeja de entrada');
    // const folder1 = inbox.children.find(x => x.name === 'FOLDER 1');
    // const folder2 = inbox.children.find(x => x.name === 'FOLDER 2');
    // const messages = await this.getAllMailsInFolder(folder1, token);
    // await this.deleteMessage('carlos.alvarez@adv-ic.com', messages[0], token);
    // await this.moveMessage('carlos.alvarez@adv-ic.com', messages[1], folder2, token);
  }

  async getToken() {
    const msalConfig = {
      auth: {
        clientId: process.env.MS_APP_ID,
        clientSecret: process.env.MS_SECRET,
        authority: 'https://login.microsoftonline.com/' + process.env.MS_TENANT_ID
      }
    };

    const tokenRequest = {
      scopes: ['https://graph.microsoft.com/.default']
    };

    try {
      const cca = new msal.ConfidentialClientApplication(msalConfig);
      const tokenInfo = await cca.acquireTokenByClientCredential(tokenRequest);
      return tokenInfo.accessToken;
    } catch (e) {
      throw new CustomError(Errors.MS_LOGIN_FAILED);
    }
  }

  async listMailFolders(mailbox: string, token?: string) {
    const jwt = token || (await this.getToken());
    const url = `${baseUrl}/users/${mailbox}/mailFolders`;

    const mailboxFolders: MailboxFolder[] = [];

    try {
      const graphResponse = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      const mainFolders = graphResponse.data.value;
      for (const mainFolder of mainFolders) {
        const children: MailboxFolder[] = [];
        mailboxFolders.push({
          mailbox,
          name: mainFolder.displayName,
          id: mainFolder.id,
          children
        });

        const mainFolderChildren = await axios.get(`${url}/${mainFolder.id}/childFolders`, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });

        for (const subFolder of mainFolderChildren.data.value) {
          children.push({
            mailbox,
            name: subFolder.displayName,
            id: subFolder.id,
            children: []
          });
        }
      }
    } catch (e) {
      throw new CustomError(Errors.MS_GRAPH_REQUEST_FAILED);
    }

    return mailboxFolders;
  }

  async getAllMailsInFolder(folder: MailboxFolder, afterDate?: Date, token?: string) {
    const jwt = token || (await this.getToken());
    const url = `${baseUrl}/users/${folder.mailbox}/mailFolders/${folder.id}/messages`;

    let messages: AxiosResponse<any, any>;

    try {
      const options = {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      };

      if (afterDate) {
        options['$filter'] = `receivedDateTime ge ${afterDate}`;
      }
      
      messages = await axios.get(`${url}`, options);
    } catch (e) {
      throw new CustomError(Errors.MS_GRAPH_REQUEST_FAILED);
    }

    const finalMessages: Email[] = [];
    for (const x of messages.data.value) {
      finalMessages.push({
        content: x.body.content,
        sentDateTime: x.sentDateTime,
        id: x.id,
        importance: x.importance,
        subject: x.subject,
        conversationId: x.conversationId,
        from: {
          email: x.sender.emailAddress.address,
          name: x.sender.emailAddress.name
        },
        to: x.toRecipients.map(y => ({
          email: y.emailAddress.address,
          name: y.emailAddress.name
        }))
      });
    }

    return finalMessages;
  }

  async deleteMessage(mailbox: string, message: Email, token?: string) {
    const jwt = token || (await this.getToken());
    const url = `${baseUrl}/users/${mailbox}/messages/${message.id}`;

    try {
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
    } catch (e) {
      throw new CustomError(Errors.MS_GRAPH_REQUEST_FAILED);
    }
  }

  async moveMessage(mailbox: string, message: Email, destination: MailboxFolder, token?: string) {
    const jwt = token || (await this.getToken());
    const url = `${baseUrl}/users/${mailbox}/messages/${message.id}/move`;

    try {
      await axios.post(
        url,
        {
          destinationId: destination.id
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }
      );
    } catch (e) {
      throw new CustomError(Errors.MS_GRAPH_REQUEST_FAILED);
    }
  }

  async sendMail(
    from: string,
    to: string[],
    cc: string[],
    subject: string,
    content: string,
    saveToSentItems = true,
    token?: string
  ) {
    const message: MsGraphMessage = {
      subject,
      body: {
        contentType: 'html',
        content
      },
      toRecipients: to.map(x => ({
        emailAddress: {
          address: x
        }
      })),
      ccRecipients: cc.map(x => ({
        emailAddress: {
          address: x
        }
      }))
    };

    try {
      const jwt = token || (await this.getToken());
      const url = `${baseUrl}/users/${from}/sendMail`;

      await axios.post(
        url,
        {
          message,
          saveToSentItems
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }
      );
    } catch (e) {
      throw new CustomError(Errors.MS_GRAPH_REQUEST_FAILED);
    }
  }

  fillVariables(htmlTemplate: string, ticket: Ticket) {
    const timeBasedGreetings = (dateTime?: Date) => {
      const date = dateTime ?? new Date();
      const hour = date.getHours();

      if (hour > 5 && hour < 12) {
        return 'Buenos días';
      } else if (hour >= 12 && hour < 19) {
        return 'Buenas tardes';
      } else {
        return 'Buenas noches';
      }
    };

    return mustache.render(htmlTemplate, {
      ticketId: ticket.id,
      clientName: ticket.client.name,
      eventDate: 'HOUR',
      eventTime: 'TIME',
      eventDescription: ticket.description,
      impact: ticket.possibleImpact,
      recommendation: ticket.recommendation,
      timeBasedGreetings: timeBasedGreetings()
    });
  }

  async notify(ticket: Ticket, response: string = null, user: User = null, includeIoc = false) {
    const emailSettings = await this.emailSettingsService.find();
    const ticketSettings = await this.settingsService.find();
    const ticketTemplate = emailSettings.ticketTemplate;
    const iocTemplate = emailSettings.iocTemplate;
    const socSignature = ticketSettings.signature;

    if (includeIoc && !iocTemplate) {
      throw new CustomError(Errors.NO_IOC_TEMPLATE);
    }

    if (!response && !ticketTemplate) {
      throw new CustomError(Errors.NO_TICKET_TEMPLATE);
    }

    let htmlTemplate: string;

    if (response) {
      htmlTemplate = `<HTML><BODY>
        ${response}
        </br>
        ${includeIoc ? iocTemplate : ''}
        </br>
        ${user.profile.signature ?? ''}
      </BODY></HTML>`;
    } else {
      htmlTemplate = `<HTML><BODY>
        ${ticketTemplate}
        </br>
        ${includeIoc ? iocTemplate : ''}
        </br>
        ${socSignature ?? ''}
      </BODY></HTML>`;
    }

    const finalHtml = this.fillVariables(htmlTemplate, ticket);

    await this.sendMail(
      user.email,
      ticket.client.emails.split(','),
      [],
      ticket.title,
      finalHtml,
      true
    );
  }

  extractTicketId(subject: string) {
    const regex = /\[#ADV(\d+)\]/;
    const resultado = subject.match(regex);

    if (resultado && resultado[1]) {
      return parseInt(resultado[1], 10); 
    }

    return null;
  }

  async createTicketFromEmail(email: Email) {
    const domain = email.from.email.split('@')[1];
    const client = await this.clientsService.findByDomain(domain);
    const emailSettings = await this.emailSettingsService.find();

    if (!client) {
      return null;
    }

    const ticketId = this.extractTicketId(email.subject);
    let ticket: Ticket = null;

    if (ticketId) {
      ticket = await this.ticketsService.findOne(ticketId);
    } else {
      ticket = await this.ticketsService.findByConversationId(email.conversationId)
    }

    if (!ticket) {
      ticket = await this.ticketsService.create(-1, {
        client: client.id,
        impact: 1,
        priority: 1,
        status: 1,
        title: email.subject,
        type: 1,
        urgency: 1,
        conversationId: email.conversationId,
        comments: [
          {
            comment: 'Ticket creado por mail collector'
          }
        ]
      });

      ticket = await this.ticketsService.findOne(ticket.id);

      if (emailSettings.collectorAutoResponse) {
        const systemUser = await this.usersService.findOne(-1);
        await this.sendMail(
          systemUser.email,
          ticket.client.emails.split(','),
          [],
          ticket.title,
          this.fillVariables(emailSettings.collectorResponse, ticket),
          true
        );
      } 
    }

    if (!ticket) {
      return null;
    }

    await this.ticketsService.replyTicket({
      content: email.content,
      ticket: ticket.id,
      title: "Cliente escribe",
      email: email.from.email
    });
  }

  @Interval(10000)
  async mailCollectorJob() {
    try {
      const emailSettings = await this.emailSettingsService.find();
      
      if (!emailSettings.collectorEnabled) {
        return;
      }

      const mailbox = `${emailSettings.collectorMailbox}@${emailSettings.systemDomain}`;
      const mailFolder: MailboxFolder = {
        id: emailSettings.collectorFolderId,
        name: emailSettings.collectorFolderName,
        children: [],
        mailbox
      };

      let lastEmailDatetime = emailSettings.lastEmailDatetime;
      const messages = await this.getAllMailsInFolder(mailFolder, lastEmailDatetime);

      for(const x of messages) {
        await this.createTicketFromEmail(x);

        if (new Date(x.sentDateTime) > lastEmailDatetime) {
          lastEmailDatetime = new Date(x.sentDateTime);
        }
      }

      await this.emailSettingsService.update({
        lastEmailDatetime
      });

      for(const x of messages) {
        await this.deleteMessage(mailFolder.mailbox, x);
      }
    } catch(e) {
      console.log("Error en mail collector: " + e);
    }
  }
}
