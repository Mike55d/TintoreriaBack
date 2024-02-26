import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateEmailSettingsDto {
  @IsOptional()
  @IsString()
  @Expose()
  systemSignature?: string;

  @IsOptional()
  @IsString()
  systemDomain?: string;

  @IsString()
  @Expose()
  collectorMailbox: string;

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

  @IsString()
  @MaxLength(4096)
  @Expose()
  ticketTemplate: string;

  @IsString()
  @MaxLength(4096)
  @Expose()
  iocTemplate: string;
}
