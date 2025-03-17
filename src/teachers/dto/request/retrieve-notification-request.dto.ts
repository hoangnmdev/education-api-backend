import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RetrieveNotificationRequestDto {
  @IsNotEmpty()
  @IsEmail()
  teacher: string;

  @IsNotEmpty()
  @IsString()
  notification: string;
}
