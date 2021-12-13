import { Expose } from 'class-transformer';

export class Status {
  @Expose()
  code: number;
  @Expose()
  description: string;
  @Expose()
  req_id?: string;
}

export class BaseResponse {
  @Expose()
  status: Status;
}

class Hosted {
  @Expose()
  prefix: string;
  @Expose()
  suffix: string;
  @Expose()
  sizes: string[];
}

class ImageInfo {
  @Expose()
  width: number;
  @Expose()
  height: number;
  @Expose()
  format: string;
  @Expose()
  color_mode: string;
}

export class Concept {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  value: number;
  @Expose()
  app_id: string;
}

export class Image {
  @Expose()
  url: string;
  @Expose()
  hosted: Hosted;
  @Expose()
  image_info: ImageInfo;
}

export class Data {
  @Expose()
  image: Image;
  @Expose()
  image_info: ImageInfo;
}

export class Input extends BaseResponse {
  @Expose()
  id: string;
  @Expose()
  data: Data;
  @Expose()
  concepts?: Concept[];
  @Expose()
  created_at: string;
  @Expose()
  modified_at: string;
  @Expose()
  status: Status;
}

export class OutputConfig {
  @Expose()
  concepts_mutually_exclusive: boolean;
  @Expose()
  closed_environment: boolean;
  @Expose()
  max_concepts: number;
  @Expose()
  min_value: number;
}

class Parameters {
  @Expose()
  max_concepts: number;
  @Expose()
  select_concepts: any[];
}

class OutputInfo {
  @Expose()
  output_config: OutputConfig;
  @Expose()
  message: string;
  @Expose()
  type: string;
  @Expose()
  type_ext: string;
  @Expose()
  params: Parameters;
}

class Visibility {
  @Expose()
  gettable: number;
}

export class ModelVersion {
  @Expose()
  id: string;
  @Expose()
  created_at: string;
  @Expose()
  status: Status;
  @Expose()
  active_concept_count: number;
  @Expose()
  visibility: Visibility;
  @Expose()
  app_id: string;
  @Expose()
  user_id: string;
  @Expose()
  metadata: any;
}
export class Model {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  created_at: string;
  @Expose()
  modified_at: string;
  @Expose()
  app_id: string;
  @Expose()
  output_info: OutputInfo;
  @Expose()
  model_version: ModelVersion;
  @Expose()
  user_id: string;
  @Expose()
  input_info: any;
  @Expose()
  train_info: any;
  @Expose()
  model_type_id: string;
  @Expose()
  visibility: Visibility;
  @Expose()
  metadata: any;
  @Expose()
  toolkits: any[];
  @Expose()
  use_cases: any[];
  @Expose()
  import_info: any;
}
export class ModelResponse extends BaseResponse {
  @Expose()
  model: Model;
}

export class AllModels {
  @Expose()
  models: Model[];
}

export class UpdateRO extends BaseResponse {
  @Expose()
  inputs: Input[];
}

export class CreateModelResponse {
  @Expose()
  modelId: string;
  @Expose()
  name: string;
  @Expose()
  appId: string;
  @Expose()
  modelType: string;
  @Expose()
  userId: string;
  @Expose()
  updatedDate: string;
  @Expose()
  id: string;
  @Expose()
  createdDate: string;
}
