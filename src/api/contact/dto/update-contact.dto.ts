import { IsOptional, IsString, IsEmail, IsPhoneNumber, IsBoolean } from 'class-validator';

import { ERROR_MESSAGES } from '../constants/contact.enum';

export class UpdateContactDto {
  @IsOptional()
  @IsString({ message: ERROR_MESSAGES.ERROR_INVALID_FIRST_NAME_FORMAT })
  readonly firstName?: string;

  @IsOptional()
  @IsString({ message: ERROR_MESSAGES.ERROR_INVALID_LAST_NAME_FORMAT })
  readonly lastName?: string;

  @IsOptional()
  @IsEmail({}, { message: ERROR_MESSAGES.ERROR_INVALID_EMAIL_FORMAT })
  readonly email?: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber(null, { message: ERROR_MESSAGES.ERROR_INVALID_PHONE_FORMAT })
  readonly phone?: string;

  @IsOptional()
  @IsBoolean({ message: ERROR_MESSAGES.ERROR_INVALID_ISPRIMARY_FORMAT })
  readonly isPrimary?: boolean;
}
