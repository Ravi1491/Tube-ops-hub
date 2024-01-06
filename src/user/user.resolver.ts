import { Response } from 'express';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { compare, genSalt, hash } from 'bcryptjs';

import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { generateJwtToken } from 'src/utils/jwt';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('signUp')
  async signup(
    @Args('signUpInput') createUserInput: CreateUserInput,
    @Context('res') res: Response,
  ) {
    try {
      const user = await this.userService.findOne({
        email: createUserInput.email,
      });

      if (user) {
        throw new Error('Email already exists');
      }

      const isUsernameExist = await this.userService.findOne({
        username: createUserInput.username,
      });

      if (isUsernameExist) {
        throw new Error('Username already exists');
      }

      const hashPassword = await hash(
        createUserInput.password,
        await genSalt(),
      );

      const payload = {
        name: createUserInput.name,
        username: createUserInput.username,
        email: createUserInput.email,
        password: hashPassword,
      };

      const createUser = await this.userService.create(payload);

      const jwtToken = await generateJwtToken({
        id: createUser.id,
        email: createUser.email,
      });

      res.cookie('access_token', jwtToken.token, {
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
        domain: 'localhost',
      });

      return createUser;
    } catch (error) {
      console.log(error);
    }
  }

  @Mutation('login')
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context('res') res: Response,
  ) {
    try {
      const user = await this.userService.findOne({ email });

      if (!user) {
        throw new Error("User doesn't exist");
      }

      const isValidPassword = await compare(password, user.password);

      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      const jwtToken = await generateJwtToken({
        id: user.id,
        email: user.email,
      });

      res.cookie('access_token', jwtToken.token, {
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
        domain: 'localhost',
      });

      console.log(jwtToken);

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  @Query('user')
  findOne(@Args('id') id: number) {
    return this.userService.findOne(id);
  }
}
