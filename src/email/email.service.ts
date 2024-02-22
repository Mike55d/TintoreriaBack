import { Injectable } from '@nestjs/common';
import axios from 'axios';
import msal from '@azure/msal-node';
import { Email, MailboxFolder } from './email.types';
import { CustomError } from '../errors/custom-error';
import { Errors } from '../errors/errors.types';

const baseUrl = 'https://graph.microsoft.com/v1.0';

@Injectable()
export class EmailService {
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

    const cca = new msal.ConfidentialClientApplication(msalConfig);
    const tokenInfo = await cca.acquireTokenByClientCredential(tokenRequest);
    return tokenInfo.accessToken;
  }

  async listMailFolders(mailbox: string, token?: string) {
    const jwt = token || (await this.getToken());
    const url = `${baseUrl}/users/${mailbox}/mailFolders`;
    const graphResponse = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

    const mailboxFolders: MailboxFolder[] = [];

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

    return mailboxFolders;
  }

  async getAllMailsInFolder(folder: MailboxFolder, token?: string) {
    const jwt = token || (await this.getToken());
    const url = `${baseUrl}/users/${folder.mailbox}/mailFolders/${folder.id}/messages`;

    const messages = await axios.get(`${url}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

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
      throw new CustomError(Errors.INTERNAL_ERROR);
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
      throw new CustomError(Errors.INTERNAL_ERROR);
    }
  }
}
