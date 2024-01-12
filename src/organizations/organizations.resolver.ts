import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';
import { CurrentUser } from 'src/auth/decorators/current-user';
import { User } from 'src/user/entities/user.entity';

@Resolver('Organization')
export class OrganizationsResolver {
  constructor(private readonly organizationsService: OrganizationsService) {}

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
      console.log(error);
    }
  }

  @Query('getMyOrganizations')
  getMyOrganizations(@CurrentUser() currentUser: User) {
    try {
      return this.organizationsService.find({ createdBy: currentUser.id });
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      console.log(error);
    }
  }

  @Mutation('updateOrganization')
  update(
    @CurrentUser() currentUser: User,
    @Args('id') id: string,
    @Args('updateOrganizationInput')
    updateOrganizationInput: UpdateOrganizationInput,
  ) {
    return this.organizationsService.update(id, updateOrganizationInput);
  }

  @Mutation('removeOrganization')
  async remove(@CurrentUser() currentUser: User, @Args('id') id: string) {
    await this.organizationsService.remove(id);
    return 'Organization removed successfully';
  }
}
