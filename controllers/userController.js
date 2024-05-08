

// 1 import userSchema or Model

const users = require('../Models/userSchema');// this is the users we see in mongoDB 

//3 import jsonwebtoken
const jwt = require('jsonwebtoken')// for login purposes

// 2 Register Logic
exports.register = async (req, res) => {
    //1 accepts data from client
    const { username, email, password } = req.body //req came from frontend to backend and res goes from backend to frontend
    console.log(username, email, password);// fe n be lott vannonn ariyan

    try {
        // 2 check if email is already registered
        const existingUser = await users.findOne({ email })// users-(userController)
        console.log(existingUser);

        if (existingUser) {  //3
            // res.status(406).json("User already registred")
            res.status(406).json("User already registred")
        }
        else { //4
            const newUser = new users({
                username,
                email,
                password,
                github: "",
                livelink: "",
                profile: ""
            })
            await newUser.save()
            res.status(200).json(newUser) // is passed to frontend
        }

    }
    catch (err) { //5
        res.status(500).json("Register failed...") // is passed to frontend
        // try catch for error handling
    }
}






// 4 login logic

exports.login = async (req, res) => {
    // 1 accept data from client
    const { email, password } = req.body
    try {
        // 2 check if email and password is db
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            const token=jwt.sign({userId:existingUser._id},"super2024")// userId:existingUser._id -----is the payload
            // sign mathod is used to create token from jwt
            console.log(token);
            res.status(200).json({existingUser,token})
        }
        else {
            res.status(404).json("Invalid email or password")
        }

    }
    catch (err) {
        res.status(500).json("Login failed..." + err)
    }
}