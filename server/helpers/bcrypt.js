var {hashSync , compareSync} = require('bcryptjs');

module.exports = {
    hashToken : ( password ) => hashSync(password , 10) ,
    compareToken : (password ,  pass_db ) => compareSync(password , pass_db)
}
