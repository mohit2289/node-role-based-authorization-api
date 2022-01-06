module.exports = {
    SuAdmin: 'Admin',
    User: 'User',
    Admin:[{        
            'path': '/users',
             'GET':true,
             'POST':true,
             'PUT' :true,
             'DELETE' : 'true'
        },
        {
            'path': '/users/adduser',
             'GET':true,
             'POST':true,
             'PUT' :true,
             'DELETE' : true
        }],    
    
}