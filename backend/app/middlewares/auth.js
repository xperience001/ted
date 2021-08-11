// const jwt = require('express-jwt');
const jwt = require('jsonwebtoken');
// const { secret } = require('config.json');

// module.exports = authorize;

// const authorize = (roles = []) => {
//     // roles param can be a single role string (e.g. Role.User or 'User') 
//     // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
//     if (typeof roles === 'string') {
//         roles = [roles];
//     }

//     return [
//         // authenticate JWT token and attach user to request object (req.user)
//         jwt({ secret, algorithms: ['HS256'] }),

//         // authorize based on user role
//         (req, res, next) => {
//             if (roles.length && !roles.includes(req.user.role)) {
//                 // user's role is not authorized
//                 return res.status(401).json({ message: 'Unauthorized' });
//             }

//             // authentication and authorization successful
//             next();
//         }
//     ];
// }

module.exports = (req, res, next)=> {
    try{
        const token = req.cookies.auth;

        if(token.length<0){
            return res.status(401).json({
                error: true,
                message: 'oga no token detected in cookie'
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decode)=>{
            if(err){
                return res.status(401).json({
                    error: true,
                    message: 'Invalid token passed'
                });
            }
            console.log('response from jwt decode', decode);
            req.token = decode.userID;
            next();
        });
    }
    catch(error){
        return res.status(401).json({
            error: true,
            message: 'Invalid token passed'
        });
    }
}