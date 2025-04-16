const authService = require('../services/auth.service');
const {generateToken} = require('../utils/jwt.util');

exports.register = async(req,res,next) =>{
    try {
        
        const user = await authService.register(req.body);
        const token = generateToken(user.id);
        res.status(201).json({success:true, message:"User registered", data:{token,user}})
    } catch (error) {
        
        next(error)
    }
}


exports.login = async(req,res,next)=>{

    try {
        
        const {identifier,password} = req.body;
        const user = await authService.findByEmailOrMobile(identifier);

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({success:false, message:"Invalid credentials"})
        }

        await authService.updateLastLogin(user.id);
        const token  = generateToken(user.id);

        res.status(200).json({success:true, message:"Login successful", data:{token, user}})
    } catch (error) {
        next(error)
    }
}