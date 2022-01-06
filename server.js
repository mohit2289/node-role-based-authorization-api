require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_helpers/error-handler');
const auth = require('_helpers/auth')
const prepper = require('prepper')
const Sequence = prepper.handlers.Sequence
const Merge = prepper.handlers.Merge
const os = require('os')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//app.use("/",router);

/* let Logger = (req, res, next) => {
    let current_datetime = new Date();
    let formatted_date =
      current_datetime.getFullYear() +
      "-" +
      (current_datetime.getMonth() + 1) +
      "-" +
      current_datetime.getDate() +
      " " +
      current_datetime.getHours() +
      ":" +
      current_datetime.getMinutes() +
      ":" +
      current_datetime.getSeconds();
    
    let method = req.method;
    let url = req.url;
    let rolename  = req.headers.role;
    let reqbody = (JSON.stringify(req.body));       
    let status = res.statusCode;
    let log = `[${formatted_date}] ${method}:${url} ${status} ${reqbody} ${rolename} `;
    console.log(log);
    next();
  };  
app.use(Logger);*/

// api routes
app.use('/users', require('./users/users.controller'));



// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});