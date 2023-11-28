import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class StartSessionDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  username: string;
  @IsString()
  @IsNotEmpty()
  @Expose()
  clientEphemeral: string;
}
