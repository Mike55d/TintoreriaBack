import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateEmailSettingsDto {
  @IsString()
  @Expose()
  mailbox: string;

  @IsString()
  @Expose()
  folderId: string;

  @IsString()
  @Expose()
  ticketTemplate: string;

  @IsString()
  @Expose()
  iocTemplate: string;
}
