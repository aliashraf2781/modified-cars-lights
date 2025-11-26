export interface ProductsResponse {
  status: string;
  message: string;
  data: Product[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  content: string;
  video: string;
  lights_category: LightsCategory;
  car_category: CarCategory;
}

export interface LightsCategory {
  id: number;
  name: string;
}

export interface CarCategory {
  id: number;
  name: string;
}
