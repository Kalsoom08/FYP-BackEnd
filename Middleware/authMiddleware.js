const { verifyToken } = require('../Utils/JWTGenerator');

const adminAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided!' });
    }

    const token = authHeader.split(' ')[1]; 

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid or expired token!' });
    }

    if (decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access only!' });
    }

   
    req.admin = decoded; 
    next();
};

module.exports = adminAuthMiddleware;
