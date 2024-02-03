import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { getNewlyLaunchedProd } from "../apis/api";
import { NewlyLauncedProducts } from "../services/Props";
import { FindTax } from "../services/Tax";
import { addCartProducts, addCost } from "../store/cartSlice";
import { IRootState } from "../store/store";
import { setIsLoading } from "../store/userSlice";
import { setSelectedProductId } from "../store/productsSlice";
import { useNavigate } from "react-router-dom";

const NewLaunchedProduct = () => {
  const { newlyLaunchedProducts } = useSelector(
    (state: IRootState) => state.product
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchNewlyLaunchedProd = async () => {
      dispatch(setIsLoading(true));
      const res = await getNewlyLaunchedProd(dispatch);
      if (typeof res === "string") {
        toast.warn(res);
        dispatch(setIsLoading(true));
      } else {
        dispatch(setIsLoading(false));
      }
    };
    fetchNewlyLaunchedProd();
  }, []);
  const handleClick = (e: React.MouseEvent, id: NewlyLauncedProducts) => {
    e.preventDefault();
    const amount =
      id.discountedPrice + FindTax("product", id.discountedPrice).tax;
    dispatch(addCost(amount));
    dispatch(addCartProducts(id));
    toast.success("Item added to cart");
  };
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-[100vh] flex flex-col mt-10 gap-10">
      <div className="title w-full flex justify-center items-center">
        <h1 className="text-center text-[2rem] sm:text-[4rem] font-[500]">
          Newly <span>Launched Products</span>{" "}
        </h1>
      </div>
      <div className="wrapper w-[95%] mx-auto min-h-[100vh]">
        <div className="items flex flex-col sm:flex-row sm:flex-wrap items-center">
          {newlyLaunchedProducts &&
            newlyLaunchedProducts.map((n: any, index: number) => {
              return (
                <div
                  className={`eachProduct p-2 flex flex-col justify-evenly items-center w-full sm:w-[50%] ${
                    index === 1 || index === 3
                      ? "bg-[#fefefe] text-[#191919]"
                      : "text-white"
                  }
                  ${index === 2 && "sm:bg-[#fefefe] sm:text-[#191919]"}
                  ${index === 3 && "sm:bg-[#191919] sm:text-[#fefefe]"}
             h-[75vh]`}
                  key={n._id}
                >
                  <div className="top flex flex-col gap-4 w-full">
                    <h1 className="font-[500] text-[1.5rem] text-center">
                      {n.title}
                    </h1>
                    <h1 className="w-[100%] sm:w-[60%] text-center mx-auto">
                      {n.description.split(" ").slice(0, 10).join(" ")}...
                    </h1>
                    <div className="button flex items-center justify-center gap-5">
                      <h1
                        className="text-[1rem] font-[500]"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(setSelectedProductId(n._id));
                          navigate(`/product/${n.title}`);
                        }}
                      >
                        <span>Learn More {">"}</span>
                      </h1>
                      <h1
                        className="text-[1rem] font-[500]"
                        onClick={(e) => handleClick(e, n)}
                      >
                        <span>
                          {"+ "}Cart {">"}
                        </span>
                      </h1>
                    </div>
                  </div>
                  <div className="bottom flex justify-end items-end w-[15rem]">
                    <img
                      src={n.thumbnail}
                      alt=""
                      className={`${index === 0 && "w-full object-cover"}`}
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default NewLaunchedProduct;
