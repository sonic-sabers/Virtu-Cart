import { createError } from "../error.js";
import Service from "../models/Services.js";
import User from "../models/User.js";

export const create = async (req, res, next) => {
  try {
    const n = new Service({ ...req.body });
    await n.save();
    res.status(200).json("Services Created");
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted Successfully!");
  } catch (error) {
    next(error);
  }
};

export const geta = async (req, res, next) => {
  try {
    const a = await Service.findById(req.params.id);
    res.status(200).json(a);
  } catch (error) {
    next(error);
  }
};

export const getall = async (req, res, next) => {
  try {
    const a = await Service.find({});
    res.status(200).json(a);
  } catch (error) {
    next(error);
  }
};

export const getServiceByPrice = async (req, res, next) => {
  try {
    const { upperLimit, lowerLimit } = req.body;
    const r = await Service.find({
      price: { $gte: lowerLimit, $lte: upperLimit },
    });
    res.status(200).json(r);
  } catch (error) {
    next(error);
  }
};

export const getServiceByRating = async (req, res, next) => {
  try {
    const { upperLimit, lowerLimit } = req.body;
    const r = await Service.find({
      rating: { $gte: lowerLimit, $lte: upperLimit },
    });
    res.status(200).json(r);
  } catch (error) {
    next(error);
  }
};

export const getBestService = async (req, res, next) => {
  try {
    const a = await Service.aggregate([
      { $sort: { sales: -1 } },
      {
        $limit: 1,
      },
    ]);
    res.status(200).json(a);
  } catch (error) {
    next(error);
  }
};

export const getNewServices = async (req, res, next) => {
  try {
    const a = await Service.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $limit: 5,
      },
    ]);
    res.status(200).json(a);
  } catch (error) {
    next(error);
  }
};

export const ServiceSold = async (req, res, next) => {
  try {
    if (req.body.services.length==0) return res.status(403).json("Empty Array");
    req.body.services.map(async (p) => {
      const a = await Service.findById(p._id);
      const q = p.quantity;

      await Service.findByIdAndUpdate(p._id, {
        $inc: { sales: q },
      });
      await User.findByIdAndUpdate(req.body.userId, {
        $push: {
          serviceOrders: {
            _id: a._id,
            title: a.title,
            providedBy: a.providedBy,
            thumbnail: a.thumbnail,
            price: a.price,
            date: Date.now(),
            quantity: q,
          },
        },
      });
    });
    res.status(200).json("Service confirmed!");
  } catch (error) {
    next(error);
  }
};
