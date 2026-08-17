const jwt = require("jsonwebtoken");

async function User(req, res, next) {
    try {
        console.log("Cookies:", req.cookies);
        console.log("JWT secret exists:", !!process.env.JWT_SCRETE);

        const token = req.cookies?.token;

        if (!token) {
            console.log("❌ Token not found");

            return res.status(401).json({
                message: "Token not found",
            });
        }

        console.log("✅ Token received");

        const decoded = jwt.verify(
            token,
            process.env.JWT_SCRETE
        );

        console.log("✅ Token verified:", decoded);

        req.user = decoded;

        next();

    } catch (error) {
        console.error("❌ Auth middleware error:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
}

module.exports = { User };
