import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import User from "../models/User.js";

export const update = async (req, res, next) => {
  const u = await User.findById(req.params.id);
  if (u.email === req.body.email) {
    try {
      if (req.body.currentpassword) {
        const isCorrect = await bcrypt.compare(
          req.body.currentpassword,
          u.password
        );
        if (isCorrect) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(req.body.newpassword, salt);
          await User.findByIdAndUpdate(
            req.params.id,
            {
              $set: { password: hash },
            },
            { new: true }
          );
          res.status(200).json("User Password Updated!");
        } else return next(createError(400, "Wrong Password!"));
      } else {
        const isCorrect = await bcrypt.compare(req.body.password, u.password);
        if (isCorrect) {
          const { password, email, ...others } = req.body;
          await User.findByIdAndUpdate(
            req.params.id,
            {
              $set: others,
            },
            { new: true }
          );
          res.status(200).json("User Data Updated!");
        } else return next(createError(400, "Wrong Password!"));
      }
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    next(err);
  }
};
