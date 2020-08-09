const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const sslRedirect = function(environments, status) {
  environments = environments || ['production'];
  status = status || 302;
  return function(req, res, next) {
    if (environments.indexOf(process.env.NODE_ENV) >= 0) {
      if (req.headers['x-forwarded-proto'] != 'https') {
        res.redirect(status, 'https://' + req.hostname + req.originalUrl);
      }
      else {
        next();
      }
    }
    else {
      next();
    }
  };
};
;

const {initilizeDB} = require('./sqlitedb/sqlite')
const {isAuthenticated} = require('./middleware/auth')
const {populateroles,userinrole} = require('./middleware/role')
const {getAllCandiates,
  addCandidate,
  addvote,
  getCandidateDetails
} = require('./controller/getAllCandiates');


const port = process.env.PORT || 3051
initilizeDB();
const dburi = process.env.dburi
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('DB Connected Sucessfully'))
  .catch(err => console.log("Error Occurred in DB Connection \n"))
app.use(cors())
app.use(sslRedirect());

app.use(populateroles)
app.use(bodyParser.json({limit:'5mb'}));
app.use(express.static(path.join(__dirname, 'client')));
app.options("*",function(req,res,next){
  res.status(200).send()
})
app.get('/', async function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
})
app.get('/listcontestants',userinrole('user'),getAllCandiates);
app.post('/addCandidate',userinrole('user'),addCandidate);
app.post('/addvote/:cid',userinrole('user'),addvote)
app.get('/getCandidateDetails/:cid',userinrole('user'),getCandidateDetails)
app.listen(port)