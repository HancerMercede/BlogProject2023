import express from "express";
const app = express();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import dotenv from "dotenv";
import User from "../database/models/user.js";

dotenv.config();

app.use(express.json());

const signToken = (id) =>
  jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1h" });

const validateJWT = expressjwt({
  secret: process.env.SECRET_KEY,
  algorithms: ["HS256"],
});

// Middleware to find and assign the user to the request.
const findAndAssignUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.auth.id);

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
    console.log(body);
    try {
      const userExist = await User.findOne({ where: { email: body.email } });

      if (userExist) {
        return res.status(403).send("The user exist in the db.");
      }

      const salt = await bcrypt.genSalt();
      const hashed = await bcrypt.hash(body.password, salt);
      const user = await User.create({
        email: body.email,
        password: hashed,
        salt,
        name: body.name,
        role: body.role,
      });
      const signed = signToken(user.id);
      res.status(201).send(signed);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  },

  login: async (req, res) => {
    const { body } = req;
    try {
      const user = await User.findOne({ email: body.email });

      if (!user) {
        res.status(403).send("wrong user or password, please verify.");
      } else {
        const isMatch = await bcrypt.compare(body.password, user.password);

        if (isMatch) {
          const signed = signToken(user.id);
          res.status(200).send(signed);
        } else {
          res.status(403).send("Invalid passeword, please verify.");
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
};

export { Auth, isAuthenticated };
