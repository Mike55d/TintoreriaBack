import { Expose } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateEmailSettingsDto {
  @IsOptional()
  @IsString()
  @Expose()
  systemSignature?: string;

  @IsOptional()
  @IsString()
  systemDomain?: string;

  @IsOptional()
  @IsString()
  @Expose()
  collectorMailbox: string;

  @IsOptional()
  @IsString()
  @Expose()
  collectorFolderId: string;

  @IsOptional()
  @IsString()
  @Expose()
  collectorFolderName?: string;

  @IsOptional()
  @IsBoolean()
  @Expose()
  collectorEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  @Expose()
  collectorAutoResponse?: boolean;

  @IsOptional()
  @IsString()
  @Expose()
  ticketTemplate: string;

  @IsOptional()
  @IsString()
  @MaxLength(8192)
  @Expose()
  collectorResponse: string;

  @IsOptional()
  @IsString()
  @MaxLength(8192)
  @Expose()
  iocTemplate: string;

  lastEmailDatetime: Date;
}
