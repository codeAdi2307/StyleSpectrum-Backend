import User from "../model/user.model.js";
import Jwt  from "jsonwebtoken";
import {z} from "zod";
import Dotenv  from "dotenv";
import { ROLE_USER } from "../constants/constants.js";



Dotenv.config();
// register
export const userSignUp = async (req,res)=>{
try {
    const {email,password,fullname} = req.body;
    
const mySchema = z.object({
    email: z.string().email(),
    password: z.string(),
    fullname: z.string(),
  }).strict();

let userSchema =  mySchema.safeParse({
    email:email,
    password:password,
    fullname:fullname,
})
let oldEmail = await User.findOne({
    email:email
})
if(userSchema.success){
    if(oldEmail){
        res.send({ message: "You Are already registered please signIn",status: "error"});
    }else{
    const newUser = await User.create({
    email:email,
    fullname:fullname,
    password:password,
    role:ROLE_USER
    })
    if(newUser){
        const UserObject = newUser.toObject();
        let token =  Jwt.sign(UserObject,process.env.SECRET)
        console.log(token);
        res.send({ message: "User created successfully", token: token,status: "success" });
    }else{
        res.send({ message: "User not added",status: "error"});
    }
}
}else{
    res.send({ message: "Enter in data in right format",status: "error"});
}
} catch (error) { 
    console.log(error);
    res.send({ message: "something went wrong"});
}
}

// Login
export const userSignIn = async (req,res,next)=>{
try {

    const {email,password} = req.body;

    
const mySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  }).strict();

let userSchema =  mySchema.safeParse({
    email:email,
    password:password,
})
let user = await User.findOne({
    email:email,
    password:password,
})

if(userSchema.success){
    if(user){
        res.send({ message: `Welcome ${user.fullname}`,status: "success"});
    }else{
        res.send({ message: "No User Registred",status: "error"});   
}
}else{
    res.send({ message: "Enter in data in right format",status: "error"});
   
}
} catch (error) { 
    console.log(error);
    res.send({ message: "something went wrong"});
    
}
}





export const userLogin = async (req,res)=>{

    const {email,password} = req.body;

    try {
        const userData = User.findOne({email});
        if(!userData){
            return res.json({message: "User not registered"})
        }
        const getPassword = userData.password;
        if(getPassword == password){
            const accessToken = Jwt.sign({
                _id: userData._id,
                isUser: userData.isUser
            },"aditya",{expiresIn:"3d"});
            
            return res.json({message: `Welcome Back ${userData.username}`,accessToken})
        }
    } catch (error) {
        res.json(error)
    }
    }

    // update
