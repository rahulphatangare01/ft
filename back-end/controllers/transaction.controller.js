const service = require('../services/transaction.service');


exports.create = async(req, res, next) =>{

    try {
        const {type,amount,categoryId,description,date} = req.body;
        const data = await service.create({
            type,
            amount,
            categoryId,
            description,
            date,
            userId: req.user.id
        });

        res.status(201).json({success:true, message:"Transaction created",data})
    } catch (error) {
        next(error)
    }
}

exports.getAll = async (req, res, next) =>{
    try {
        
        const data = await service.findAll(req.user.id);
        res.status(200).json({success:true,data});
    } catch (error) {
        next(error)
    }
};

exports.update = async (req, res, next) =>{
    try {
        const {id} = req.params;
        await service.update(id,req.user.id, req.body);
        res.status(200).json({success:true, message:"Transaction updated"})

    } catch (error) {
        next(error)
    }
}

exports.delete = async(req, res, next) =>{

    try {
        
        const {id} = req.params;
        await service.delete(id,req.user.id);
        res.status(200).json({success:true, message:"Transaction deleted"})
    } catch (error) {
        next(error)
    }
}