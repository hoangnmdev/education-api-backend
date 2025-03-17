import {
  IsEmail,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';

export class RegisterStudentsRequestDto {
  @IsEmail()
  @IsNotEmpty()
  teacher: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsEmail({}, { each: true })
  students: string[];
}
