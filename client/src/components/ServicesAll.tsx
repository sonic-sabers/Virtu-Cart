import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Rating } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { setSelectedServiceId } from "../store/serviceSlice";

const useStyles = makeStyles({
  emptyIcon: {
    color: "white", // Set the color of unfilled stars to white
  },
});

const ServicesAll = () => {
  const classes = useStyles();
  const { services } = useSelector((state: IRootState) => state.service);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (e: React.MouseEvent, id: string, title: string) => {
    e.preventDefault();
    dispatch(setSelectedServiceId(id));
    navigate(`/service/${title}`);
  };
  return (
    <div className="min-h-[100vh] flex flex-col gap-5 mt-[12vh]">
      <div className="title w-[95%] mx-auto">
        <h1 className="text-[2rem] sm:text-[3rem] font-[600]">
          Our <span>Services</span>
        </h1>
      </div>
      <div className="wrapper w-[95%] mx-auto flex flex-col sm:flex-row sm:flex-wrap sm:justify-between lg:justify-center gap-5 xl:gap-16">
        {services &&
          services.map((p) => {
            return (
              <motion.div
              key={p.title}
                whileHover={{ scale: "1.05" }}
                onClick={(e) => handleClick(e, p._id, p.title)}
                className="eachProduct cursor-pointer hover:border hover:border-[#09dd6d] transition-all ease-in duration-150 p-2 rounded-2xl border border-[#393939] w-full sm:w-[48%] xl:w-[30%] flex flex-col gap-3 sm:justify-between"
              >
                <div className="img w-full flex justify-center overflow-hidden max-h-[45vh]">
                  <img src={p.thumbnail} alt="" className="rounded-xl" />
                </div>
                <div className="details flex justify-between">
                  <div className="left flex flex-col gap-3">
                    <h1 className="text-[1.4rem] font-[500]">{p.title}</h1>
                    <h1 className="text-[0.8rem]">
                      <span>{p.providedBy}</span>
                    </h1>
                    <h1 className="text-[0.7rem] w-[80%]">{p.description.split(' ').slice(0, 10).join(' ')+"..."}</h1>
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
                  <div className="right flex flex-col items-center justify-between">
                    <h1 className="font-[500] text-[1.2rem]">
                      <span>Rs.{p.price}</span>
                    </h1>
                    {/* <button className="button-var-1">{"+"} Cart</button> */}
                  </div>
                </div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};

export default ServicesAll;
