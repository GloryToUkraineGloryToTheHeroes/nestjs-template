import { Between, FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

import { GetContactsByFiltersDto } from '../dto/get-contacts-by-filters.dto';
import { idSearchMapper, textSearchMapper } from '../../../common/mappers';
import { Contact } from '../entities';

import * as branchQueryMappers from '../../branch/mappers/query.mapper';
import * as orderQueryMappers from '../../order/mappers/query.mapper';

export const mapFindOptions = (options: GetContactsByFiltersDto): FindOptionsWhere<Contact> => {
  return options
    ._remap<GetContactsByFiltersDto, FindOptionsWhere<Contact>>(idSearchMapper, ['id'])
    ._remap<GetContactsByFiltersDto, FindOptionsWhere<Contact>>(textSearchMapper, [
      'firstName',
      'lastName',
      'phone',
      'email',
    ])
    ._range<GetContactsByFiltersDto, FindOptionsWhere<Contact>>(
      Between,
      ['createdAtMin'],
      ['createdAtMax'],
      ['createdAt'],
    )
    ._remap<GetContactsByFiltersDto, FindOptionsWhere<Contact>>(MoreThanOrEqual, ['createdAtMin'], ['createdAt'])
    ._remap<GetContactsByFiltersDto, FindOptionsWhere<Contact>>(LessThanOrEqual, ['createdAtMax'], ['createdAt'])
    ._chain<FindOptionsWhere<Contact>>(branchQueryMappers.mapFindOptions, 'branch')
    ._chain<FindOptionsWhere<Contact>>(orderQueryMappers.mapFindOptions, 'orders');
};
