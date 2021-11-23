export class AddInputsDto {
  base64?: string;
  url?: string;
  concept: string;  
}

export class UpdateInputsDto {
  id: string;
  concept: string;
}
