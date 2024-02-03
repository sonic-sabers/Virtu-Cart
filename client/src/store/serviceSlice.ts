import { createSlice } from "@reduxjs/toolkit";
import {
  BestSellingService,
  NewlyLauncedServices,
  ServicesProp,
} from "../services/Props";

interface InitialProp {
  bestSellingService: Array<BestSellingService>;
  newlyLaunchedServices: Array<NewlyLauncedServices>;
  services: Array<ServicesProp>;
  service: ServicesProp;
  selectedServiceId: string;
}

const initialState: InitialProp = {
  bestSellingService: [],
  newlyLaunchedServices: [],
  services: [],
  service: {
    _id: "",
    title: "",
    description: "",
    price: -1,
    about: [],
    box: [],
    rating: -1,
    stock: -1,
    providedBy: "",
    category: "",
    thumbnail: "",
    images: [],
    createdAt: "",
    updatedAt: "",
    quantity: 0,
  },
  selectedServiceId: "",
};

export const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setSelectedServiceId: (state, action) => {
      state.selectedServiceId = action.payload;
    },
    storeBestSellingService: (state, action) => {
      state.bestSellingService = action.payload;
    },
    storeNewlyLaunchedServices: (state, action) => {
      state.newlyLaunchedServices = action.payload;
    },
    storeServices: (state, action) => {
      state.services = action.payload;
    },

    storeService: (state, action) => {
      state.service = action.payload;
    },
  },
});

export const {
  setSelectedServiceId,
  storeBestSellingService,
  storeNewlyLaunchedServices,
  storeServices,
  storeService,
} = serviceSlice.actions;

export default serviceSlice.reducer;
