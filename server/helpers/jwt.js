var {verify , sign} = require('jsonwebtoken');

module.exports = {
    verifyToken : (token) => verify(token , "secret") ,
    signToken : (token) => sign(token , "secret") 
}
