
// Simulate a Bad Request error
exports.GetBadRequest = async (req, res, next) => {
    const error = new Error('Bad Request');
    error.status = 400;
    next(error);
};
// Simulate a Not Found error
exports.GetNotFound = async (req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
};
// Simulate a Server Error
exports.GetServerError = async (req, res, next) => {
    const error = new Error('Internal Server Error');
    error.status = 500;
    next(error);
};