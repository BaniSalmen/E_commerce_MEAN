function error_handler(err , req , res , next ){
     if(err){
        res.status(500).json({message : err})
     }
}
module.exports = error_handler();