export class CustomException extends Error {
  constructor(
    message: string,
    public override name: string = "LambdaException",
    public code: number = 500
  ) {
    super(message);
  }
}

export class NotFoundException extends CustomException {
  constructor(message: string) {
    super(message, "NotFoundException", 404);
  }
}

export class BadRequestException extends CustomException {
  constructor(message: string) {
    super(message, "BadRequestException", 400);
  }
}

export class InternalServerException extends CustomException {
  constructor(message: string) {
    super(message, "InternalServerException", 500);
  }
}
