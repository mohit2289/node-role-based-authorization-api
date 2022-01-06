const jwt = require('express-jwt');
const { secret } = require('config.json');
const roles = require('./role');

module.exports = auth;

function auth() {
    
    return [
        // authenticate JWT token and attach user to request object (req.user)
        jwt({ secret, algorithms: ['HS256'] }),

        // authorize based on user role
        (req, res, next) => {
            let rolename  = req.headers.role;
            var apiurl    = req.baseUrl;
            //var path    = req.path;
            var reqMethod = req.method;
            //console.log(apiurl);return false;      

            var roleRouteAccess = (roles[rolename]);   
            var accessauth = getValueByKey(reqMethod,apiurl,roleRouteAccess);          
            if (!accessauth) {
                return res.status(401).json({ message: 'Unauthorized access api' });
            }
            // authentication and authorization successful
            next();
        }
    ];
}

function getValueByKey(key,apiurl,data) {
    var i, len = data.length;    
    for (i = 0; i < len; i++) {  
        console.log(data[i].path);
        console.log(key);
        console.log(data[i][key]);
        if (data[i] && data[i].hasOwnProperty(key) && data[i].path == apiurl && data[i][key]==true) {
            return true;        
        }
    }    
    return false;
}