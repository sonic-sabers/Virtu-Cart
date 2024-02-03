import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts, getProductsByCategory } from "../apis/api";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { setActive, setIsLoading } from "../store/userSlice";
import { IRootState } from "../store/store";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ProductsAll from "../components/ProductsAll";

const Products = () => {
  const [currentPath, setCurrentPath] = useState("");
  const { isLoading } = useSelector((state: IRootState) => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      if (id === "all") {
        const fetchProducts = async () => {
          dispatch(setIsLoading(true));
          const res = await getProducts(dispatch);
          if (typeof res === "string") {
            toast.warn(res);
          } else {
            dispatch(setIsLoading(false));
          }
        };
        fetchProducts();
      } else {
        const fetchProducts = async () => {
          dispatch(setIsLoading(true));
          const res = await getProductsByCategory(dispatch, id);
          if (typeof res === "string") {
            toast.warn(res);
          } else {
            dispatch(setIsLoading(false));
          }
        };
        fetchProducts();
      }
      const path = window.location.pathname;
      setCurrentPath(path);
  
      if (
        currentPath !== "" &&
        (currentPath === "/home" || currentPath === "/")
      ) {
        dispatch(setActive(3));
      }
    }
  }, [id]);

  return (
    <div className="w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="wrapper flex flex-col">
          <Navbar />
          <ProductsAll />
        </div>
      )}
      <ToastContainer theme="dark" />
    </div>
  );
};

export default Products;
