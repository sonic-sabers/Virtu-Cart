import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Rating } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { orderProducts, orderServices } from "../../apis/api";
import { FindTax } from "../../services/Tax";
// import SuccessAnimation from "actually-accessible-react-success-animation";

import { useNavigate } from "react-router-dom";
import {
  addCartProducts,
  addCartServices,
  addCost,
  clearCartProducts,
  clearCartServices,
  clearCost,
  removeCartProduct,
  removeCartService,
  removeCost,
} from "../../store/cartSlice";
import { IRootState } from "../../store/store";

const useStyles = makeStyles({
  emptyIcon: {
    color: "white", // Set the color of unfilled stars to white
  },
});

const CartItems = () => {
  const { userData, token, isLoggedIn } = useSelector(
    (state: IRootState) => state.user
  );
  const [totalItems, setTotalItems] = useState(0);
  const error = "";

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, services, totalCost } = useSelector(
    (state: IRootState) => state.cart
  );
  useEffect(() => {
    if (products && services) {
      let prodLength = 0,
        serviceLength = 0;
      for (let i = 0; i < products.length; i++) {
        prodLength += products[i].quantity;
      }
      for (let i = 0; i < services.length; i++) {
        serviceLength += services[i].quantity;
      }
      setTotalItems(prodLength + serviceLength);
    }
  }, [products, services]);

  const handleSubmitOrder = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      const newOrder = [];
      const newOrder1 = [];
      if (products && products.length > 0) {
        for (let i = 0; i < products.length; i++) {
          newOrder.push({
            _id: products[i]._id,
            quantity: products[i].quantity,
          });
        }
      }
      if (services && services.length > 0) {
        for (let i = 0; i < services.length; i++) {
          newOrder1.push({
            _id: services[i]._id,
            quantity: services[i].quantity,
          });
        }
      }
      if (services && services.length > 0) {
        await orderServices(newOrder1, userData._id, token, error);
      }

      if (products && products.length > 0) {
        await orderProducts(newOrder, userData._id, token, error);
      }

      if (error === "") {
        dispatch(clearCartProducts());
        dispatch(clearCartServices());
        dispatch(clearCost());
        toast.success("Order placed suucessfully");
      } else {
        toast.warn(error);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-full min-h-[100vh]">
      <div className="wrapper flex flex-col gap-10 w-[95%] mx-auto mt-[12vh]">
        <div className="title flex flex-col md:flex-row items-center justify-between gap-5 md:gap-0">
          <h1 className="w-full text-center text-[1.5rem] xl:text-[2.5rem] font-[600]">
            Your Cart - <span>Products</span>{" "}
          </h1>
          {isLoggedIn && (
            <button
              className="button-var-1"
              onClick={(e) => {
                e.preventDefault();
                navigate("/orders");
              }}
            >
              Orders
            </button>
          )}
        </div>
        <div className="checkout w-full flex flex-col gap-3">
          <h1 className="text-[1.3rem] sm:text-[3rem] font-[600]">
            Check<span>out</span>
          </h1>
          <div className="row1 w-full flex flex-wrap items-center gap-5 justify-center md:flex-row md:justify-between md:gap-0">
            <h1 className="text-[0.85rem] sm:text-[1.3rem] w-[40%] md:w-fit font-[500]">
              Total Items : <span>{totalItems}</span>
            </h1>
            <h1 className=" text-[0.85rem] sm:text-[1.3rem] w-[50%] md:w-fit font-[500]">
              Total Cost : <span>{totalCost.toFixed(2)}</span>
            </h1>
            {totalItems > 0 && (
              <div className="button flex gap-3 items-center">
                <motion.div className="clearAll">
                  <button
                    className="button-var-1"
                    onClick={(e) => handleSubmitOrder(e)}
                  >
                    Place Order
                  </button>
                </motion.div>

                <motion.div className="clearAll ">
                  <button
                    className="button-var-2"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(clearCartProducts());
                      dispatch(clearCartServices());
                      dispatch(clearCost());
                    }}
                  >
                    Clear Cart
                  </button>
                </motion.div>
              </div>
            )}
          </div>
        </div>
        <div className="items w-full ">
          {products && Object.keys(products).length > 0 ? (
            <div className="products w-full  flex flex-col gap-3">
              {products.map((p) => {
                const tax = FindTax("product", p.discountedPrice);
                const taxVal = tax?.tax;
                const taxName = tax?.taxname;
                const finVal = p.discountedPrice && taxVal + p.discountedPrice;

                return (
                  <div
                    className="eachProd border p-2 border-[#393939] rounded-2xl flex flex-col md:flex-row items-center gap-3"
                    key={p._id}
                  >
                    <div className="img w-[10rem] md:w-[30%] mx-auto">
                      <img src={p.thumbnail} alt="" />
                    </div>
                    <div className="title w-full md:w-[70%] flex flex-col items-center gap-3 xl:gap-5 text-[0.8rem]">
                      <h1 className="text-center w-full xl:text-[1.2rem]">
                        <span>{p.title}</span>,{" "}
                        {p.description.split(" ").slice(0, 15).join(" ")}...
                      </h1>
                      <div className="row flex items-center w-full justify-between ">
                        <h1 className="font-[500] whitespace-nowrap  text-[0.95rem] xl:text-[1.2rem]">
                          <span
                            className={`${
                              p.stock > 5
                                ? "text-[#09dd6d]"
                                : p.stock !== 0
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            {p.stock > 5
                              ? "In Stock"
                              : p.stock !== 0
                              ? `Only ${p.stock} left`
                              : "Out of Stock"}
                          </span>
                        </h1>
                        <Rating
                          name="read-only"
                          size="small"
                          value={p.rating}
                          readOnly
                          precision={0.5}
                          emptyIcon={
                            <StarBorderIcon
                              className={classes.emptyIcon}
                              fontSize="small"
                            />
                          }
                        />
                      </div>
                      <div className="price w-full flex flex-col gap-3">
                        <h1 className="text-[1rem] xl:text-[1.2rem] font-[500]">
                          Cost <span>Break Up</span>{" "}
                        </h1>
                        <div className="w-full h-[2px] bg-[#09dd6d]"></div>
                        <div className="rowheader w-full flex items-center justify-between text-[0.8rem] xl:text-[1rem] font-[500]">
                          <div className="name1 w-[30%] text-start">MRP</div>
                          <div className="name1 w-[30%]">Tax</div>
                          <div className="name1 w-[30%] text-center">
                            Tax Amnt
                          </div>
                          <div className="name1 w-[30%] text-center">Qnt</div>
                          <div className="name1 w-[30%] text-end">Price</div>
                        </div>
                        <div className="rowvalue md:text-[1.1rem] xl:text-[1.3rem] font-[600] w-full flex items-center justify-between text-[#09dd6d]">
                          <div className="name1 w-[30%] text-start">
                            {p.discountedPrice && p.discountedPrice}
                          </div>
                          <div className="name1 w-[30%]">{taxName}</div>
                          <div className="name1 w-[30%] text-center">
                            {Number(taxVal.toFixed(2))}
                          </div>
                          <div className="name1 w-[30%] text-center">
                            <span
                              onClick={(e) => {
                                e.preventDefault();
                                dispatch(removeCost(finVal));
                                dispatch(removeCartProduct(p._id));
                              }}
                            >
                              {"- "}
                            </span>
                            {p.quantity && p.quantity}
                            <span
                              onClick={(e) => {
                                e.preventDefault();
                                const amount =
                                  p.discountedPrice +
                                  FindTax("product", p.discountedPrice).tax;
                                dispatch(addCost(amount));
                                dispatch(addCartProducts(p));
                                toast.success("Item added to cart");
                              }}
                            >
                              {" +"}
                            </span>
                          </div>
                          <div className="name1 w-[30%] text-end">
                            {taxVal &&
                              p.discountedPrice &&
                              p.quantity &&
                              (
                                (p.discountedPrice + taxVal) *
                                p.quantity
                              ).toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <div className="action flex items-center justify-center">
                        <button
                          className="button-var-2"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(removeCost(finVal));
                            dispatch(removeCartProduct(p._id));
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full justify-center items-center text-[1.2rem] text-center">
              No items added
            </div>
          )}
        </div>
        <h1 className="w-full text-center text-[1.5rem] xl:text-[2.5rem] font-[600]">
          Your Cart - <span>Services</span>{" "}
        </h1>
        <div className="items w-full ">
          {services && Object.keys(services).length > 0 ? (
            <div className="services w-full  flex flex-col gap-3">
              {services.map((p) => {
                const tax = FindTax("service", p.price);

                const taxVal = tax?.tax;
                const taxName = tax?.taxname;
                const finVal = p.price && taxVal + p.price;
                return (
                  <div
                    className="eachProd border p-2 border-[#393939] rounded-2xl flex flex-col md:flex-row items-center gap-3"
                    key={p._id}
                  >
                    <div className="img w-[10rem] md:w-[30%] mx-auto">
                      <img src={p.thumbnail} alt="" />
                    </div>
                    <div className="title w-full md:w-[60%] flex flex-col items-center gap-3 xl:gap-5 text-[0.8rem]">
                      <h1 className="text-center w-full xl:text-[1.2rem]">
                        <span>{p.title}</span>,{" "}
                        {p.description.split(" ").slice(0, 10).join(" ")}...
                      </h1>
                      <div className="row flex items-center w-full justify-between ">
                        <Rating
                          name="read-only"
                          size="small"
                          value={p.rating}
                          readOnly
                          precision={0.5}
                          emptyIcon={
                            <StarBorderIcon
                              className={classes.emptyIcon}
                              fontSize="small"
                            />
                          }
                        />
                      </div>
                      <div className="price w-full flex flex-col gap-3">
                        <h1 className="text-[1rem] xl:text-[1.2rem] font-[500]">
                          Cost <span>Break Up</span>{" "}
                        </h1>
                        <div className="w-full h-[2px] bg-[#09dd6d]"></div>
                        <div className="rowheader w-full flex items-center justify-between text-[0.8rem] xl:text-[1rem] font-[500]">
                          <div className="name1 w-[30%] text-start">MRP</div>
                          <div className="name1 w-[30%]">Tax</div>
                          <div className="name1 w-[30%] text-center">
                            Tax Amnt
                          </div>
                          <div className="name1 w-[30%] text-center">Qnt</div>
                          <div className="name1 w-[30%] text-end">Price</div>
                        </div>
                        <div className="rowvalue md:text-[1.1rem] xl:text-[1.3rem] font-[600] w-full flex items-center justify-between text-[#09dd6d]">
                          <div className="name1 w-[30%] text-start">
                            {p.price && p.price}
                          </div>
                          <div className="name1 w-[30%]">{taxName}</div>
                          <div className="name1 w-[30%] text-center">
                            {taxVal}
                          </div>
                          <div className="name1 w-[30%] text-center">
                            <span
                              onClick={(e) => {
                                e.preventDefault();
                                dispatch(removeCost(finVal));
                                dispatch(removeCartService(p._id));
                              }}
                            >
                              {"- "}
                            </span>
                            {p.quantity && p.quantity}
                            <span
                              onClick={(e) => {
                                e.preventDefault();
                                const amount =
                                  p.price + FindTax("service", p.price).tax;
                                dispatch(addCost(amount));
                                dispatch(addCartServices(p));
                                toast.success("Service added to cart");
                              }}
                            >
                              {" +"}
                            </span>
                          </div>
                          <div className="name1 w-[30%] text-end">
                            {taxVal &&
                              p.price &&
                              p.quantity &&
                              ((p.price + taxVal) * p.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <div className="action flex items-center justify-center">
                        <button
                          className="button-var-2"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(removeCost(finVal));

                            dispatch(removeCartService(p._id));
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full justify-center items-center text-[1.2rem] text-center">
              No items added
            </div>
          )}
        </div>

        {/* <h1>Your Cart - <span>Services</span> </h1> */}
      </div>
      {/* <SuccessAnimation
        text="Your trip is booked"
        color="#FD74F8"
        liveRegion="live"
      /> */}
    </div>
  );
};

export default CartItems;
