export interface Data {
  title: string;
  price: number;
  Image: string;
  id: number;
}
export interface CartData extends Data {
  quantity: number;
}