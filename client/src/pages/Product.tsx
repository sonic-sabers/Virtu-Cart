import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { getProductInfo } from "../apis/api";
import Navbar from "../components/Navbar";
import Section1 from "../components/Product/Section1";
import { IRootState } from "../store/store";

const Product = () => {
  const dispatch = useDispatch();
  const { selectedProductId } = useSelector(
    (state: IRootState) => state.product
  );
  useEffect(() => {
    const fetchProductInfo = async () => {
      const res = await getProductInfo(dispatch, selectedProductId);
      if (typeof res === "string") {
        toast.warn(res);
      }
    };
    fetchProductInfo();
  }, []);
  return (
    <div className="flex flex-col">
      <Navbar />
      <Section1 />
      <ToastContainer theme="dark" />
    </div>
  );
};

export default Product;
