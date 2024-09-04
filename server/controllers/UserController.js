const { Op, where } = require("sequelize");
const { User, Image } = require("../models");
const { compareToken } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
class UserController {
  static async template(req, res, next) {
    try {
      res.send("hello");
    } catch (error) {
      console.log(error);
    }
  }
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      if (!username) throw { name: "invalid username" };
      if (!email) throw { name: "invalid email" };
      if (!password) throw { name: "invalid password" };

      const emailData = await User.findOne({
        where: {
          email: {
            [Op.iLike]: email,
          },
        },
      });

      console.log("emailData: ", emailData);
      if (emailData)
        throw { name: "custom", status: 400, message: "Email already taken!" };

      const { data } = await User.create({
        username,
        email,
        password,
      });

      // console.log("data: ", data);
      res.status(201).json({
        message: "account succesfuly created",
      });
    } catch (error) {
      // console.log(error)
      next(error);
      // res.send(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "invalid email" };
      if (!password) throw { name: "invalid password" };

      const dataEmail = await User.findOne({
        where: {
          email: {
            [Op.iLike]: email,
          },
        },
      });

      if (!dataEmail)
        throw {
          name: "-",
          status: 401,
          message: "Invalid email/password",
        };

      const valid = compareToken(password, dataEmail.password);
      if (valid) {
        res.status(200).json({
          access_token: signToken({ id: dataEmail.id }),
        });
      } else {
        throw {
          name: "-",
          status: 401,
          message: "Invalid email/password",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { googleToken } = req.body;
      if (!googleToken) throw { name: "invalid google token !" };
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      // console.log(payload)
      const { name, email, picture, sub } = payload;

      // const userid = payload['sub'];
      let dataUser = await User.findOne({
        where: {
          email: {
            [Op.iLike]: email,
          },
        },
      });
      let data = [];
      if (!dataUser) {
        data = await User.create({
          username : name,
          email,
          password: Math.random().toString(),
        });
      }
      res.status(201).json({
        access_token: signToken({ id: sub, email: email, name: name }),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
