export interface SignupProp {
  name: string;
  email: string;
  password: string;
}
export interface LoginProp {
  email: string;
  password: string;
}

export interface UserDets {
  _id: string;
  name: string;
  img: string;
  email: string;
  productOrders: Array<ProductOrderProp>;
  serviceOrders: Array<ServiceOrderProp>;
}

export interface BestSellingProduct {
  _id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  brand: string;
  thumbnail: string;
}

export interface NewlyLauncedProducts {
  _id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  brand: string;
  thumbnail: string;
}

export interface ProductsProp {
  _id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  about: [];
  box: [];
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: [];
  createdAt: string;
  updatedAt: string;
  quantity: 0;
}

export interface ServicesProp {
  _id: string;
  title: string;
  description: string;
  price: number;
  about: [];
  box: [];
  rating: number;
  stock: number;
  providedBy: string;
  category: string;
  thumbnail: string;
  images: [];
  createdAt: string;
  updatedAt: string;
  quantity: 0;
}

export interface BestSellingService {
  _id: string;
  title: string;
  description: string;
  price: number;
  providedBy: string;
  thumbnail: string;
}

export interface NewlyLauncedServices {
  _id: string;
  title: string;
  description: string;
  price: number;
  providedBy: string;
  thumbnail: string;
}

export interface ProdOrder {
  _id: string;
  quantity: number;
}
export interface ServiceOrder {
  _id: string;
  quantity: number;
}

export interface ProductOrderProp {
  _id: string;
  title: string;
  price: number;
  brand: string;
  thumbnail: string;
  date: number;
  quantity: number;
}
export interface ServiceOrderProp {
  _id: string;
  title: string;
  price: number;
  brand: string;
  thumbnail: string;
  date: number;
  quantity: number;
}
