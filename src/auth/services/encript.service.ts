import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class EncryptionService {
    constructor(private readonly configService:ConfigService){}
  encryptPassword(password: string): string {
    return CryptoJS.AES.encrypt(password, this.configService.get<string>('ENCRYPT_SECRET_KEY')).toString();
  }

  decryptPassword(encryptedPassword: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, this.configService.get<string>('ENCRYPT_SECRET_KEY'));
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}