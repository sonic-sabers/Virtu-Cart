import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBestSellingService } from "../apis/api";
import { FindTax } from "../services/Tax";
import { addCartServices, addCost } from "../store/cartSlice";
import { IRootState } from "../store/store";
import { setIsLoading } from "../store/userSlice";
import Loader from "./Loader";
import { setSelectedServiceId } from "../store/serviceSlice";
import { useNavigate } from "react-router-dom";

const HeroService = () => {
  const { bestSellingService } = useSelector(
    (state: IRootState) => state.service
  );
  const { isLoading } = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBestProd = async () => {
      dispatch(setIsLoading(true));
      const res = await getBestSellingService(dispatch);
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
      bestSellingService &&
      bestSellingService[0].price &&
      bestSellingService[0].price +
        FindTax("service", bestSellingService[0].price).tax;
    dispatch(addCost(amount));
    dispatch(addCartServices(bestSellingService[0]));
    toast.success("Service added to cart");
  };
  const navigate = useNavigate();
  return (
    <div className="h-[100vh] w-full flex flex-col justify-center items-center p-[5rem]">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="wrapper w-[95%] h-[100vh] mt-[20vh] mx-auto flex flex-col items-center justify-start pt-5">
          <div className="top flex flex-col gap-5 md:gap-8 sm:w-[60%] xl:w-[40%]">
            <h1 className="text-[2.5rem] xl:text-[3.5rem] font-[600] text-center text-[#191919]">
              {Object.keys(bestSellingService).length !== 0
                ? bestSellingService[0].title
                : "Getting Data..."}
            </h1>
            <h1 className="text-center text-[0.85rem] md:text-[1.2rem] xl:text-[1.2rem] text-[#191919]">
              {Object.keys(bestSellingService).length !== 0
                ? bestSellingService[0].description
                    .split(" ")
                    .splice(0, 8)
                    .join(" ")
                : "Getting Data..."}
            </h1>
            <div className="links flex w-full items-center justify-evenly">
              <h1
                className="text-[#09dd6d] text-[1.2rem] md:text-[1.5rem] xl:text-[1.3rem]  font-[500] cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setSelectedServiceId(bestSellingService[0]._id));
                  navigate(`/service/${bestSellingService[0].title}`);
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
          <div className="bottom  flex">
            <img
              src={
                bestSellingService &&
                bestSellingService[0] &&
                bestSellingService[0].thumbnail
              }
              loading="lazy"
              alt=""
              sizes=""
              className=""
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroService;
