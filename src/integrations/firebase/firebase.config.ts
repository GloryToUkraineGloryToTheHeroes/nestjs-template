import * as firebase_admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { ConfigVariables } from '../../common/constants';

@Injectable()
export class FirebaseConfig {
  constructor(private readonly configService: ConfigService) {}

  initConnection() {
    const adminConfig: ServiceAccount = {
      clientEmail: this.configService.get<string>(ConfigVariables.FIREBASE_CLIENT_EMAIL),
      projectId: this.configService.get<string>(ConfigVariables.FIREBASE_PROJECT_ID),
      privateKey: this.configService.get<string>(ConfigVariables.FIREBASE_PRIVATE_KEY).replace(/\\n/g, '\n'),
    };

    firebase_admin.initializeApp({
      credential: firebase_admin.credential.cert(adminConfig),
    });
  }
}
