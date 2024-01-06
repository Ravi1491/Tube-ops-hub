import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.userRepository.save(createUserInput);
  }

  findOne(payload = {}, options: FindOneOptions<User> = {}) {
    return this.userRepository.findOne({
      where: payload,
      ...options,
    });
  }

  find(payload = {}, options: FindManyOptions<User> = {}) {
    return this.userRepository.find({
      where: payload,
      ...options,
    });
  }
}
