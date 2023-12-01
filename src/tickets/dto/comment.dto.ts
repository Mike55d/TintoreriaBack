import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CommentDto {
  @Expose()
  @IsString()
  comment: string;
}
