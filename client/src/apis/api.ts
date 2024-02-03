import axios from "axios";
import {
  LoginProp,
  ProdOrder,
  ServiceOrder,
  SignupProp,
} from "../services/Props";
import {
  storeBestSellingProduct,
  storeNewlyLaunchedProducts,
  storeProduct,
  storeProducts,
} from "../store/productsSlice";
import {
  storeBestSellingService,
  storeNewlyLaunchedServices,
  storeService,
  storeServices,
} from "../store/serviceSlice";
import { storeToken, storeUserData } from "../store/userSlice";
import { api_url } from "./helper";

export const SignupApi = async (formDets: SignupProp, dispatch: any) => {
  try {
    const res = await axios.post(`${api_url}/auth/signup`, {
      name: formDets.name,
      email: formDets.email,
      password: formDets.password,
    });
    dispatch(storeUserData(res.data.userData));
    dispatch(storeToken(res.data.token));
    return res.status;
  } catch (error: any) {
    return error.response.data;
  }
};
export const LoginApi = async (formDets: LoginProp, dispatch: any) => {
  try {
    const res = await axios.post(`${api_url}/auth/signin`, {
      email: formDets.email,
      password: formDets.password,
    });
    dispatch(storeUserData(res.data.userData));
    dispatch(storeToken(res.data.token));
    return res.status;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getBestSellingProd = async (dispatch: any) => {
  try {
    const res = await axios.get(`${api_url}/products/best/product`);
    dispatch(storeBestSellingProduct(res.data));
    return res.status;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getNewlyLaunchedProd = async (dispatch: any) => {
  try {
    const res = await axios.get(`${api_url}/products/new/products`);
    dispatch(storeNewlyLaunchedProducts(res.data));
    return res.status;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getProductsByCategory = async (
  dispatch: any,
  category: string
) => {
  try {
    const res = await axios.get(`${api_url}/products/category/${category}`);
    dispatch(storeProducts(res.data));
  } catch (error: any) {
    return error.response.data;
  }
};
export const getProducts = async (dispatch: any) => {
  try {
    const res = await axios.get(`${api_url}/products/all/products`);
    dispatch(storeProducts(res.data));
  } catch (error: any) {
    return error.response.data;
  }
};

export const getBestSellingService = async (dispatch: any) => {
  try {
    const res = await axios.get(`${api_url}/services/best/service`);
    dispatch(storeBestSellingService(res.data));
    return res.status;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getNewlyLaunchedService = async (dispatch: any) => {
  try {
    const res = await axios.get(`${api_url}/services/new/services`);
    dispatch(storeNewlyLaunchedServices(res.data));
    return res.status;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getServices = async (dispatch: any) => {
  try {
    const res = await axios.get(`${api_url}/services/all/services`);
    dispatch(storeServices(res.data));
  } catch (error: any) {
    return error.response.data;
  }
};

export const getProductInfo = async (dispatch: any, id: string) => {
  try {
    const res = await axios.get(`${api_url}/products/${id}`);
    dispatch(storeProduct(res.data));
    return res.status;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getServiceInfo = async (dispatch: any, id: string) => {
  try {
    const res = await axios.get(`${api_url}/services/${id}`);
    dispatch(storeService(res.data));
    return res.status;
  } catch (error: any) {
    return error.response.data;
  }
};

export const orderProducts = async (
  prodOrder: Array<ProdOrder>,
  userId: string,
  token: string,
  error: string
) => {
  try {
    const res = await axios.post(
      `${api_url}/products/sell`,
      {
        userId: userId,
        products: prodOrder,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.status;
  } catch (err: any) {
    error = err.response.data;
    return error;
  }
};
export const orderServices = async (
  serviceOrder: Array<ServiceOrder>,
  userId: string,
  token: string,
  error: string
) => {
  try {
    const res = await axios.post(
      `${api_url}/services/sell`,

      {
        userId: userId,
        services: serviceOrder,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.status;
  } catch (err: any) {
    error = err.response.data;
    return error;
  }
};

export const getUser = async (dispatch: any, id: string, token: string) => {
  try {
    const res = await axios.get(`${api_url}/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(storeUserData(res.data));
    return res.status;
  } catch (error: any) {
    return error.response.data;
  }
};
