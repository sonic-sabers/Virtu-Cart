import { createSlice } from "@reduxjs/toolkit";
import { UserDets } from "../services/Props";

interface InitialProp {
  isLoggedIn: boolean;
  isLoading: boolean;
  active: number;
  userData: UserDets;
  token: string;
  activeUrl: string;
}

const initialState: InitialProp = {
  isLoggedIn: false,
  isLoading: false,
  active: 2,
  userData: {
    _id: "",
    name: "",
    email: "",
    img: "",
    productOrders: [],
    serviceOrders: [],
  },
  token: "",
  activeUrl: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setActiveUrl: (state, action) => {
      state.activeUrl = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    storeUserData: (state, action) => {
      state.userData = action.payload;
    },
    storeToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {
  setIsLoggedIn,
  setIsLoading,
  setActiveUrl,
  setActive,
  storeUserData,
  storeToken,
} = userSlice.actions;

export default userSlice.reducer;
