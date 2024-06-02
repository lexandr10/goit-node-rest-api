import HttpError from "../helpers/HttpError.js";

const emptyMiddleware = (req, res, next) => {
    const {length} = Object.keys(req.body);
    const {email} = req.body;
    if(!email) {
        return next(HttpError(400, "missing required field email"))
    }
    if(!length) {
        return next(HttpError(404, "Body must have at least one field"));
    }
    next();
}
export default emptyMiddleware;