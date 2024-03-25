import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { Contact } from './entities';
import { MailModule } from '../../integrations/mail/mail.module';
import { WhatsappModule } from '../../integrations/whatsapp/whatsapp.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contact]), ConfigModule, MailModule, WhatsappModule],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}
