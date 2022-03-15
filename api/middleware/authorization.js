
import jwt from "jsonwebtoken"

// export const requireAuth = (req, res, next) => {

//     const authHeader = req.headers.authorization;

//     // const jwtToken = authHeader && authHeader.split(' ')[1];
//     const jwtToken = authHeader && authHeader;

//     console.log("veri: ", jwtToken)

//    if(jwtToken === null){

//     return res.status(401).json({error: "Null Token"})

//    }

//    jwt.verify(jwtToken, process.env.ACCESS_SECRET, (err, id) => {

//     console.log("user: ",user)
    
//     if(err){
//         return res.status(401).json({error: err.message });
//     }
    
//         // console.log(user)
//         req.user  = user;
//         next();

//    });
// }

export const authenticateToken = (req, res, next) => {

    
    const token  = req.cookies.refresh_token;
    console.log("token: ", token)
    jwt.verify(
        token,
        process.env.REFRESH_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            console.log("decoded, middleware: ", decoded)
            req.user_id = decoded.id;
            next();
        })
}