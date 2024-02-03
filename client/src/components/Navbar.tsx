import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavItems } from "../services/Items";
import { Logout } from "../services/Logout";
import { IRootState } from "../store/store";

const Navbar = () => {
  const { userData, active, isLoggedIn } = useSelector(
    (state: IRootState) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAtTop, setIsAtTop] = useState(true);
  const [screenSize, setScreenSize] = useState(-1);
  const [mod1, setMod1] = useState(false);
  const [mod2, setMod2] = useState(-1);
  useEffect(() => {
    setScreenSize(window.innerWidth);

    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsAtTop(scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const iconSize = screenSize >= 640 ? "medium" : "small";

  const handleClick = (e: any, id1: number, id2: string) => {
    e.preventDefault();
    if (id1 === 2) {
      navigate("/");
    }
    if (id1 === 3) {
      if (id2 === "All products") {
        navigate(`/products/all`);
      } else {
        navigate(`/products/${id2.toLowerCase()}`);
      }
    } else if (id1 === 4) {
      navigate(`/services`);
    }
  };
  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 p-3  mx-auto ${
        isAtTop
          ? "mt-[2vh] w-[95%] rounded-2xl border-b  border-[#1f1f1f]"
          : "mt-0 w-full rounded-0 border-b border-[#09dd6d] "
      } flex items-center justify-between  h-[8vh] mx-auto bg-[#1f1f1f] transition-all ease-out duration-150 z-30`}
    >
      <h1
        className="text-[0.95rem] font-[500] cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        Virtu<span>Cart</span>
      </h1>
      <div className="menu sm:hidden flex gap-3 relative">
        <ShoppingCartIcon
          fontSize={iconSize}
          className="cursor-pointer"
          style={{ color: "white" }}
          onClick={(e) => {
            e.preventDefault();
            navigate("/cart");
          }}
        />
        <MenuIcon
          fontSize={iconSize}
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setMod1(!mod1);
            setMod2(-1);
          }}
        />
        {mod1 && (
          <div className="modal absolute top-8 right-0 bg-black flex flex-col gap-4 rounded-3xl p-3 min-h-[20vh] w-[15rem] whitespace-nowrap ">
            {NavItems.map((n) => {
              return (
                <div
                  className="eachitem  relative text-[#09dd6d] flex flex-col gap-2 justify-between w-full "
                  onClick={(e) => {
                    e.preventDefault();

                    if (n.id === 2) {
                      navigate("/");
                    } else if (n.id === 4) {
                      navigate(`/services`);
                    }
                    if (mod2 === -1) {
                      if ((n.id === 1 && isLoggedIn) || n.id !== 1) {
                        setMod2(n.id);
                      }
                    } else if (mod2 !== -1 && mod2 !== n.id) {
                      if ((n.id === 1 && isLoggedIn) || n.id !== 1) {
                        setMod2(n.id);
                      }
                    } else {
                      setMod2(-1);
                    }
                  }}
                  key={n.id}
                >
                  <div className="input p-1 hover:bg-[#09dd6d] hover:text-black rounded-xl cursor-pointer">
                    {n.id === 1 ? (
                      isLoggedIn ? (
                        <div className="flex gap-2 items-center">
                          <div className="img w-[1.5rem] h-[1.5rem] rounded-full bg-white flex items-center justify-center">
                            <img
                              src={userData.img}
                              alt=""
                              className="w-[1.5rem]"
                            />
                          </div>
                          <h1>
                            {userData.name &&
                              userData.name !== "" &&
                              userData.name.split(" ")[0]}
                          </h1>
                        </div>
                      ) : (
                        <div className="flex items-center w-full justify-between">
                          <button
                            className="button-var-1"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("/login");
                            }}
                          >
                            Login
                          </button>
                          <ShoppingCartIcon
                            fontSize={iconSize}
                            className="cursor-pointer"
                            style={{ color: "white" }}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("/cart");
                            }}
                          />
                        </div>
                      )
                    ) : (
                      <h1 className="">{n.name}</h1>
                    )}
                    {((n.id === 1 && isLoggedIn) || n.id !== 1) &&
                      n.fields.length > 0 && (
                        <div className="modal">
                          {mod2 !== n.id ? (
                            <KeyboardArrowDownIcon
                              fontSize={iconSize}
                              className="text-white absolute top-[0.4rem] right-[0.2rem]"
                            />
                          ) : (
                            <KeyboardArrowUpIcon
                              fontSize={iconSize}
                              className="text-white absolute top-[0.4rem] right-[0.2rem]"
                            />
                          )}
                        </div>
                      )}
                  </div>

                  {mod2 === n.id && n.fields.length > 0 && (
                    <div className="fields flex flex-col p-2 gap-4 bg-[#111111] rounded-xl">
                      {n.fields.map((f) => {
                        return (
                          <div
                            className="eachsub cursor-pointer"
                            key={f.id}
                            onClick={(e) => {
                              e.preventDefault();
                              if (n.id === 1 && f.id === 4) {
                                Logout(dispatch, navigate);
                              } else if (n.id === 1 && f.id === 1) {
                                navigate("/orders");
                              } else {
                                handleClick(e, n.id, f.name);
                              }
                            }}
                          >
                            {f.name}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="laptop hidden sm:flex items-center gap-8">
        {NavItems.map((n) => {
          if (n.id !== 1) {
            return (
              <div
                className="eachItem flex items-center relative cursor-pointer"
                key={n.id}
                onClick={(e) => {
                  e.preventDefault();
                  if (n.id === 4) {
                    navigate("/services");
                  }
                  if (n.id === 2) {
                    navigate("/");
                  }
                  if (mod2 === -1) {
                    setMod2(n.id);
                  } else if (mod2 !== -1 && mod2 !== n.id) {
                    setMod2(n.id);
                  } else {
                    setMod2(-1);
                  }
                }}
              >
                <h1 className=" flex flex-col text-[0.85rem]">
                  {n.name}
                  <div
                    className={`${
                      active === n.id ? "bg-[#09dd6d]" : "bg-[#1f1f1f]"
                    } w-[20px] h-[2px] `}
                  ></div>
                </h1>
                {n.fields.length > 0 && (
                  <div>
                    {mod2 !== n.id ? (
                      <KeyboardArrowDownIcon
                        fontSize={iconSize}
                        className="text-white"
                      />
                    ) : (
                      <KeyboardArrowUpIcon
                        fontSize={iconSize}
                        className="text-white"
                      />
                    )}
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: mod2 === n.id ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75 }}
                  className="modal absolute top-8 w-fit whitespace-nowrap left-0"
                >
                  {mod2 === n.id && n.fields.length > 0 && (
                    <div className="fields flex flex-col p-2 gap-5 bg-[#111111] rounded-xl">
                      {n.fields.map((f) => {
                        return (
                          <div
                            className="eachsub cursor-pointer p-2 hover:bg-[#09dd6d] rounded-xl hover:text-black transition-all ease-in duration-150"
                            key={f.id}
                            onClick={(e) => handleClick(e, n.id, f.name)}
                          >
                            {f.name}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              </div>
            );
          }
          return null; // Return null for items with n.id === 1 to skip rendering them
        })}
      </div>
      <div className="right hidden sm:flex gap-2 items-center">
        <div className="userdetails  items-center">
          {isLoggedIn ? (
            <div
              className="flex gap-2 items-center relative cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                if (mod2 === 1) {
                  setMod2(-1);
                } else {
                  setMod2(1);
                }
              }}
            >
              <div className="img w-[1rem] h-[1rem] lg:w-[1.3rem] lg:h-[1.3rem] rounded-full bg-white flex items-center justify-center">
                <img
                  src={userData.img && userData.img}
                  alt=""
                  className="w-[1rem] lg:w-[1.3rem]"
                />
              </div>
              <span className="text-[0.85rem] lg:text-[1rem] flex items-center">
                {userData.name && userData.name.split(" ")[0]}{" "}
                <KeyboardArrowDownIcon
                  fontSize={iconSize}
                  className="text-white"
                />
              </span>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: mod2 === 1 ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75 }}
                className="modal absolute top-8 w-[10vw] max-w-[10vw] whitespace-nowrap -left-[8rem]"
              >
                {mod2 === 1 && (
                  <div className="fields flex flex-col p-2 gap-5 bg-[#111111] rounded-xl">
                    {NavItems[0].fields.map((f) => {
                      return (
                        <div
                          className="eachsub cursor-pointer text-[#99dd6d] p-2 hover:bg-[#09dd6d] rounded-xl hover:text-black transition-all ease-in duration-150"
                          key={f.id}
                          onClick={(e) => {
                            e.preventDefault();
                            if (f.id === 4) {
                              Logout(dispatch, navigate);
                            } else if (f.id === 1) {
                              navigate("/orders");
                            }
                          }}
                        >
                          {f.name}
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </div>
          ) : (
            <div className="button">
              <button
                className="button-var-1"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Login
              </button>
            </div>
          )}
        </div>
        <ShoppingCartIcon
          fontSize={iconSize}
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();

            navigate("/cart");
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
