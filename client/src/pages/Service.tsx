import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { getServiceInfo } from "../apis/api";
import Navbar from "../components/Navbar";
import Section1 from "../components/Service/Section1";
import { IRootState } from "../store/store";

const Service = () => {
  const dispatch = useDispatch();
  const { selectedServiceId } = useSelector(
    (state: IRootState) => state.service
  );
  useEffect(() => {
    const fetchServiceInfo = async () => {
      const res = await getServiceInfo(dispatch, selectedServiceId);
      if (typeof res === "string") {
        toast.warn(res);
      }
    };
    fetchServiceInfo();
  }, []);
  return (
    <div className="flex flex-col">
      <Navbar />
      <Section1 />
      <ToastContainer theme="dark" />
    </div>
  );
};

export default Service;
