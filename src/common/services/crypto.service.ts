import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class CryptoService {
  encryptText(text: string, secretKey: string): string {
    const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
    const replaced = encrypted.replace(/\//g, 'slash');
    return replaced;
  }

  decryptText(encryptedText: string, secretKey: string): string {
    const decryptedText = encryptedText.replace(/slash/g, '/');
    const bytes = CryptoJS.AES.decrypt(decryptedText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
