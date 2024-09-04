const { verifyToken } = require("../helpers/jwt");
const {User , Image } = require("../models")


const authentication = async (req, res , next ) => {

    try {
        const access_token = req.headers.authorization
        if (!access_token) throw {name : "invalid token"}
        const [bearer, token] = access_token.split(" ")
        if (bearer !== "Bearer") throw { name: "invalid token" };
        let payload = verifyToken(access_token)
        let userData = await User.findByPk(payload.id)
        if(!userData) throw {name : "invalid token"}
        req.user ={
            id: userData.email,
            email : userData.email,
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authentication;