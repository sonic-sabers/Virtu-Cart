import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { Rating } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { makeStyles } from "@mui/styles";
import FiberSmartRecordIcon from "@mui/icons-material/FiberSmartRecord";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { useEffect, useState } from "react";
import { FindTax } from "../../services/Tax";
import { addCartProducts, addCost } from "../../store/cartSlice";
import { toast } from "react-toastify";

const useStyles = makeStyles({
  emptyIcon: {
    color: "white", // Set the color of unfilled stars to white
  },
});

const Section1 = () => {
  const [screenSize, setScreenSize] = useState(-1);
  const dispatch = useDispatch();
  useEffect(() => {
    setScreenSize(window.innerWidth);
  }, []);
  const iconSize = screenSize >= 640 ? "medium" : "small";
  const { product } = useSelector((state: IRootState) => state.product);
  const classes = useStyles();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const amount =
      product.discountedPrice + FindTax("product", product.discountedPrice).tax;
    dispatch(addCost(amount));
    dispatch(addCartProducts(product));
    toast.success("Item added to cart");
  };
  return (
    <div className="h-auto mt-[10vh] w-full">
      <div className="wrapper flex flex-col w-[95%] mx-auto py-2">
        <div className="section1 w-full flex flex-col gap-6">
          <div className="img w-full justify-center flex items-center">
            {product && product.thumbnail ? (
              <img src={product.thumbnail} alt="" className="rounded-2xl" />
            ) : (
              <div>Loading Image...</div>
            )}
          </div>
          <div className="title flex justify-between">
            <h1 className="text-[1rem] xl:text-[1.5rem] font-[500] text-center">
              <span>{product && product.title && product.title}</span>
              {" , "}
              {product && product.description && product.description}
            </h1>
          </div>
          <div className="rating w-full flex items-center justify-between">
            <div className="ratingonly flex items-center gap-1">
              <Rating
                name="read-only"
                size="small"
                value={product && product.rating && product.rating}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarBorderIcon
                    className={classes.emptyIcon}
                    fontSize="small"
                  />
                }
              />
              {product && product.rating && product.rating}
            </div>
            <h1 className="text-[1rem] font-[500] text-center">
              <span>{product && product.brand && product.brand}</span>
            </h1>
          </div>
          <div className="price flex w-full items-center justify-between">
            <div className="left flex flex-col gap-1">
              <h1
                className={`text-[1rem] xl:text-[1.2rem] font-[500] text-center ${
                  product &&
                  product.originalPrice &&
                  product.originalPrice !== product.discountedPrice &&
                  "line-through"
                }`}
              >
                Rs.{" "}
                <span>
                  {product && product.originalPrice && product.originalPrice}
                </span>
              </h1>
              {product &&
                product.originalPrice &&
                product.originalPrice !== product.discountedPrice && (
                  <h1 className="text-[1rem] xl:text-[1.2rem] font-[500] text-center">
                    Rs.{" "}
                    <span>
                      {product &&
                        product.discountedPrice &&
                        product.discountedPrice}
                    </span>
                  </h1>
                )}
            </div>
            <div className="right">
              <button className="button-var-1" onClick={(e) => handleClick(e)}>
                {"+ "}Cart
              </button>
            </div>
          </div>
          <div className="about flex flex-col gap-3">
            {product &&
              product.about &&
              product.about.map((a: any, index: number) => {
                return (
                  <div className="each flex gap-3 items-center" key={index}>
                    <FiberSmartRecordIcon
                      style={{ color: "09dd6d" }}
                      fontSize={iconSize}
                    />

                    <h1 className="text-[0.8rem] xl:text-[1rem]">{a}</h1>
                  </div>
                );
              })}
          </div>
          <div className="images items-center flex flex-col gap-4">
            {product &&
              product.images &&
              product.images.map((a: any, index: number) => {
                return (
                  <div className="each flex gap-3 items-center" key={index}>
                    <img src={a} alt="" />
                  </div>
                );
              })}
          </div>
          <div className="inbox flex flex-col gap-4">
            <h1>
              What's <span>in the Box?</span>{" "}
            </h1>
            {product &&
              product.box &&
              product.box.map((a: any, index: number) => {
                return (
                  <div className="each flex gap-3 w-full" key={index}>
                    <RadioButtonCheckedIcon
                      style={{ color: "09dd6d" }}
                      fontSize={iconSize}
                    />
                    <h1 className="text-[0.8rem] xl:text-[1rem]">{a}</h1>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
