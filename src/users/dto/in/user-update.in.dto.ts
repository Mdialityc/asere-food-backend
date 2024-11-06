import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { Role } from '../../../auth/decorators/roles.decorator';

export default class UserUpdateInDto {
  @ApiProperty({required: false})
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  username?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(Role)
  role?: Role;

  @ApiProperty({required: false})
  @IsOptional()
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
  password?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isActive?: boolean;
}