import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsResolver } from './organizations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { OrganizationMember } from './entities/organization-members.entity';
import { OrganizationMemberService } from './organization-member.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, OrganizationMember])],
  providers: [
    OrganizationsResolver,
    OrganizationsService,
    OrganizationMemberService,
  ],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
