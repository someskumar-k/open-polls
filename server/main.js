const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const {initilizeDB} = require('./sqlitedb/sqlite')
const {isAuthenticated} = require('./middleware/auth')
const {populateroles,userinrole} = require('./middleware/role')
const {getAllCandiates,
  addCandidate,
  addvote,
  getCandidateDetails
} = require('./controller/getAllCandiates');


const port = process.env.PORT || 3051
const dburi = process.env.dburi
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('DB Connected Sucessfully'))
  .catch(err => console.log("Error Occurred in DB Connection \n"))
app.use(cors())
app.use(bodyParser.json({limit:'5mb'}));
app.use(express.static(path.join(__dirname, 'client')));
app.options("*",function(req,res,next){
  res.status(200).send()
})
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
})
app.get('/listcontestants',userinrole('user'),getAllCandiates);
app.post('/addCandidate',userinrole('user'),addCandidate);
app.post('/addvote/:cid',userinrole('user'),addvote)
app.get('/getCandidateDetails/:cid',userinrole('user'),getCandidateDetails)
app.listen(port)
console.log("app is listennin on"+port)