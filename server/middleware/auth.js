exports.isAuthenticated = function(req,res,next){
    if(req.isReqAuthenticated){
        next()
    }else{
        res.status(500)
        res.json({
            status: 0,
            message : 'not authenticated' 
        })
    }
}