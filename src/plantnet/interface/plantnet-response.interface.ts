export interface Response {
  query: {
    project: string;
    images: string[];
    organs: string[];
  };
  language: string;
  preferedReferential: string;
  results: Result[];
  remainingIdentificationRequests: number;
}

interface Result {
  score: number;
  species: {
    scientificNameWithoutAuthor: string;
    scientificNameAuthorship: string;
    genus: {
      scientificNameWithoutAuthor: string;
      scientificNameAuthorship: string;
    };
    family: {
      scientificNameWithoutAuthor: string;
      scientificNameAuthorship: string;
    };
    commonNames: string[];
  };
}

export interface Error {
  status: string;
  code: string;
  message: string;
}
