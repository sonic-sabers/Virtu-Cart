import { setSelectedProductId, storeProduct } from "../store/productsSlice";
import { setSelectedServiceId, storeService } from "../store/serviceSlice";
import {
  setActive,
  setIsLoggedIn,
  storeToken,
  storeUserData,
} from "../store/userSlice";

export const Logout = (dispatch: any, navigate: any) => {
  dispatch(setIsLoggedIn(false));
  dispatch(setActive(2));
  dispatch(storeUserData([]));
  dispatch(storeToken(""));
  dispatch(setSelectedProductId(""));
  dispatch(setSelectedServiceId(""));
  dispatch(
    storeProduct({
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
    })
  );
  dispatch(
    storeService({
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
    })
  );
  navigate("/");
};
