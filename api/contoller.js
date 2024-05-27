import Admin from "../model/admin.model.js"
import User from "../model/user.model.js";
import Jwt  from "jsonwebtoken";
import {z} from "zod";
import Dotenv  from "dotenv";
import Product from "../model/product.model.js"
import Category from "../model/category.model.js";
import Banner from "../model/banner.model.js";
import Brand from "../model/brand.model.js";
import { STATUS_ACTIVE,ROLE_USER,ROLE_ADMIN } from "../constants/constants.js";

Dotenv.config();


// For Viewing All Products
export const viewAllProduct = async (req,res)=>{
    try {
              
        const Products = await Product.find().populate('category');
       
        if(Products){
            console.log(Products);
            res.send({ message: "All products listed",Products:Products,status: "success" });
    
        }else{
            
            res.send({ message: "Unable to get products",status: "error"});
        }
    
    
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
}

// get single product
export const viewParticularProduct = async (req,res)=>{
    try {

        const prod_id = req.query.id;
        console.log(prod_id);
              if(!prod_id){
                return res.status(400).send({ message: "Unable to get product id", status: "error" });
              
              }
        const product = await Product.findOne({
            _id:prod_id
        }).populate('category')
       
        if(product){
           
            res.send({ message: "All products listed",item:product,status: "success" });
    
        }else{
            
            res.status(404).send({ message: "Product not found", status: "error" });
        }
    
    
    } catch (error) { 
        console.log(error);
        res.status(500).send({ message: "Something went wrong", status: "error" });
        
    }
}


// For Viewing All Category
export const viewAllCategory = async (req,res)=>{
    try {
              
        
        const CategorysCond = await Category.find().where({status:STATUS_ACTIVE})
       
        if(CategorysCond){
           
            res.send({ message: "All Categorys listed",Categorys:CategorysCond,status: "success" });
    
        }else{
            
            res.send({ message: "Unable to get Categorys",status: "error"});
        }
    
    
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
}

// view all brands
export const viewAllBrand = async (req,res)=>{
    try {
              
        const Brands = await Brand.find()
        const BrandsCond = await Brand.find().where({status:STATUS_ACTIVE})
       
        if(Brands){
            console.log(Brands);
            res.send({ message: "All Brands listed",brands:Brands,brandsCond:BrandsCond,status: "success" });
    
        }else{
            
            res.send({ message: "Unable to get Brands",status: "error"});
        }
    
    
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
}

// For filter
export const filterCategoryWise = async (req,res)=>{
    try {
            let  categoryId = req.query.id;
        
        const products = await Product.find().where({
            category:categoryId}).populate("category")
       
        if(products){
           
            res.send({ message: "All Products listed",prod:products,status: "success" });
    
        }else{
            
            res.send({ message: "Unable to get Products",status: "error"});
        }
    
    
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
}

// for banners
export const viewAllBanner = async (req,res)=>{
    try {
              
        const Banners = await Banner.find();
       
        if(Banners){
            console.log(Banners);
            res.send({ message: "All Banners listed",banner:Banners,status: "success" });
    
        }else{
            
            res.send({ message: "Unable to get Banners",status: "error"});
        }
    
    
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
}

// user signup
export const userSignUp = async (req,res)=>{
    try {
        console.log("jisds");
        console.log(req.body);
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
            
            res.send({ message: "User created successfully",status: "success" });
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

// user signin
export const userSignIn = async (req,res,next)=>{
    try {
        console.log("asdasda");
    
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
            let token =  Jwt.sign(user.toObject(),process.env.SECRET)
            console.log(token);

            res.send({ message: `Welcome ${user.fullname}`,token: token,status: "success"});
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