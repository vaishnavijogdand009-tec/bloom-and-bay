const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access Denied. No Token Provided."
            });
        }

        // Get Token
        const token = authHeader.split(" ")[1];

        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Store decoded data
        req.user = decoded;

        next();

    } catch (error) {

        res.status(401).json({
            success: false,
            message: "Invalid or Expired Token"
        });

    }
};

module.exports = protect;