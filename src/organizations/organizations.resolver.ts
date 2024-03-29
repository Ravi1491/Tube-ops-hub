import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';
import { CurrentUser } from 'src/auth/decorators/current-user';
import { User } from 'src/user/entities/user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { getErrorCodeAndMessage } from 'src/utils/helper';
import { OrganizationMemberService } from './organization-member.service';

@Resolver('Organization')
export class OrganizationsResolver {
  constructor(
    private readonly organizationsService: OrganizationsService,
    private readonly organizationMemberService: OrganizationMemberService,
  ) {}

  @Mutation('createOrganization')
  async create(
    @CurrentUser() currentUser: User,
    @Args('createOrganizationInput')
    createOrganizationInput: CreateOrganizationInput,
  ) {
    try {
      const slug = await this.organizationsService.slugify();
      createOrganizationInput.slug = slug;
      createOrganizationInput.createdBy = currentUser.id;

      return this.organizationsService.create(createOrganizationInput);
    } catch (error) {
      throw new HttpException(
        getErrorCodeAndMessage(error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Query('getMyOrganizations')
  getMyOrganizations(@CurrentUser() currentUser: User) {
    try {
      return this.organizationsService.find({ createdBy: currentUser.id });
    } catch (error) {
      throw new HttpException(
        getErrorCodeAndMessage(error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Query('getOrganizationById')
  getOrganizationById(
    @CurrentUser() currentUser: User,
    @Args('id') id: string,
  ) {
    try {
      return this.organizationsService.findOne({ id });
    } catch (error) {
      throw new HttpException(
        getErrorCodeAndMessage(error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Query('getOrganizationBySlug')
  getOrganizationBySlug(
    @CurrentUser() currentUser: User,
    @Args('slug') slug: string,
  ) {
    try {
      return this.organizationsService.findOne({ slug });
    } catch (error) {
      throw new HttpException(
        getErrorCodeAndMessage(error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Mutation('updateOrganization')
  update(
    @CurrentUser() currentUser: User,
    @Args('id') id: string,
    @Args('updateOrganizationInput')
    updateOrganizationInput: UpdateOrganizationInput,
  ) {
    try {
      return this.organizationsService.update(id, updateOrganizationInput);
    } catch (error) {
      throw new HttpException(
        getErrorCodeAndMessage(error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Mutation('removeOrganization')
  async remove(@CurrentUser() currentUser: User, @Args('id') id: string) {
    try {
      await this.organizationsService.remove(id);
      return 'Organization removed successfully';
    } catch (error) {
      throw new HttpException(
        getErrorCodeAndMessage(error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Mutation('addOrganizationMember')
  async addOrganizationMember(
    @CurrentUser() currentUser: User,
    @Args('organizationId') organizationId: string,
    @Args('userId') userId: string,
  ) {
    try {
      await this.organizationMemberService.addMemberToOrganization({
        organizationId,
        userId,
      });

      return 'Member added successfully';
    } catch (error) {
      throw new HttpException(
        getErrorCodeAndMessage(error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Mutation('removeOrganizationMember')
  async removeOrganizationMember(
    @CurrentUser() currentUser: User,
    @Args('id') id: string,
  ) {
    try {
      await this.organizationMemberService.remove(id);
      return 'Member removed successfully';
    } catch (error) {
      throw new HttpException(
        getErrorCodeAndMessage(error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Query('getOrganizationMembers')
  getOrganizationMembers(
    @CurrentUser() currentUser: User,
    @Args('organizationId') organizationId: string,
  ) {
    try {
      return this.organizationMemberService.find({ organizationId });
    } catch (error) {
      throw new HttpException(
        getErrorCodeAndMessage(error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Query('getOrganizationMemberById')
  getOrganizationMemberById(
    @CurrentUser() currentUser: User,
    @Args('id') id: string,
  ) {
    try {
      return this.organizationMemberService.findOne({ id });
    } catch (error) {
      throw new HttpException(
        getErrorCodeAndMessage(error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
