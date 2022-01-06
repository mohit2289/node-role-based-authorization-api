var fs = require('fs');

module.exports = Logger;

function Logger() {    
    return [  
        // authorize based on user role
        (req, res, next) => {
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
             filePath = './data.txt';
            fs.appendFile(filePath, log, function () {
                next();
            });
            next();
        }
    ];
}

