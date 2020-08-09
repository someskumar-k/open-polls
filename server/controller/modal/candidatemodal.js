const mongoose = require('mongoose');
const schema = mongoose.Schema;

const sch_candidates = new schema({
    name:{type:String,required:true,unique:true},
    challegescount:Number,
    expertiselevel:{ type:Number, min: 0, max: 05 },
    expertelements:JSON,
    role:{type:String,required:true,default:'candidate,user'},
    votes:{type:Number,default:0}
    
});
module.exports = mongoose.model('pollcandidates', sch_candidates);
