const jwt = require("jsonwebtoken");
const User = require("../models/users.model")

const middlewareController = {
    verifyToken : (req, res, next) => {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) {
            res.status(401).json("You're not authenticated")
        }
        else {
            jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, user) => {
                if(err){
                    console.log(err)
                }
                else{
                    const newAccessToken = authController.generateAccessToken(user);
                    const newRefreshToken = authController.generateRefreshToken(user);
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly : true,
                        secure : false,
                        path : "/",
                        sameSite : "strict",
                    });
                    res.status(200).json({accessToken : newAccessToken});
                }
            })
        }

    },

    verifyAdminToken : (req, res, next) => {
        
    }
}

module.exports = middlewareController