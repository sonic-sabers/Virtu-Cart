import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";
import OrderItems from "../components/Orders/OrderItems";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../apis/api";
import { IRootState } from "../store/store";
import Loader from "../components/Loader";
import { setIsLoading } from "../store/userSlice";
const Orders = () => {
  const { userData, token, isLoading } = useSelector(
    (state: IRootState) => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(setIsLoading(true));
      const res = await getUser(dispatch, userData._id, token);
      if (typeof res === "string") {
        toast.warn(res);
      } else {
        dispatch(setIsLoading(false));
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col relative">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col cartbg relative">
          <Navbar />
          <OrderItems />
          <ToastContainer theme="dark" />
        </div>
      )}
    </div>
  );
};

export default Orders;
