export interface IProductModel {
  id: number;
  title: string; //required
  description: string;
  price: number; // required
  brand: string; // required
  category: string; // required
  image: string;
}
