export const handlerSaveError = (error, data, next) => {
    error.status = 400;
    next();
}


export const setUpSetting = function(next) {
    this.options.new = true;
    this.options.runValidators = true;
    next();
}