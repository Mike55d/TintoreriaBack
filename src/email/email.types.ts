export interface MailboxFolder {
  mailbox: string;
  name: string;
  id: string;
  children: MailboxFolder[];
}

export interface Email {
  id: string;
  importance: string;
  content: string;
  sentDateTime: string;
  subject: string;
  from: {
    email: string;
    name: string
  };
  to: {
    email: string;
    name: string;
  }[]
}

interface MsGraphMessage {
  message: {
    subject: string;
    body: {
      contentType: string;
      content: string;
    };
    toRecipients: [{
      emailAddress: {
        address: string;
      };
    }];
    ccRecipients: [{
      emailAddress: {
        address: string;
      };
    }];
  };
  saveToSentItems: string;
}
