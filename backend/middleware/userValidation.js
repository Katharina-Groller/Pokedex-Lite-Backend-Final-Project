const { validateToken } = require("../lib/security/token");
const { UserRoles } = require("../lib/security/roles");

async function authenticateToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        const error = new Error("Invalid Token");
        error.statusCde = 401;
        return next(error);
    }
    try {
        const decoded = await validateToken(token, "token-secret");
        req.user = decoded;
        next();
    } catch (error) {
        error.statusCode = 403;
        return next(error);
    }
}


async function userNotFound(User, id) {
    const user = await User.findOne({ _id: id });
    if (!user) {
        const error = new Error("Benutzer nicht gefunden");
        error.statusCode = 404;
        throw error;
    }
    return user;
}

const protectAdminRoute = (req, res, next) => {
    const user = req.user;
    if (user.role === UserRoles.ADMIN) {
        next();
    } else {
        const error = new Error("You are not an Admin");
        error.statusCode = 403;
        return next(error);
    }
};


module.exports = { authenticateToken, protectAdminRoute, userNotFound };
