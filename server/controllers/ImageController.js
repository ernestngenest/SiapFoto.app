const fal = require("@fal-ai/serverless-client");
const fs = require("fs");
const toBase64Uri = require("../helpers/baseUri");
const { imgbox } = require('imgbox')
const {Image , User} = require('../models');
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

      // console.log("req.files.photo.mimetype: ", req.files.photo.mimetype);

      const staticParam = JSON.parse(
        fs.readFileSync("./data/setParam.json", "utf-8")
      );

      let imgType = req.body.imgtype;
      console.log("req.body.imgtype: ", req.body.imgType);
      let index = 0
      if(imgType === "male"){
        index = 0;
      }else if (imgType === "female"){
        index = 1
      }

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
      let linkPhoto = response.files[0].original_url

      let dataUpload = await Image.create({
        imgUrl : linkPhoto,
        prompt : staticParam[0].prompt,
        userid : req.user.id
      })
         
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
  static async deleteImage (req , res , next ){
    try {
      const {id} =  req.params
      const data = await Image.findByPk(id)
      if(!data) throw {name : "-" , status : 404 , message: "Image Not Found"}
      await data.destroy()
      res.status(200).json({
        message : "Success Delete"
      })
    } catch (error) {
      next(error)
    }
  }

  static async allImage (req, res, next ){
    try {
      const userid =  req.user.id
      const data = await Image.findAll({
        where:{
          userid:userid
        }
      })
      res.status(200).json({
        data
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ImageController;
