import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class StartSessionDto {
  @ApiProperty({
    example: 'admin1234'
  })
  @IsString()
  @IsNotEmpty()
  @Expose()
  username: string;

  @ApiProperty({
    example: '4c33af2145ad30d08a39b17f9206194ea0fbf8b684153d32788845ab7770c559'
  })
  @IsString()
  @IsNotEmpty()
  @Expose()
  clientEphemeral: string;
}
