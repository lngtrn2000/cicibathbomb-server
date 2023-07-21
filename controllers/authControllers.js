const User = require("../models/users.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const authController = {
    //Function
    //Generate Access Token
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin
        },
            process.env.ACCESS_KEY,
            { expiresIn: "2h" }
        )
    },

    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin
        },
            process.env.REFRESH_KEY,
            { expiresIn: "2h" }
        )
    },

    //REGISTER
    registerUser: async (req, res) => {
        try {
            const existUser = await User.findOne({ username: req.body.username });
            if (!existUser) {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(req.body.password, salt)

                //Create New User
                const newUser = await new User({
                    username: req.body.username,
                    password: hashed,
                })

                //Save To Database
                const user = await newUser.save();
                res.status(200).json({message: "Tạo tài khoản thành công"})
            }
            else{
                res.status(404).json({message: "Tên tài khoản đã tồn tại"})
            }


        } catch (error) {
            res.status(500).json(error)
        }
    },

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                res.status(404).json("Wrong username")
            }
            else {
                const validPassowrd = await bcrypt.compare(
                    req.body.password,
                    user.password
                );
                if (!validPassowrd) {
                    console.log('wrong password')
                    res.status(404).json("Wrong password")
                }
                if (user && validPassowrd) {
                    const accessToken = authController.generateAccessToken(user)
                    const refreshToken = authController.generateRefreshToken(user)
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: false,
                        secure: false,
                        path: "/",
                        sameSite: "strict",
                    })
                    const { password, ...others } = user._doc;
                    res.status(200).json({ ...others, accessToken })
                }
            }

        } catch (error) {
            res.status(500).json(error)
        }
    },

    deleteUser  : async (req, res) => {
        try {
            await User.findOneAndRemove({_id : Object.keys(req.body)}, function(err,docs) {
                if(err){
                    console.log(err)
                }
                else{
                    console.log("Removed user")
                    res.status(200).json("Success")
                }
            })

        } catch (error) {
            res.status(404).json("Cannot delete user")
        }
    },

    refreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            res.status(401).json("You're not authenticated")
        }
        else {
            jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, user) => {
                if (err) {
                    console.log(err)
                }
                else {
                    const newAccessToken = authController.generateAccessToken(user);
                    const newRefreshToken = authController.generateRefreshToken(user);
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: false,
                        path: "/",
                        sameSite: "strict",
                    });
                    res.status(200).json({ accessToken: newAccessToken });
                }
            })
        }
    }
}

module.exports = authController; 