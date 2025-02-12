const jwt = require("jsonwebtoken")
const JWT_SECRET = "USER_APP";


function userMiddleware(req ,res ,next){
    const token = req.headers.token;
    const decoded = jwt.decode(token,JWT_SECRET);

    if(decoded){
        req.email = decoded.email;
        next()
    }else{
        res.status(403).json({
            msf: "you are not signed in"
        })
    }

}

module.exports = {
    userMiddleware
}