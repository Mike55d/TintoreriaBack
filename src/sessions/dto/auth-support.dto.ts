import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class AuthSupport {
  @IsString()
  @IsNotEmpty()
  @Expose()
  userApproval: string;
}
