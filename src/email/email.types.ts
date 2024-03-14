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
  conversationId?: string;
  
  from: {
    email: string;
    name: string
  };
  to: {
    email: string;
    name: string;
  }[]
}

export interface MsGraphMessage {
  subject: string;
  body: {
    contentType: string;
    content: string;
  };
  toRecipients: {
    emailAddress: {
      address: string;
    };
  }[];
  ccRecipients: {
    emailAddress: {
      address: string;
    };
  }[];
}
