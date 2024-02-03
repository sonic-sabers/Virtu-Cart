import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBestSellingProd } from "../apis/api";
import { FindTax } from "../services/Tax";
import { addCartProducts, addCost } from "../store/cartSlice";
import { IRootState } from "../store/store";
import { setIsLoading } from "../store/userSlice";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { setSelectedProductId } from "../store/productsSlice";

const HeroProd = () => {
  const { bestSellingProduct } = useSelector(
    (state: IRootState) => state.product
  );
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBestProd = async () => {
      dispatch(setIsLoading(true));
      const res = await getBestSellingProd(dispatch);
      if (typeof res === "string") {
        toast.warn(res);
      } else {
        dispatch(setIsLoading(false));
      }
    };
    fetchBestProd();
  }, []);
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const amount =
      bestSellingProduct &&
      bestSellingProduct[0].discountedPrice &&
      bestSellingProduct[0].discountedPrice +
        FindTax("product", bestSellingProduct[0].discountedPrice).tax;
    dispatch(addCost(amount));
    dispatch(addCartProducts(bestSellingProduct[0]));
    toast.success("Item added to cart");
  };
  return (
    <div className="h-[100vh] w-full flex flex-col justify-center items-center">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="wrapper w-[95%] h-[100vh] mt-[20vh] mx-auto flex flex-col items-center justify-between pt-5">
          <div className="top flex flex-col gap-5 md:gap-8 sm:w-[60%] xl:w-[40%]">
            <h1 className="text-[2.5rem] xl:text-[3.5rem] font-[600] text-center">
              {Object.keys(bestSellingProduct).length !== 0
                ? bestSellingProduct[0].title
                : "Getting Data..."}
            </h1>
            <h1 className="text-center text-[0.85rem] md:text-[1.2rem] xl:text-[1.2rem]">
              {Object.keys(bestSellingProduct).length !== 0
                ? bestSellingProduct[0].description
                : "Getting Data..."}
            </h1>
            <div className="links flex w-full items-center justify-evenly">
              <h1 className="text-[#09dd6d] text-[1.2rem] md:text-[1.5rem] xl:text-[1.3rem]  font-[500] cursor-pointer"
              onClick={(e)=>{
                e.preventDefault();
                dispatch(setSelectedProductId(bestSellingProduct[0]._id));
                navigate(`/product/${bestSellingProduct[0].title}`);
              }}
              >
                Learn More {">"}
              </h1>
              <h1
                className="text-[#09dd6d] text-[1.2rem] md:text-[1.5rem] xl:text-[1.3rem] font-[500] cursor-pointer"
                onClick={(e) => handleClick(e)}
              >
                {"+ "}Cart {">"}
              </h1>
            </div>
          </div>
          <div className="bottom">
            <img
              src={
                bestSellingProduct &&
                bestSellingProduct[0] &&
                bestSellingProduct[0].thumbnail
              }
              loading="lazy"
              alt=""
              sizes=""
              className="bg-[#191919]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroProd;
