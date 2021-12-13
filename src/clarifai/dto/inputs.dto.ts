export class BaseDto {
  appId: string;
  userId: string;
}

export class AddInputsDto extends BaseDto {
  concept: string;
  base64?: string;
  url?: string;
}

export class UpdateInputsDto extends BaseDto {
  id: string;
  concept: string;
}

export class InputDto {
  base64: string;
}

export class UserDto {
  appId: string;
  userId: string;
}
