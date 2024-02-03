import { createSlice } from "@reduxjs/toolkit";
import {
  BestSellingProduct,
  NewlyLauncedProducts,
  ProductsProp,
} from "../services/Props";

interface InitialProp {
  bestSellingProduct: Array<BestSellingProduct>;
  newlyLaunchedProducts: Array<NewlyLauncedProducts>;
  products: Array<ProductsProp>;
  product: ProductsProp;
  selectedProductId: string;
}

const initialState: InitialProp = {
  bestSellingProduct: [],
  newlyLaunchedProducts: [],
  products: [],
  product: {
    _id: "",
    title: "",
    description: "",
    originalPrice: -1,
    discountedPrice: -1,
    box: [],
    about: [],
    rating: -1,
    stock: -1,
    brand: "",
    category: "",
    thumbnail: "",
    images: [],
    createdAt: "",
    updatedAt: "",
    quantity: 0,
  },
  selectedProductId: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProductId: (state, action) => {
      state.selectedProductId = action.payload;
    },
    storeBestSellingProduct: (state, action) => {
      state.bestSellingProduct = action.payload;
    },
    storeNewlyLaunchedProducts: (state, action) => {
      state.newlyLaunchedProducts = action.payload;
    },
    storeProducts: (state, action) => {
      state.products = action.payload;
    },
    storeProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const {
  setSelectedProductId,
  storeBestSellingProduct,
  storeNewlyLaunchedProducts,
  storeProducts,
  storeProduct,
} = productSlice.actions;

export default productSlice.reducer;
