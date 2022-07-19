const Validators = require("../validators");

const ValidatorMiddleware = (validator) => {
  if (!Object.prototype.hasOwnProperty.call(Validators, validator)) {
    throw new Error(`'${validator}' validator does not exist`);
  }
  const validate = (req, res, next) => {
    const { error } = Validators[validator].validate(req.body);
    if (error) {
      res.status(422).json({
        status: "error",
        message: "Invalid request data",
        data: req.body,
      });
    } else {
      next();
    }
  };
  return validate;
};

module.exports = ValidatorMiddleware;
