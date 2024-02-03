import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { createError } from "../error.js";
import User from "../models/User.js";
dotenv.config();

//using mailtransporter to send mail
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "heyAshish123@gmail.com",
    pass: process.env.GOOGLE_APP_PW,
  },
});

//generate a random password of 10 characters
function makepw(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new User({ ...req.body, password: hash });

    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "24h",
    });
    const { password, createdAt, updatedAt, __v, ...others } = user._doc;
    res.status(200).json({
      userData: others,
      token,
    });
    res.status(200).send("User has been created!");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log("ayo");
      return res.status(401).json("Wrong Email!");
    }

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) {
      return res.status(401).json("Wrong Password!");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "24h",
    });
    const { password, createdAt, updatedAt, __v, ...others } = user._doc;
    res.status(200).json({
      userData: others,
      token,
    });
  } catch (err) {
    next(err);
  }
};
//secure:true for website
export const logout = async (req, res, next) => {
  res.cookie("access_token", "none", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });

  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
};

export const forgotPassword = async (req, res, next) => {
  console.log("uu");
  try {
    const u = await User.findOne({ email: req.body.email });
    const newPw = makepw(10);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPw);

    console.log(newPw);

    await User.findByIdAndUpdate(u._id, {
      $set: { password: hash },
    });

    mailTransporter.sendMail(
      {
        from: "heyAshish123@gmail.com",
        to: u.email,
        subject: "VirtueCart New Password",
        html: `New Password for login is ${newPw}.<br/>Use this password to login and update the password in the profile section.<br/>Thank You!`,
      },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent successfully");
        }
      }
    );
    res.status(200).json("Check Mail!");
  } catch (error) {
    next(error);
  }
};
