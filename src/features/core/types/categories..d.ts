export interface categoriesResponse {
  status: string;
  message: string;
  data: Brand[];
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}
