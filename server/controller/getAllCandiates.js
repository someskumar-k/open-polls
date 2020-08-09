const pollcandidates = require('./modal/candidatemodal');
exports.getAllCandiates = (req,res,next)=>{
    pollcandidates.find({})
    .select({name:1,_id:1})
    .sort({name:1,votes:1})
    .exec(function(err,data){
        if (err) {
            return res.status(422).send(err);
          }
        return res.json(data);
    })
}

const addskills = function(dta){
    return JSON.stringify(dta)
}
exports.addCandidate = (req,res,next) =>{
    const reqbody = req.body;
    const candobj = new pollcandidates(
        {
            name:reqbody.name,
            challegescount:reqbody.challegescount,
            expertiselevel:reqbody.expertiselevel,
            expertelements:reqbody.expertelements,
        }
    )
    candobj.save((err,dta)=>{
        if(err){
            return res.status(422).send(err);
        }
        return res.status(200).send("sucess");
    })
}
exports.getCandidateDetails = (req,res,next) =>{
    pollcandidates.findById(req.params.cid,(err,data)=>{
        if (err) {
            return res.status(422).send(err);
          }

        return res.status(200).json(data);
    })
}
exports.addvote = (req,res,next) =>{
    const cid = req.params.cid;
    pollcandidates.findById(cid,(err,data)=>{
        if(err){
            return res.status(422).send(err);
        }
        else{
            data.votes = data.votes+1;
        data.save((err,data)=>{
            if(err){
                return res.status(422).send(err);
            }
            else{
                return res.status(200).send("sucess");
            }
        })

        }
    })
}