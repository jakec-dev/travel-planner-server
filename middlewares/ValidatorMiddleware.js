const Validators = require("../validators");

function ValidatorMiddleware(validator) {
  if (!Object.prototype.hasOwnProperty.call(Validators, validator))
    throw new Error(`'${validator}' validator does not exist`);

  return function validate(req, res, next) {
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
}

module.exports = ValidatorMiddleware;
