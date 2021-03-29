// tslint:disable:max-classes-per-file
export class BadRequest extends Error {
   public name = 'BadRequest';
}

export class NotFound extends Error {
   public name = 'NotFound';
}

export class InvalidArgument extends Error {
   public name = 'InvalidArgument';
}

export class Unauthorized extends Error {
   public name = 'Unauthorized';
}
