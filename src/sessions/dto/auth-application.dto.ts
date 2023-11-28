import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class AuthApplication {
  @IsString()
  @IsNotEmpty()
  @Expose()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  clientSecret: string;
}
