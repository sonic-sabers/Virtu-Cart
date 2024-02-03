import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { getNewlyLaunchedService } from "../apis/api";
import { NewlyLauncedServices } from "../services/Props";
import { FindTax } from "../services/Tax";
import { addCartServices, addCost } from "../store/cartSlice";
import { IRootState } from "../store/store";
import { setIsLoading } from "../store/userSlice";
import { setSelectedServiceId } from "../store/serviceSlice";
import { useNavigate } from "react-router-dom";

const NewLaunchedService = () => {
  const { newlyLaunchedServices } = useSelector(
    (state: IRootState) => state.service
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchNewlyLaunchedService = async () => {
      dispatch(setIsLoading(true));
      const res = await getNewlyLaunchedService(dispatch);
      if (typeof res === "string") {
        toast.warn(res);
        dispatch(setIsLoading(true));
      } else {
        dispatch(setIsLoading(false));
      }
    };
    fetchNewlyLaunchedService();
  }, []);
  const handleClick = (e: React.MouseEvent, id: NewlyLauncedServices) => {
    e.preventDefault();
    const amount = id.price + FindTax("service", id.price).tax;
    dispatch(addCost(amount));
    dispatch(addCartServices(id));
    toast.success("Service added to cart");
  };
  const navigate = useNavigate();
  return (
    <div className="w-full h-fit flex flex-col mt-10 gap-10">
      <div className="title w-full flex justify-center items-center">
        <h1 className="text-center text-[2rem] sm:text-[4rem] font-[500]">
          Newly <span>Launched Services</span>{" "}
        </h1>
      </div>
      <div className="wrapper w-[95%] mx-auto min-h-[100vh]">
        <div className="items flex flex-col sm:flex-row sm:flex-wrap items-center">
          {newlyLaunchedServices &&
            newlyLaunchedServices.map((n: any, index: number) => {
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
                          dispatch(setSelectedServiceId(n._id));
                          navigate(`/service/${n.title}`);
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
                  <div className="bottom flex justify-end items-end w-[95%] mx-auto md:w-[30rem]">
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

export default NewLaunchedService;
