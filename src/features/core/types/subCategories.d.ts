export interface subCategoriesResponse {
  status: string;
  message: string;
  data: subCategory[];
}

export interface subCategory {
  id: number;
  name: string;
  category_id: number;
}
