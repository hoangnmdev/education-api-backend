import { IsEmail, IsNotEmpty } from 'class-validator';

export class SuspendStudentRequestDto {
  @IsEmail()
  @IsNotEmpty()
  student: string;
}
