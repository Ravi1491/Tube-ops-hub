import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';
import { Organization } from './entities/organization.entity';
import { generateRandomSlug } from 'src/utils/helper';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  create(createOrganizationInput: CreateOrganizationInput) {
    return this.organizationRepository.save(createOrganizationInput);
  }

  findOne(payload = {}, options: FindOneOptions<Organization> = {}) {
    return this.organizationRepository.findOne({
      where: payload,
      ...options,
    });
  }

  find(payload = {}, options: FindManyOptions<Organization> = {}) {
    return this.organizationRepository.find({
      where: payload,
      ...options,
    });
  }

  update(id: string, updateOrganizationInput: UpdateOrganizationInput) {
    return this.organizationRepository.update({ id }, updateOrganizationInput);
  }

  remove(id: string) {
    return this.organizationRepository.delete({ id });
  }

  async slugify() {
    return generateRandomSlug(this.organizationRepository);
  }
}
