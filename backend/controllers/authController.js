const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if(!username || !password){
            return res.status(400).json({message:"all fields are required"});
        }

        const emailExists = await user.findOne({ email });

        if(emailExists){
            return res.status(400).json({message:"email already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const saveUser = await user.create({
            username,
            email,
            password: hashedPassword,
            role
        });

        if(saveUser){
            return res.status(201).json({ message: "user registered successfully", saveUser});
        }
    } catch (error) {
        console.error("error while creating user", error);

    }
};

const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: "all fields are required"});
        }

        const checkEmail = await user.findOne({ email });

        if(!checkEmail){
            return res.status(400).json({ message: "email not exists" });
        }

        const comparePassword = await bcrypt.compare(password, checkEmail.password);

        if(!comparePassword){
            return res.status(400).json({ message: "invalid password"});
        }

        const token = await jwt.sign({ "user id": checkEmail._id }, process.env.JWT_SECRET, {"expiresIn": "1d"});

        if(token){
            return res.status(200).json({ message: "user login successful", token});
        }
    } catch (error) {
        console.error("error while logging in", error);
    }
};

module.exports = { signup, login };