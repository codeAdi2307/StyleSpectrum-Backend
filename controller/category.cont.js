import Admin from "../model/admin.model.js"
import Jwt  from "jsonwebtoken";
import {z} from "zod";
import Dotenv  from "dotenv";
import { ROLE_ADMIN } from "../constants/constants.js";
import Category from "../model/category.model.js"
import { STATUS_ACTIVE } from "../constants/constants.js"; 



Dotenv.config();
// register
export const addCategory = async (req,res)=>{
try {
    const {name,status} = req.body;
    
const mySchema = z.object({
    name: z.string(),
    status: z.string(),
  }).strict();

let categorySchema =  mySchema.safeParse({
    name:name,
    status:status,
 
})
// let oldEmail = await Admin.findOne({
//     email:email
// })
console.log();
if(categorySchema.success){
    
    const newCategory = await Category.create({
        name:name,
        status:status
    })
   
    if(newCategory){
        console.log(newCategory);
        res.send({ message: "Category Added  Successfully",status: "success" });

    }else{
        
        res.send({ message: "Unable to add the Category",status: "error"});
    }

}else{
    res.send({ message:categorySchema.error ,status: "error"});
   
}
} catch (error) { 
    console.log(error);
    res.send({ message: "something went wrong"});
    
}
}

// Login
export const viewAllCategory = async (req,res)=>{
    try {
              
        const Categorys = await Category.find()
        const CategorysCond = await Category.find().where({status:STATUS_ACTIVE})
       
        if(Categorys){
            console.log(Categorys);
            res.send({ message: "All Categorys listed",Categorys:Categorys,CategorysCond:CategorysCond,status: "success" });
    
        }else{
            
            res.send({ message: "Unable to get Categorys",status: "error"});
        }
    
    
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
}

export const viewParticularCategory = async (req,res)=>{
    try {

        const cat_id = req.query.id;
        console.log(cat_id);
              if(!cat_id){
                return res.status(400).send({ message: "Unable to get Category id", status: "error" });
              
              }
        const category = await Category.findOne({
            _id:cat_id
        })
       
        if(category){
           
            res.send({ message: "All Categorys listed",item:category,status: "success" });
    
        }else{
            
            res.status(404).send({ message: "Category not found", status: "error" });
        }
    
    
    } catch (error) { 
        console.log(error);
        res.status(500).send({ message: "Something went wrong", status: "error" });
        
    }
}

export const deleteCategory = async (req,res)=>{
    try {

        const cat_id = req.query.id;
              if(!cat_id){
                res.send({message:"Unable to get Category id",status:error});
              }
        const category = await Category.findByIdAndDelete({
            _id:cat_id
        })
       
        if(category){
           
            res.send({ message: "Category has been deleted",status: "success" });
    
        }else{
            
            res.send({ message: "Unable to delete Category",status: "error"});
        }
    
    
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
}

export const updateCategory = async (req,res)=>{
    try {
        const cat_id = req.query.id;
        console.log(cat_id);
              if(!cat_id){
                return res.status(400).send({ message: "Unable to get Category id", status: "error" });
              
              }
        const {name,status} = req.body;
        
    const mySchema = z.object({
        name: z.string(),  
       
      }).strict();
    
    let CategorySchema =  mySchema.safeParse({
        name:name,
      
      
    })

    console.log();
    if(CategorySchema.success){  
        
        const updateCat = await Category.findByIdAndUpdate(cat_id,{
            name:name,
            status:status
        },{ new: true, runValidators: true })
       
        if(updateCat){
            console.log(updateCat);
            res.send({ message: "Category Updated  Successfully",status: "success" });
    
        }else{
            
            res.send({ message: "Unable to update the Category",status: "error"});
        }
    
    }else{
        res.send({ message:CategorySchema.error ,status: "error"});
       
    }
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
    }


