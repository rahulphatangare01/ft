const db = require('../models');
const User = db.User;
const { Op } = require("sequelize");


exports.register = async(userData)=>{
    return await User.create(userData);
}


exports.findByEmailOrMobile = async(identifier) =>{
    return await User.findOne({
        // where:{
        //     [db.sequelize.drop.or]: [
        //         {email:identifier},
        //         {mobileNo:identifier}
        //     ]
        // }
        where: {
            [Op.or]: [
              { email: identifier },
              { mobileNo: identifier }
            ]
          }
    })
}

exports.updateLastLogin = async(userId)=>{
    return await User.update({lastLogin: new Date()}, {where:{id:userId}})
}