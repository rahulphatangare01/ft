// const jwt = require("jsonwebtoken");
// const db = require('../models');

// const User = db.User;

// module.exports = async(req, res, next) =>{
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({success:false, message:"Unauthorized"})
//     }
    

//     try {
//         const token = authHeader.split(" ")[1];
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findByPk(decoded.id);
//         if(!user) return  res.status(401)({success:false, message:"User not found"})
//             req.user = user
//         next()
//     } catch (error) {
//         return res.status(401).json({success:false,message:"Invalid token"})
//     }

// }

const jwt = require("jsonwebtoken");
const db = require('../models');
const User = db.User;

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Fix: add '!' before authHeader.startsWith
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        req.user = user; // Attach user to request
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};
