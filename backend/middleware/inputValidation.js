const { validationResult } = require("express-validator");
const createError = require("http-errors");

exports.validationInputs = (inputs) => {
    return [
        ...inputs,
        (req, res, next) => {
            const error = validationResult(req);
            if (error.isEmpty()) {
                return next();
            }
            const extractedErrors = error.array().map((err) => err.msg);

            const err = createError(422, extractedErrors.join(", "));
            return next(err);
        },
    ];
};
