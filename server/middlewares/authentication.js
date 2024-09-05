const { verifyToken } = require("../helpers/jwt");
const {User , Image } = require("../models")


const authentication = async (req, res , next ) => {

    try {
        const access_token = req.headers.authorization
        if (!access_token) throw {name : "invalid token"}

        const [bearer, token] = access_token.split(" ")

        // console.log("token: ", token);
        if (bearer !== "Bearer") throw { name: "invalid token" };

        let payload = verifyToken(token)
        // console.log("payload: ", payload);
        let userData = await User.findByPk(payload.id)
        // console.log(userData)
        if(!userData) throw {name : "invalid token"}
        req.user ={
            id: userData.id,
            email : userData.email,
        }
        // console.log("req.user: ", req.user);
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication;