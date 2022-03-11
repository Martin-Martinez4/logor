
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

    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log("token: ", token)
    jwt.verify(
        token,
        process.env.ACCESS_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.UserInfo.username;
            next();
        }
    )
}