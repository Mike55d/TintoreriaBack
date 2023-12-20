import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class StartMicrosoftSessionDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImRldiI6Ijg0ODM5MTc3LTNhYjItNDI4ZC04YWExLWQ3MmRlN2VkOTA3YyIsImV4cCI6MzAwLCJ0b2siOiJjNGIxNzY0Yy1lMWNlLTQwMGYtYTkxZC1mZTM4YzBmYzAyZWEiLCJpYXQiOjE3MDEyOTE1NjB9.Hm77b_BlCopaCaxtU7R0NBr0sAJXhTJGhBmebC_t24k'
  })
  @IsString()
  @Expose()
  accessToken: string;
}
