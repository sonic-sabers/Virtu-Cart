import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Rating } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedProductId } from "../store/productsSlice";
import { IRootState } from "../store/store";

const useStyles = makeStyles({
  emptyIcon: {
    color: "white", // Set the color of unfilled stars to white
  },
});

const ProductsAll = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { products } = useSelector((state: IRootState) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (e: React.MouseEvent, id: string, title: string) => {
    e.preventDefault();
    dispatch(setSelectedProductId(id));
    navigate(`/product/${title}`);
  };

  return (
    <div className="min-h-[100vh] flex flex-col gap-5 mt-[12vh]">
      <div className="title w-[95%] mx-auto">
        <h1 className="text-[2rem] sm:text-[3rem] font-[600]">
          {id === "all" ? (
            <span>All Products</span>
          ) : (
            <span>
              Our <span>{id}</span>
            </span>
          )}
        </h1>
      </div>
      <div className="wrapper w-[95%] mx-auto flex flex-col sm:flex-row sm:flex-wrap sm:justify-between lg:justify-center gap-5 xl:gap-16">
        {products &&
          products.map((p) => {
            return (
              <motion.div
                key={p.title}
                whileHover={{ scale: "1.05" }}
                onClick={(e) => handleClick(e, p._id, p.title)}
                className="eachProduct cursor-pointer hover:border hover:border-[#09dd6d] transition-all ease-in duration-150 p-2 rounded-2xl border border-[#393939] w-full sm:w-[48%] xl:w-[30%] flex flex-col gap-3 sm:justify-between"
              >
                <div className="img w-[18rem] items-center mx-auto flex justify-center overflow-hidden h-auto">
                  <img src={p.thumbnail} alt="" className="rounded-xl" />
                </div>
                <div className="details flex justify-between">
                  <div className="left flex flex-col gap-3">
                    <h1 className="text-[1.4rem] font-[500]">{p.title}</h1>
                    <h1 className="text-[0.8rem]">
                      <span>{p.brand}</span>
                    </h1>
                    <h1 className="text-[0.7rem] w-[80%]">
                      {p.description.split(" ").slice(0, 10).join(" ") + "..."}
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
                  <div className="right flex flex-col gap-5 items-center justify-between">
                    <h1
                      className={`font-[500] text-[1rem] ${
                        p.discountedPrice !== p.originalPrice && "line-through"
                      }`}
                    >
                      <span>Rs. {p.originalPrice} </span>
                    </h1>
                    {p.discountedPrice !== p.originalPrice && (
                      <h1 className="font-[500] text-[1rem]">
                        <span>Rs. {p.discountedPrice} </span>
                      </h1>
                    )}

                    <h1 className="font-[500] whitespace-nowrap  text-[0.95rem]">
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
                    {/* {p.stock !== 0 && (
                      <button
                        className="button-var-1"
                        onClick={(e) => handleClickAddCart(e, p)}
                      >
                        {"+"} Cart
                      </button>
                    )} */}
                  </div>
                </div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductsAll;
