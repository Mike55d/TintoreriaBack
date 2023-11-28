import { Expose } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ConfirmSessionDto {
    @IsString()
    @IsNotEmpty()
    @Expose()
    clientSessionProof: string;

    @IsNumber()
    @IsNotEmpty()
    @Expose()
    presessionId: number;
}
