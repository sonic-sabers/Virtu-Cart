import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { getServices } from "../apis/api";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ServicesAll from "../components/ServicesAll";
import { IRootState } from "../store/store";
import { setIsLoading } from "../store/userSlice";

const Services = () => {
  const { isLoading } = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchServices = async () => {
      dispatch(setIsLoading(true));
      const res = await getServices(dispatch);
      if (typeof res === "string") {
        toast.warn(res);
      } else {
        dispatch(setIsLoading(false));
      }
    };
    fetchServices();
  }, []);
  return (
    <div className="w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="wrapper flex flex-col">
          <Navbar />
          <ServicesAll />
          <ToastContainer theme="dark" />
        </div>
      )}
    </div>
  );
};

export default Services;
