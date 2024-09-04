const { Image,  User } = require("../models");

const authorization = async (req, res, next) => {
  try {
    // console.log(req.user, "<<<");
    const { id } = req.params;
    // console.log(id, "<<");
    let data = await Job.findOne({
      where: {
        id: id,
      },
    });
    if (!data) throw { name: "Forbbiden" };
    if (req.user.role === "admin") {
      next();
    } else if (req.user.role === "staff") {
      let userId = req.user.id;
      let owner = data.authorId;
      if (userId !== owner) {
        throw { name: "Forbbiden" };
      }
      next();
    }
  } catch (error) {
    next(error);
  }
};
module.exports = authorization;
