import FiberSmartRecordIcon from "@mui/icons-material/FiberSmartRecord";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Rating } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FindTax } from "../../services/Tax";
import { addCartServices, addCost } from "../../store/cartSlice";
import { IRootState } from "../../store/store";

const useStyles = makeStyles({
  emptyIcon: {
    color: "white", // Set the color of unfilled stars to white
  },
});

const Section1 = () => {
  const [screenSize, setScreenSize] = useState(-1);
  useEffect(() => {
    setScreenSize(window.innerWidth);
  }, []);
  const dispatch = useDispatch();
  const iconSize = screenSize >= 640 ? "medium" : "small";
  const { service } = useSelector((state: IRootState) => state.service);
  const classes = useStyles();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const amount = service.price + FindTax("service", service.price).tax;
    dispatch(addCost(amount));
    dispatch(addCartServices(service));
    toast.success("Service added to cart");
  };
  return (
    <div className="h-auto mt-[10vh] w-full">
      <div className="wrapper flex flex-col w-[95%] mx-auto py-2">
        <div className="section1 w-full flex flex-col gap-6">
          <div className="img w-full justify-center flex items-center">
            {service && service.thumbnail ? (
              <img src={service.thumbnail} alt="" className="rounded-2xl" />
            ) : (
              <div>Loading Image...</div>
            )}
          </div>
          <div className="title flex justify-between">
            <h1 className="text-[1rem] xl:text-[1.5rem] font-[500] text-center">
              <span>{service && service.title && service.title}</span>
              {" , "}
              {service && service.description && service.description}
            </h1>
          </div>
          <div className="rating w-full flex items-center justify-between">
            <div className="ratingonly flex items-center gap-1">
              <Rating
                name="read-only"
                size="small"
                value={service && service.rating && service.rating}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarBorderIcon
                    className={classes.emptyIcon}
                    fontSize="small"
                  />
                }
              />
              {service && service.rating && service.rating}
            </div>
            <h1 className="text-[1rem] font-[500] text-center">
              <span>{service && service.providedBy && service.providedBy}</span>
            </h1>
          </div>
          <div className="price flex w-full items-center justify-between">
            <div className="left flex flex-col gap-1">
              <h1 className="text-[1rem] xl:text-[1.2rem] font-[500] text-center">
                Rs. <span>{service && service.price && service.price}</span>
              </h1>
            </div>
            <div className="right">
              <button className="button-var-1" onClick={(e) => handleClick(e)}>
                {"+ "}Cart
              </button>
            </div>
          </div>
          <div className="about flex flex-col gap-3">
            {service &&
              service.about &&
              service.about.map((a: any, index: number) => {
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
            {service &&
              service.images &&
              service.images.map((a: any, index: number) => {
                return (
                  <div className="each flex gap-3 items-center" key={index}>
                    <img src={a} alt="" />
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
