import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber, IsOptional, IsBoolean, IsInt } from 'class-validator';

import { ERROR_MESSAGES } from '../constants/contact.enum';
import { Branch } from '../../branch/entities';

export class ContactRegistrationDto {
  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.ERROR_FIRST_NAME_REQUIRED })
  readonly firstName: string;

  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.ERROR_LAST_NAME_REQUIRED })
  readonly lastName: string;

  @IsEmail({}, { message: ERROR_MESSAGES.ERROR_INVALID_EMAIL_FORMAT })
  readonly email: string;

  @IsString()
  @IsPhoneNumber(null, { message: ERROR_MESSAGES.ERROR_INVALID_PHONE_FORMAT })
  readonly phone: string;

  @IsOptional()
  @IsInt()
  readonly branch?: Branch;

  @IsOptional()
  @IsBoolean({ message: ERROR_MESSAGES.ERROR_INVALID_ISPRIMARY_FORMAT })
  readonly isPrimary?: boolean;
}
