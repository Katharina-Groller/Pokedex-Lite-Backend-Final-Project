function errorHandler(err, req, res, next) {
    // erstellen eines error status
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        statusCode: statusCode,
        messages: err.messages,
        message: err.message,
    });
}

async function userNotFound(Model, id) {
    const user = await Model.findOne({ _id: id });
    if (!user) {
        const error = new Error("Benutzer nicht gefunden");
        error.statusCode = 404;
        throw error;
    }
    return user;
}

async function pokemonNotFound(Model, name) {
    const pokemon = await Model.findOne({ name: name });
    if (!pokemon) {
        const error = new Error("Pokemon nicht gefunden");
        error.statusCode = 404;
        throw error;
    }
}
module.exports = { errorHandler, userNotFound, pokemonNotFound };
