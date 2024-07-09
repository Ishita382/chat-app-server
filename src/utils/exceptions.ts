import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(
    message: string,
    name: string = 'InternalServerError',
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    cause: unknown = new Error(),
  ) {
    super(
      {
        message,
        name,
        statusCode: status,
      },
      status,
      { cause },
    );
  }
}

export class Unauthorized extends CustomException {
  constructor() {
    super('Unauthorized', 'Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
