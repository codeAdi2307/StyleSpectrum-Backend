import Admin from "../model/admin.model.js"
import Jwt  from "jsonwebtoken";
import {z} from "zod";
import Dotenv  from "dotenv";
import { ROLE_ADMIN } from "../constants/constants.js";
import Banner from "../model/banner.model.js";



Dotenv.config();
// register
export const addBanner = async (req, res) => {
    try {
      const { title, description, imageUrl, status, category } = req.body;
  
      // Validate the request body
      const mySchema = z.object({
        title: z.string(),
        description: z.string(),
        imageUrl: z.string(),
       
      }).strict();
  
      let bannerSchema = mySchema.safeParse({
        title: title,
        description: description,
        imageUrl: imageUrl,
    
      });
  
      if (!bannerSchema.success) {
        return res.send({ message: bannerSchema.error, status: "error" });
      }
  
      // Create the banner
      const newBanner = await Banner.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        status: status,
        category: category,
      })
  
      if (newBanner) {
        console.log(newBanner);
        res.send({ message: "Banner Added Successfully", status: "success", banner: newBanner });
      } else {
        res.send({ message: "Unable to add the Banner", status: "error" });
      }
    } catch (error) {
      console.log(error);
      res.send({ message: "Something went wrong", status: "error" });
    }
  };
  

// Login
export const viewAllBanner = async (req,res)=>{
    try {
              
        const Banners = await Banner.find().populate('category');
       
        if(Banners){
            console.log(Banners);
            res.send({ message: "All Banners listed",banners:Banners,status: "success" });
    
        }else{
            
            res.send({ message: "Unable to get Banners",status: "error"});
        }
    
    
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
}

export const viewParticularBanner = async (req,res)=>{
    try {

        const ban_id = req.query.id;
        console.log(ban_id);
              if(!ban_id){
                return res.status(400).send({ message: "Unable to get Banner id", status: "error" });
              
              }
        const banner = await Banner.findOne({
            _id:ban_id
        }).populate('category')
       
        if(banner){
           
            res.send({ message: "All Banners listed",item:banner,status: "success" });
    
        }else{
            
            res.status(404).send({ message: "banner not found", status: "error" });
        }
    
    
    } catch (error) { 
        console.log(error);
        res.status(500).send({ message: "Something went wrong", status: "error" });
        
    }
}

export const deleteBanner = async (req,res)=>{
    try {

        const ban_id = req.query.id;
              if(!ban_id){
                res.send({message:"Unable to get banner id",status:error});
              }
        const banner = await Banner.findByIdAndDelete({
            _id:ban_id
        })
       
        if(banner){
           
            res.send({ message: "banner has been deleted",status: "success" });
    
        }else{
            
            res.send({ message: "Unable to delete banner",status: "error"});
        }
    
    
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
}

export const updateBanner = async (req,res)=>{
    try {
        const ban_id = req.query.id;
        console.log(ban_id);
              if(!ban_id){
                return res.status(400).send({ message: "Unable to get banner id", status: "error" });
              
              }
        const {title,description,imageUrl,status,category} = req.body;
        
    const mySchema = z.object({
        title: z.string(),
        description: z.string(),
        imageUrl: z.string(),
       
      }).strict();
    
    let bannerSchema =  mySchema.safeParse({
        title:title,
        description:description,
        imageUrl:imageUrl,
       
    })
    // let oldEmail = await Admin.findOne({
    //     email:email
    // })
    console.log();
    if(bannerSchema.success){  
        
        const updateBanner = await Banner.findByIdAndUpdate(ban_id,{
            title:title,
            description:description,
            imageUrl:imageUrl,
            status:status,
            category:category
        },{ new: true, runValidators: true }).populate('category')
       
        if(updateBanner){
            console.log(updateBanner);
            res.send({ message: "Banner Updated  Successfully",status: "success", banner: updateBanner });
    
        }else{
            
            res.send({ message: "Unable to update the banner",status: "error"});
        }
    
    }else{
        res.send({ message:bannerSchema.error ,status: "error"});
       
    }
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
    }


