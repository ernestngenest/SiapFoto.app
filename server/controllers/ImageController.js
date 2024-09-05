const fal = require("@fal-ai/serverless-client");
const fs = require("fs");
const toBase64Uri = require("../helpers/baseUri");
const { imgbox } = require('imgbox')
const {Image , User} = require('../models')
fal.config({
  credentials: process.env.FAL_KEY,
});

class ImageController {
    
  static async postImg(req, res, next) {
    try {
      const base64 = req.files.photo.data.toString("base64");

      if (!req.files || !req.files.photo) {
        throw { name: "unknown file" };
      }

      const base64URI = toBase64Uri(req.files.photo.mimetype, base64);

      console.log("req.files.photo.mimetype: ", req.files.photo.mimetype);

      const staticParam = JSON.parse(
        fs.readFileSync("./data/setParam.json", "utf-8")
      );

      // console.log(staticParam,"staticParam <<<<<<<")

      const result = await fal.subscribe("fal-ai/omni-zero", {
          input: {
            prompt: staticParam[0].prompt,
            image_url: staticParam[0].base, // Use Base64 string here
            composition_image_url: staticParam[0].composition, // Use Base64 string here
            style_image_url: staticParam[0].style, // Use Base64 string here
            identity_image_url: base64URI, // Use Base64 string here
          },
          logs: true,
          onQueueUpdate: (update) => {
            if (update.status === "IN_PROGRESS") {
              update.logs.map((log) => log.message).forEach(console.log);
            }
          },
        });

      let response =  await imgbox(result.image.url) //upload img 
      // let response =  await imgbox("https://imgv3.fotor.com/images/homepage-feature-card/Random-image-generator_5.jpg")
      let linkPhoto = response.files[0].original_url
      // console.log("linkPhoto: ", linkPhoto);
      
      // console.log("req.user.id: ", req.user.id);

      let dataUpload = await Image.create({
        imgUrl : linkPhoto,
        prompt : staticParam[0].prompt,
        userid : req.user.id
      })
      // console.log(dataUpload , "<<< ini data upload ")      
      res.status(201).json({
        userid : req.user.id,
        imgBoxUrl:dataUpload.imgUrl,
        prompt: staticParam[0].prompt,
      });

    } catch (error) {
      // next(error)
      res.send(error);
    }
  }
}

module.exports = ImageController;
