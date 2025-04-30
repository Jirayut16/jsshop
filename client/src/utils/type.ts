export type FormProductType = {
  name: string;
  detail: string;
  price: number;
  discountPercent: number;
  file?: string; // file สามารถเป็น File หรือ string (path)
  category: string[];
  gender: string;
  size: string;
  color: string;
  tag: string[];
  _id?: string;
  stock: number;
  createdAt?: string;
};

export type FormEditProps = {
  name: string;
  detail: string;
  price: string;
  discountPercent: string;
  file?: string; // file สามารถเป็น File หรือ string (path)
  category: string[];
  gender: string;
  size: string;
  color: string;
  tag: string[];
  _id?: string;
  stock: number;
};

export type ReviewOneProductType = {
  comment: string;
  date: string;
  name: string;
  rating: number;
  _id: string | undefined;
};

export interface OrderType {
  date: string;
  item: [
    {
      productId: string;
      name: string;
      price: number;
      quantity: number;
      image: string;
    }
  ];
  status: string;
  totalPrice: number;
}
