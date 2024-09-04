let errorHandler = (error, req, res, next) => {
  let status = req.status || 500;
  let message = error.message || "Internal Server Error";

  switch (error.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      status = 401;
      message = error.errors[0].message;
      break;
    case "JsonWebToken":
      status = 401;
      message = error.errors[0].message;
      break;
    case "Invalid username":
      status = 400;
      message = "Invalid username";
      break;
    case "invalid email":
      status = 400;
      message = "invalid email";
      break;
    case "invalid password":
      status = 400;
      message = "invalid password";
      break;
    case "invalid token":
      status = 400;
      message = "invalid token";
    case "invalid google token !":
      status = 400,
      message  = "invalid google token !"
  }
  res.status(status).json({
    message: message,
  });
};

module.exports = errorHandler;
