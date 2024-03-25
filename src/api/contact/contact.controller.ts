import {
  Controller,
  UseGuards,
  Delete,
  Param,
  Patch,
  Query,
  Body,
  Get,
  Post,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';

import { GetContactsByFiltersDto } from './dto/get-contacts-by-filters.dto';
import { ContactRegistrationDto } from './dto/registration-contact.dto';
import { TransformQueryInterceptor } from '../../common/interceptors';
import { PaginationDto } from '../../common/typeorm-options';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactService } from './contact.service';
import { Contact } from './entities';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  @UseInterceptors(TransformQueryInterceptor)
  async getAllContacts(@Query() query: GetContactsByFiltersDto): Promise<PaginationDto<Contact>> {
    return this.contactService.findByFilters(query);
  }

  @Get(':id')
  @UseInterceptors(TransformQueryInterceptor)
  async getContactById(@Param('id') id: number, @Query() query: GetContactsByFiltersDto): Promise<Partial<Contact>> {
    return this.contactService.findByIdOrFail(id, query);
  }

  @Post()
  async createContact(@Body() createContactDto: ContactRegistrationDto): Promise<Contact> {
    return this.contactService.createContact(createContactDto);
  }

  @Patch(':id')
  async updateContact(@Param('id') id: number, @Body() payload: UpdateContactDto): Promise<UpdateResult> {
    return this.contactService.updateById(id, payload);
  }

  @Delete(':id')
  async deleteContact(@Param('id') id: number): Promise<void> {
    return this.contactService.deleteById(id);
  }
}
