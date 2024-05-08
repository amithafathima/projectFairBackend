// 5 import token
const jwt= require('jsonwebtoken')

// token verification

// 1
const jwtMiddleware=(req,res,next) =>
{
    console.log("Inside jwt middleware")

    try
    {
        //4 get the token
    // const token = req.headers['authorization']   
    const token = req.headers['authorization'].slice(7)  
    console.log(token) ;

    // 6 verify token
    const jwtVerification= jwt.verify(token,"super2024")
    console.log(jwtVerification)
    req.payload=jwtVerification.userId

    //3
    next()// ith kodthale athile(add-project) content varuu
    }

    catch(err)
    {
        res.status(401).json({"AuthorizationError":err.message})
    }
}


// 2
module.exports = jwtMiddleware