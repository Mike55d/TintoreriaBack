import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class GetMailboxFoldersDto {
    @Expose()
    mailbox: string;
}