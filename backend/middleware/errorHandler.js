function errorHandler(err, req, res, next) {
    // erstellen eines error status
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        statusCode: statusCode,
        messages: err.messages,
    });
}

module.exports = { errorHandler }