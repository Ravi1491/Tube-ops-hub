import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyExistError extends HttpException {
  constructor() {
    super(
      {
        message: 'Email already exist',
        code: 'EMAIL_ALREADY_EXIST',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class UsernameAlreadyExistError extends HttpException {
  constructor() {
    super(
      {
        message: 'Username already exist',
        code: 'USERNAME_ALREADY_EXIST',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class UserNotExistError extends HttpException {
  constructor() {
    super(
      {
        message: 'User not exist',
        code: 'USER_NOT_EXIST',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class InvalidPasswordError extends HttpException {
  constructor() {
    super(
      {
        message: 'Invalid password',
        code: 'INVALID_PASSWORD',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
