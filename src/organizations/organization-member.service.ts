import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { OrganizationMember } from './entities/organization-members.entity';

@Injectable()
export class OrganizationMemberService {
  constructor(
    @InjectRepository(OrganizationMember)
    private organizationMemberRepository: Repository<OrganizationMember>,
  ) {}

  addMemberToOrganization(addMemberInput: {
    organizationId: string;
    userId: string;
  }) {
    return this.organizationMemberRepository.save(addMemberInput);
  }

  findOne(payload = {}, options: FindOneOptions<OrganizationMember> = {}) {
    return this.organizationMemberRepository.findOne({
      where: payload,
      ...options,
    });
  }

  find(payload = {}, options: FindManyOptions<OrganizationMember> = {}) {
    return this.organizationMemberRepository.find({
      where: payload,
      ...options,
    });
  }

  remove(id: string) {
    return this.organizationMemberRepository.delete({ id });
  }
}
