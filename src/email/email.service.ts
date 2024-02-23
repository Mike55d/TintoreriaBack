import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import msal from '@azure/msal-node';
import { Email, MailboxFolder, MsGraphMessage } from './email.types';
import { CustomError } from '../errors/custom-error';
import { Errors } from '../errors/errors.types';
import { Ticket } from '../tickets/entities/ticket.entity';
import { EmailSettingsService } from './email-settings.service';
import { User } from '../users/entities/user.entity';
import { SettingsService } from '../settings/settings.service';

const baseUrl = 'https://graph.microsoft.com/v1.0';

@Injectable()
export class EmailService {
  constructor(
    private readonly emailSettingsService: EmailSettingsService,
    private readonly settingsService: SettingsService
  ) { }

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

  async getAllMailsInFolder(folder: MailboxFolder, token?: string) {
    const jwt = token || (await this.getToken());
    const url = `${baseUrl}/users/${folder.mailbox}/mailFolders/${folder.id}/messages`;

    let messages: AxiosResponse<any, any>;

    try {
      messages = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
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

  async moveMessage(
    mailbox: string,
    message: Email,
    destination: MailboxFolder,
    token?: string
  ) {
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

  async sendMail(from: string, to: string[], cc: string[], subject: string, content: string, saveToSentItems = true, token?: string) {
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

  async notify(ticket: Ticket, response: string = null, user: User = null, includeIoc = false) {
    const emailSettings: any = {}//await this.emailSettingsService.find();
    const ticketSettings = await this.settingsService.findAll();
    const ticketTemplate = emailSettings.ticketTemplate;
    const iocTemplate = emailSettings.iocTemplate;
    const socSignature = ticketSettings.signature;

    let finalHtml: string;

    if (response) {
      finalHtml =
        `<HTML><BODY>
        ${response}
        </br>
        ${includeIoc ? iocTemplate : ''}
        </br>
        ${user.profile.signature ?? ''}
      </HTML>`;
    } else {
      finalHtml =
        `<HTML>
        ${ticketTemplate}
        </br>
        ${includeIoc ? iocTemplate : ''}
        </br>
        ${socSignature ?? ''}
      </BODY></HTML>`;
    }


    
  }
}
