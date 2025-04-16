module.exports = (err,req,res,next) =>{
    console.log("Error middleware", err);
    res.json(500).json({
        success:false,
        message:err.message || 'Server Error'
    })
}