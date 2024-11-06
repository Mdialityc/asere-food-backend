import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class RegisterInDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[0-9])/, {
    message: 'password must contain at least one number.',
  })
  @Matches(/(?=.*\W)/, {
    message: 'password must contain at least one special character.',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'password must contain at least one uppercase letter.',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;
}