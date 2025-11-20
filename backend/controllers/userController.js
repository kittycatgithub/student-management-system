// API coming from Frontend will be received in Controllers
// API will send to Frontend from Controller

import axios from "axios"
import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { response } from "express";

// User Registration Api Controller Function
// Register User : /api/user/register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if( !name || !email || !password ){
            return res.json({success: false, message: "Missing Details"})
        }
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.json({success: false, message:"User Already Exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10) // 10 = salt rounds
        const user = await User.create({name, email, password: hashedPassword })

        // After user creation, send token (validity 10 days) in response
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '10d'})

        res.cookie('token', token, {
            httpOnly: true, // Prevent Javascript to access cookie
            secure: process.env.NODE_ENV === 'production', //Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF 
            maxAge: 10 * 24 * 60 * 60 * 1000, //Cookie expiration time
        })
        return res.json({success: true, user: {email: user.email, name: user.name}})
        
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

// Login User : /api/user/login

export const login = async ( req, res ) => {
    try {
        const {email, password} = req.body; 

        if( !email || !password ){
            return res.json({ success: false, message: "Email and Password are required" })
        }
        const user = await User.findOne({email})

        if(!user){
            return res.json({ success: false, message: "Invalid Email or Password" })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({ success: false, message: "Invalid Email or Password" })
        }
        const token = jwt .sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '10d'})

        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF 
            maxAge: 10 * 24 * 60 * 60 * 1000, 
        })
        return res.json({success: true, user: {email: user.email, name: user.name}})
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})       
    }
}

// Check Auth : /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId).select("-password")
        return res.json({ success: true, user })
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})  
    }
}

// Logout User : /api/user/logout
export const logout = async ( req, res ) => {
    try {
        res.clearCookie('token',{
            // httpOnly: true,
            secure: process.env.NODE_ENV === 'production', //Browser will block the cookie on localhost (because localhost is HTTP, not HTTPS).
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.json({success: true, message: "Logged Out"})
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})  
    }
}

