const { Op } = require("sequelize");
const { User } = require("../models");
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
      next(error);
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

      if (emailData)
        throw { name: "custom", status: 400, message: "Email already taken!" };

      await User.create({
        username,
        email,
        password,
      });

      res.status(201).json({
        message: "Account successfully created",
      });
    } catch (error) {
      next(error);
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

      if (!dataEmail) {
        throw { name: "-", status: 401, message: "Invalid email/password" };
      }

      const valid = compareToken(password, dataEmail.password);
      if (valid) {
        res.status(200).json({
          id: dataEmail.id,
          username: dataEmail.username,
          access_token: signToken({ id: dataEmail.id }),
        });
      } else {
        throw { name: "-", status: 401, message: "Invalid email/password" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { googleToken } = req.body;
      if (!googleToken) throw { name: "invalid google token !" };

      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const { name, email, sub } = payload;

      let dataUser = await User.findOne({
        where: {
          email: {
            [Op.iLike]: email,
          },
        },
      });

      if (!dataUser) {
        dataUser = await User.create({
          username: name,
          email,
          password: Math.random().toString(),
        });
      }

      res.status(201).json({
        id: dataUser.id,
        username: name,
        access_token: signToken({ id: sub, email, name }),
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUsername(req, res, next) {
    try {
      const { id } = req.params;
      const { username } = req.body;

      if (!username) throw { name: "-", status: 400, message: "Username required" };

      await User.update({ username }, {
        where: { id }
      });

      res.status(201).json({
        message: "Username has been updated",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
