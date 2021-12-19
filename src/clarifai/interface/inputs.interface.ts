interface InputResponse {
  id: string;
  data: {
    image: {
      url: string;
      hosted: {
        prefix: string;
        suffix: string;
        sizes: string[];
      };
      image_info: {
        width: number;
        height: number;
        format: string;
        color_mode: string;
      };
    };
    concepts: [
      {
        id: string;
        name: string;
        value: number;
        app_id: string;
      },
    ];
  };
  created_at: string;
  modified_at: string;
  status: {
    code: number;
    description: string;
  };
}
