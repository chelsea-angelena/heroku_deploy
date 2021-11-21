interface Response {
  meta_data: {
    latitude: string | null;
    longitude: null;
  };
  images: Image[];
  suggestions: Suggestion[];
  is_plant_probability: string;
  is_plant: boolean;
  health_assessment: {
    is_healthy_probability: string;
    is_healthy: boolean;
    diseases: DISEASE[];
    diseases_simple: SIMPLE_DISEASE[]
  }
}

interface Image {
  file_name: string;
  url: string;
}

interface Suggestion {
  plant_name: string;
  plant_details: {
    common_names: string[];
    edible_parts: string[];

    propagation_methods: string[];

    taxonomy: {
      class: string;
      family: string;
      genus: string;
    };
    url: string;
    wiki_description: {
      value: string;
    };
    wiki_image: {
      value: string;
    }
  };
  probability: string;
  confirmed: boolean;
  similar_images: SIMILAR_IMAGES[]

}

interface SIMILAR_IMAGES {
  similarity: string;
  url: string;
}

interface DISEASE {
  classification: string[];
  name: string;
  probability: string;
};

interface SIMPLE_DISEASE {
  name: string;
  probability: string;
}