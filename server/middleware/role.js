
const pollcandidates = require('../controller/modal/candidatemodal')
exports.populateroles = (req,res,next) => {
    if(req.user){
        pollcandidates.findOne({name:req.user.name},(err,data)=>{
            if(err){
                req.roles=['user']
            }else{
                req.roles=data.role.split(',');
            }
        })
    }else{
        req.roles=['user']
    }
    next()
   
}

exports.userinrole = (req_role) =>(req,res,next)=>{
    const userroles = req.roles
    if(userroles.includes(req_role)){
        next()
    }else{
        return res.status(500).send("NOT PERMITTED");
    }
}