import { FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { PaginationDto, PaginationMetaDto, skip } from '../../common/typeorm-options';
import { GetContactsByFiltersDto } from './dto/get-contacts-by-filters.dto';
import { ContactRegistrationDto } from './dto/registration-contact.dto';
import { Branch } from '../branch/entities';
import { mapFindOptions } from './mappers';
import { Contact } from './entities';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async findByFilters({ relations, ...filters }: GetContactsByFiltersDto): Promise<PaginationDto<Contact>> {
    const { page, take, sort, select, ...options } = filters;

    const whereOptions: FindOptionsWhere<Contact> = mapFindOptions(options);

    const [data, itemCount] = await this.contactRepository.findAndCount({
      where: whereOptions,
      skip: skip(page, take),
      order: sort,
      relations,
      select,
      take,
    });

    return new PaginationDto<Contact>(data, new PaginationMetaDto({ itemCount, PaginationOptionsDto: filters }));
  }

  async findByIdOrFail(id: number, { relations, ...filters }: GetContactsByFiltersDto): Promise<Contact> {
    const { page, take, select, ...options } = filters;

    const whereOptions: FindOptionsWhere<Contact> = mapFindOptions(options);

    return this.contactRepository.findOneOrFail({
      where: { ...whereOptions, id },
      relations,
      select,
    });
  }

  async createContact(createContactDto: ContactRegistrationDto): Promise<Contact> {
    let branch: Branch = createContactDto.branch;

    if (typeof createContactDto.branch == 'number') {
      branch = await this.branchRepository.findOneOrFail({
        where: { id: Number(createContactDto.branch) },
        relations: ['organization'],
      });
    }

    const contact: Contact = this.contactRepository.create(createContactDto);

    return this.contactRepository.save(contact);
  }

  async updateById(id: number, payload: Partial<Contact>): Promise<UpdateResult> {
    return this.contactRepository.update({ id }, payload);
  }

  async deleteById(id: number): Promise<void> {
    await this.contactRepository.delete({ id });
  }
}
