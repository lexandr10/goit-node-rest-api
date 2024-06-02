import HttpError from "../helpers/HttpError.js";


const EmptyFileMidd = (req, res, next) => {
    const file = req.file;
    if(!file) {
return next(HttpError(404, "File not found"))
    }
    next();
}
export default EmptyFileMidd;