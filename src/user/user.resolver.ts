import { Response } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcryptjs';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';

import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { generateJwtToken } from 'src/utils/jwt';
import { Public } from 'src/auth/decorators/public';
import { getErrorCodeAndMessage } from 'src/utils/helper';
import {
  EmailAlreadyExistError,
  InvalidPasswordError,
  UserNotExistError,
  UsernameAlreadyExistError,
} from 'src/utils/errors';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Public()
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
        throw new EmailAlreadyExistError();
      }

      const isUsernameExist = await this.userService.findOne({
        username: createUserInput.username,
      });

      if (isUsernameExist) {
        throw new UsernameAlreadyExistError();
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
      throw new HttpException(
        getErrorCodeAndMessage(error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Public()
  @Mutation('login')
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context('res') res: Response,
  ) {
    try {
      const user = await this.userService.findOne({ email });

      if (!user) {
        throw new UserNotExistError();
      }

      const isValidPassword = await compare(password, user.password);

      if (!isValidPassword) {
        throw new InvalidPasswordError();
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
      throw new HttpException(
        getErrorCodeAndMessage(error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Query('user')
  findOne(@Args('id') id: number) {
    return this.userService.findOne(id);
  }
}
