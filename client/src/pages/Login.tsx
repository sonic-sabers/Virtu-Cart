import React, { useEffect, useState } from "react";
import { LoginProp } from "../services/Props";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { LoginApi } from "../apis/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../store/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inpType, setIntType] = useState("password");
  const [formDets, setFormDets] = useState<LoginProp>({
    email: "",
    password: "",
  });
  const [screenSize, setScreenSize] = useState(-1);
  useEffect(() => {
    setScreenSize(window.innerWidth);
  }, []);
  const iconSize = screenSize >= 640 ? "medium" : "small";

  const handleChange = (e: any, id: number) => {
    e.preventDefault();
    if (id === 1) {
      setFormDets((prev) => ({
        ...prev,
        email: e.target.value,
      }));
    } else if (id === 2) {
      setFormDets((prev) => ({
        ...prev,
        password: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    const res = await LoginApi(formDets, dispatch);

    if (typeof res === "number") {
      dispatch(setIsLoggedIn(true));
      navigate("/");
      toast.success("Successfully Logged In");
      dispatch(setIsLoggedIn(true));
    } else {
      toast.error(res);
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center relative login">
      <div className="wrapper w-[95%] mx-auto rounded-3xl flex flex-col gap-10 h-[100vh] lg:justify-evenly">
        <div className="title w-full flex items-center justify-between lg:w-[50%] mx-auto">
          <h1 className="text-[1.5rem] lg:text-[2rem] font-[500]">
            Virtu<span>Cart</span>
          </h1>
          <h1 className="font-[600] text-[1.5rem] lg:text-[2rem]">
            Log<span className="">in</span>{" "}
          </h1>
        </div>
        <div className="form flex flex-col p-3 rounded-3xl border border-[#393939] gap-8 sm:w-[60%] lg:w-[50%] mx-auto bg-[#191919] bg-opacity-40">
          <div className="input1 flex flex-col gap-3">
            <label htmlFor="" className="lg:text-[1.5rem]">
              Enter your <span>Email Id</span>
            </label>
            <input
              type="text"
              className="bg-transparent lg:text-[1.2rem] lg:placeholder:text-[1.2rem] p-2 rounded-xl border border-[#393939] focus:ring-0 focus:outline-none"
              placeholder="Email Id"
              onChange={(e) => handleChange(e, 1)}
            />
          </div>
          <div className="input1 flex flex-col gap-3">
            <label htmlFor="" className="lg:text-[1.5rem]">
              Enter your <span>Password</span>
            </label>
            <div className="input relative">
              <input
                type={inpType}
                className="bg-transparent lg:text-[1.2rem] lg:placeholder:text-[1.2rem] w-full p-2 rounded-xl border border-[#393939] focus:ring-0 focus:outline-none"
                placeholder="Password"
                onChange={(e) => handleChange(e, 2)}
              />
              {inpType === "password" ? (
                <RemoveRedEyeIcon
                  className="text-green-500 absolute top-2 right-2"
                  fontSize={iconSize}
                  onClick={(e) => {
                    e.preventDefault();
                    setIntType("text");
                  }}
                />
              ) : (
                <VisibilityOffIcon
                  className="text-green-500 absolute top-2 right-2"
                  fontSize={iconSize}
                  onClick={(e) => {
                    e.preventDefault();
                    setIntType("password");
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="button w-full flex items-center justify-center">
          <button
            className="button-var-1 hover:bg-[#09dd6d] hover:text-[#191919] transition-all ease-in duration-150 font-[400]"
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </button>
        </div>
        <div className="navigate flex flex-col gap-1 justify-center items-center">
          <h1 className="text-[0.75rem] lg:text-[1.2rem] xl:text-[1.3rem]">
            Don't have an account?{" "}
            <span
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              Sign up
            </span>{" "}
          </h1>
        </div>
      </div>
      <div className="absolute top-0">
        <ToastContainer theme="dark" />
      </div>
    </div>
  );
};

export default Login;
