import express from "express";
const app = express();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import dotenv from "dotenv";
import User from "../database/models/user.js";

dotenv.config();

app.use(express.json());

const signToken = (user) =>
  jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "20m" });

const validateJWT = expressjwt({
  secret: process.env.SECRET_KEY,
  algorithms: ["HS256"],
});

// Middleware to find and assign the user to the request.
const findAndAssignUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.auth.user.id);

    if (!user) {
      return res.status(404).end();
    }

    req.user = user;
    next();
  } catch (err) {
    next(err.message);
  }
};

//Middleware to verify if the user is authenticated
const isAuthenticated = express.Router().use(validateJWT, findAndAssignUser);

const Auth = {
  register: async (req, res) => {
    const { body } = req;

    try {
      const userExist = await User.findOne({ where: { email: body.username } });

      if (userExist) {
        return res.status(403).send("The user exist in the db.");
      }

      const salt = await bcrypt.genSalt();
      const hashed = await bcrypt.hash(body.password, salt);
      const user = await User.create({
        email: body.username,
        password: hashed,
        salt,
        name: body.firstname + " " + body.lastname,
        role: "user", // body.role,
      });
      const signed = signToken({ id: user.id, email: user.email });
      res.status(201).json(signed);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  },

  login: async (req, res) => {
    const { body } = req;

    try {
      const user = await User.findOne({ email: body.username });

      if (!user) {
        res.status(403).send("wrong user or password, please verify.");
      } else {
        const isMatch = await bcrypt.compareSync(body.password, user.password);

        if (isMatch) {
          const signed = signToken({
            id: user.id,
            email: user.email,
            name: user.name,
          });
          res.status(200).cookie("token", signed).json({
            id: user.id,
            email: user.email,
            name: user.name,
            token: signed,
          });
        } else {
          res.status(403).send("Invalid passeword, please verify.");
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  profile: (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(204);

    jwt.verify(token, process.env.SECRET_KEY, {}, (err, info) => {
      if (err) {
        return res.status(403).json({ message: "TOKEN FAILED" });
      }

      res.json(info);
    });
  },

  logout: (req, res) => {
    const token = "";
    res
      .status(200)
      .clearCookie("token")
      .json({ id: "", email: "", token: token });
  },
};
export { Auth, isAuthenticated };
