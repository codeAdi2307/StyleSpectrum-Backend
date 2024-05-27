import Admin from "../model/admin.model.js"
import Jwt  from "jsonwebtoken";
import {z} from "zod";
import Dotenv  from "dotenv";
import { ROLE_ADMIN } from "../constants/constants.js";
import { STATUS_ACTIVE } from "../constants/constants.js"; 
import Brand from "../model/brand.model.js";


Dotenv.config();
// register
export const addBrand = async (req,res)=>{
try {
    const {name,status} = req.body;
    
const mySchema = z.object({
    name: z.string(),
    status: z.string(),
  }).strict();

let BrandSchema =  mySchema.safeParse({
    name:name,
    status:status,
 
})
// let oldEmail = await Admin.findOne({
//     email:email
// })
console.log();
if(BrandSchema.success){
    
    const newBrand = await Brand.create({
        name:name,
        status:status
    })
   
    if(newBrand){
        console.log(newBrand);
        res.send({ message: "Brand Added  Successfully",status: "success" });

    }else{
        
        res.send({ message: "Unable to add the Brand",status: "error"});
    }

}else{
    res.send({ message:BrandSchema.error ,status: "error"});
   
}
} catch (error) { 
    console.log(error);
    res.send({ message: "something went wrong"});
    
}
}


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

export const viewParticularBrand = async (req,res)=>{
    try {

        const brand_id = req.query.id;
        console.log(brand_id);
              if(!brand_id){
                return res.status(400).send({ message: "Unable to get Brand id", status: "error" });
              
              }
        const Brand = await Brand.findOne({
            _id:brand_id
        })
       
        if(Brand){
           
            res.send({ message: "All Brands listed",item:Brand,status: "success" });
    
        }else{
            
            res.status(404).send({ message: "Brand not found", status: "error" });
        }
    
    
    } catch (error) { 
        console.log(error);
        res.status(500).send({ message: "Something went wrong", status: "error" });
        
    }
}

export const deleteBrand = async (req,res)=>{
    try {

        const brand_id = req.query.id;
              if(!brand_id){
                res.send({message:"Unable to get Brand id",status:error});
              }
        const Brand = await Brand.findByIdAndDelete({
            _id:brand_id
        })
       
        if(Brand){
           
            res.send({ message: "Brand has been deleted",status: "success" });
    
        }else{
            
            res.send({ message: "Unable to delete Brand",status: "error"});
        }
    
    
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
}

export const updateBrand = async (req,res)=>{
    try {
        const brand_id = req.query.id;
        console.log(brand_id);
              if(!brand_id){
                return res.status(400).send({ message: "Unable to get Brand id", status: "error" });
              
              }
        const {name,status} = req.body;
        
    const mySchema = z.object({
        name: z.string(),  
       
      }).strict();
    
    let BrandSchema =  mySchema.safeParse({
        name:name,
      
      
    })

    console.log();
    if(BrandSchema.success){  
        
        const updateCat = await Brand.findByIdAndUpdate(brand_id,{
            name:name,
            status:status
        },{ new: true, runValidators: true })
       
        if(updateCat){
            console.log(updateCat);
            res.send({ message: "Brand Updated  Successfully",status: "success" });
    
        }else{
            
            res.send({ message: "Unable to update the Brand",status: "error"});
        }
    
    }else{
        res.send({ message:BrandSchema.error ,status: "error"});
       
    }
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
    }


