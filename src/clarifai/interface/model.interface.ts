export interface CreateModelResponse {
  model: {
    id: string;
    name: string;
    created_at: string;
    modified_at: string;
    app_id: string;
    output_info: [{}];
    model_version: [{}];
    user_id: string;
    input_info: [{}];
    train_info: [{}];
    model_type_id: string;
    visibility: [{}];
    metadata: {};
    toolkits: [];
    use_cases: [];
    import_info: [{}];
  };
}

export interface ModelResponse {
  data: {
    modelId: string;
    name: string;
    appId: string;
    modelType: string;
    userId: string;
    updatedDate: string;
    id: string;
    createdDate: string;
  };
}
