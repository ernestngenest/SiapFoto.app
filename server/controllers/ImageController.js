const fal = require("@fal-ai/serverless-client");
const fs = require("fs");
const toBase64Uri = require("../helpers/baseUri");
const { imgbox } = require("imgbox");
const { Image } = require("../models");
const nodemailer = require("nodemailer");
const axios = require("axios");
const Mailgen = require("mailgen");

fal.config({
  credentials: process.env.FAL_KEY,
});

class ImageController {
  static async postImg(req, res, next) {
    try {
      if (!req.files || !req.files.photo) {
        throw { name: "unknown file", status: 400, message: "No file uploaded" };
      }

      const base64 = req.files.photo.data.toString("base64");
      const base64URI = toBase64Uri(req.files.photo.mimetype, base64);

      const staticParam = JSON.parse(fs.readFileSync("./data/setParam.json", "utf-8"));

      let imgType = req.body.imgtype;
      let index = imgType === "female" ? 1 : 0;

      const result = await fal.subscribe("fal-ai/omni-zero", {
        input: {
          prompt: staticParam[0].prompt,
          image_url: staticParam[0].base,
          composition_image_url: staticParam[0].composition,
          style_image_url: staticParam[0].style,
          identity_image_url: base64URI,
        },
        logs: true,
        onQueueUpdate: update => {
          if (update.status === "IN_PROGRESS") {
            update.logs.map(log => log.message).forEach(console.log);
          }
        },
      });

      const response = await imgbox(result.image.url); // Upload image
      const linkPhoto = response.files[0].original_url;

      const dataUpload = await Image.create({
        imgUrl: linkPhoto,
        prompt: staticParam[0].prompt,
        userid: req.user.id,
      });

      res.status(201).json({
        userid: req.user.id,
        imgBoxUrl: dataUpload.imgUrl,
        prompt: staticParam[0].prompt,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteImage(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Image.findByPk(id);
      if (!data) throw { name: "NotFound", status: 404, message: "Image Not Found" };

      await data.destroy();
      res.status(200).json({
        message: "Success Delete",
      });
    } catch (error) {
      next(error);
    }
  }

  static async allImage(req, res, next) {
    try {
      const userid = req.user.id;
      const data = await Image.findAll({
        where: {
          userid: userid,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getImgById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Image.findOne({
        where: {
          id: id,
        },
      });
      if (!data) throw { name: "NotFound", status: 404, message: "Image not found" };
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async sendEmail(req, res, next) {
    try {
      const { id } = req.params;

      const imgData = await Image.findByPk(id);
      if (!imgData) throw { name: "NotFound", status: 404, message: "Image Data Not Found" };

      const imageUrl = imgData.imgUrl;
      const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
      const imgBuffer = Buffer.from(response.data, "binary");

      const config = {
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      };
      const transporter = nodemailer.createTransport(config);

      const MailGenerator = new Mailgen({
        theme: "default",
        product: {
          name: "SiapFOTO",
          link: "https://SiapFoto.com",
        },
      });

      const responses = {
        body: {
          name: req.user.name || "Customer",
          intro: "Here is the image you requested from SiapFoto!",
          table: {
            data: [
              {
                item: imgData.imgName || "Your Generated Image",
                description: "AI-generated image from SiapFoto",
              },
            ],
          },
          outro: "We hope you enjoy your image!",
        },
      };

      const mail = MailGenerator.generate(responses);

      const message = {
        from: process.env.EMAIL,
        to: req.user.email,
        subject: "Your SiapFoto Result",
        html: mail,
        attachments: [
          {
            filename: imgData.imgName || 'image.jpg',
            content: imgBuffer,
            contentType: 'image/jpeg',
          },
        ],
      };

      await transporter.sendMail(message);
      res.status(200).json({ message: 'Email sent successfully with the image attachment.' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ImageController;
