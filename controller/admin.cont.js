import Admin from "../model/admin.model.js"
import Jwt  from "jsonwebtoken";
import {z} from "zod";
import Dotenv  from "dotenv";
import { ROLE_ADMIN } from "../constants/constants.js";



Dotenv.config();
// register
export const adminSignUp = async (req,res)=>{
try {
    const {email,password} = req.body;
    
const mySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  }).strict();

let adminSchema =  mySchema.safeParse({
    email:email,
    password:password,
})
let oldEmail = await Admin.findOne({
    email:email
})
if(adminSchema.success){
    if(oldEmail){
      
        res.send({ message: "Email already registered please signIn",status: "error"});
    }else{
    const newAdmin = await Admin.create({
    email:email,
    password:password,
    role:ROLE_ADMIN
    })
   

    if(newAdmin){
        const adminObject = newAdmin.toObject();
        let token =  Jwt.sign(adminObject,process.env.SECRET)
        console.log(token);
        res.send({ message: "admin created successfully", token: token,status: "success" });

    }else{
        
        res.send({ message: "admin not added",status: "error"});
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
export const adminSignIn = async (req,res,next)=>{
try {

    const {email,password} = req.body;

    
const mySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  }).strict();

let adminSchema =  mySchema.safeParse({
    email:email,
    password:password,
})
let admin = await Admin.findOne({
    email:email,
    password:password,
})

if(adminSchema.success){
    if(admin){
        res.send({ message: "Welcome Sir",status: "success"});
    }else{
        res.send({ message: "No Admin Registred",status: "error"});   
}
}else{
    res.send({ message: "Enter in data in right format",status: "error"});
   
}
} catch (error) { 
    console.log(error);
    res.send({ message: "something went wrong"});
    
}
}

    // update
