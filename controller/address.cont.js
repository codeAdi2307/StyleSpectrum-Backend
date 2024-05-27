import Admin from "../model/admin.model.js"
import Jwt  from "jsonwebtoken";
import {z} from "zod";
import Dotenv  from "dotenv";
import { ROLE_ADMIN } from "../constants/constants.js";
import Product from "../model/product.model.js"
import Address from "../model/address.model.js";



Dotenv.config();

// add address
export const addAddress = async (req, res) => {
    try {
      const { street, city,state,postalCode, country, phonenumber, user,status } = req.body;
  
      // Validate the request body
      const mySchema = z.object({
        street: z.string(),
        city: z.string(),
        state: z.number(),
        postalCode: z.number(),
        phonenumber: z.number(),
        country: z.string(),
        status: z.string(),
      }).strict();
  
      let addressSchema = mySchema.safeParse({
        street: street,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country,
        phonenumber: phonenumber,
        status: status,       
      });
  
      if (!addressSchema.success) {
        return res.send({ message: addressSchema.error, status: "error" });
      }
  
      // Create the product
      const newAddress = await Address.create({
        street: street,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country,
        phonenumber: phonenumber,
        status: status, 
        user:user 
      })
  
      if (newAddress) {
        console.log(newAddress);
        res.send({ message: "Address Added Successfully", status: "success", address: newAddress });
      } else {
        res.send({ message: "Unable to add the address", status: "error" });
      }
    } catch (error) {
      console.log(error);
      res.send({ message: "Something went wrong", status: "error" });
    }
  };
  

// all address
export const viewAllAddress= async (req,res)=>{
    try {
              
        const addresses = await Address.find().populate('user');
       
        if(addresses){
            console.log(addresses);
            res.send({ message: "All products listed",address:addresses,status: "success" });
    
        }else{
            
            res.send({ message: "Unable to get addresses",status: "error"});
        }
    
    
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
}


// view particular address
export const viewParticularAddress = async (req,res)=>{
    try {

        const adrs_id = req.query.id;
        console.log(adrs_id);
              if(!adrs_id){
                return res.status(400).send({ message: "Unable to get address id", status: "error" });
              
              }
        const addresses = await Address.findOne({
            _id:adrs_id
        }).populate('user')
       
        if(addresses){
           
            res.send({ message: "All address listed",adres:addresses,status: "success" });
    
        }else{
            
            res.status(404).send({ message: "Address not found", status: "error" });
        }
    
    
    } catch (error) { 
        console.log(error);
        res.status(500).send({ message: "Something went wrong", status: "error" });
        
    }
}

// delete address
export const deleteAddress = async (req,res)=>{
    try {

        const adrs_id = req.query.id;
              if(!adrs_id){
                res.send({message:"Unable to get address id",status:error});
              }
        const addresses = await Address.findByIdAndDelete({
            _id:adrs_id
        })
       
        if(addresses){
           
            res.send({ message: "Address has been deleted",status: "success" });
    
        }else{
            
            res.send({ message: "Unable to delete address",status: "error"});
        }
    
    
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
}


// update address
export const updateAddress = async (req,res)=>{
    try {
        const adrs_id = req.query.id;
        console.log(adrs_id);
              if(!adrs_id){
                return res.status(400).send({ message: "Unable to get address id", status: "error" });
              
              }
        const {street, city,state,postalCode, country, phonenumber,status} = req.body;
        
    const mySchema = z.object({
        street: z.string(),
        city: z.string(),
        state: z.number(),
        postalCode: z.number(),
        phonenumber: z.number(),
        country: z.string(),
        status: z.string(),
      }).strict();
    
    let addressSchema =  mySchema.safeParse({
        street: street,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country,
        phonenumber: phonenumber,
        status: status,  
        
    })
    // let oldEmail = await Admin.findOne({
    //     email:email
    // })
    console.log();
    if(addressSchema.success){  
        
        const updateAdres = await Address.findByIdAndUpdate(adrs_id,{
        street: street,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country,
        phonenumber: phonenumber,
        status: status, 
      
        },{ new: true, runValidators: true }).populate('user')
       
        if(updateAdres){
            console.log(updateAdres);
            res.send({ message: "Address Updated  Successfully",status: "success", address: updateAdres });
    
        }else{
            
            res.send({ message: "Unable to update the Address",status: "error"});
        }
    
    }else{
        res.send({ message:addressSchema.error ,status: "error"});
       
    }
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
    }


