import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { ConfigVariables, SALT } from '../constants';

@Injectable()
export class BcryptService {
  constructor(private readonly configService: ConfigService) {}

  async hashPassword(envKey: string): Promise<string> {
    const plaintextPassword: string = this.configService.get<string>(envKey);

    return bcrypt.hash(plaintextPassword, SALT);
  }

  async validateHash(text: string, envKey: string): Promise<boolean> {
    const plaintextPassword: string = this.configService.get<string>(envKey);

    return bcrypt.compare(plaintextPassword, text);
  }
}
