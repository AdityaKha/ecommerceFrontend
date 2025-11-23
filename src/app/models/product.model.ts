export interface Product {
  id: string;
  brand: string;
  category: string;
  description: string;
  name: string;
  price: number;
  productAvailable: boolean;
  releaseDate: string;
  stockQuantity: number;
  imageName: string;
  imageType: string;
  imageData: File | null;
}
