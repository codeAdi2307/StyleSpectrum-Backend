import Admin from "../model/admin.model.js"
import Jwt  from "jsonwebtoken";
import {z} from "zod";
import Dotenv  from "dotenv";
import { ROLE_ADMIN } from "../constants/constants.js";
import Coupon from "../model/coupon.model.js";



Dotenv.config();
// register
export const addCoupon = async (req, res) => {
    try {
        const { name, description, type, discount, status, validity, mincartvalue, category, user, brand, coupontype } = req.body;

        console.log(req.body);

        const sanitizedCategory = (Array.isArray(category) && category.length === 1 && category[0] === '') ? null : category;
        const sanitizedUser = (Array.isArray(user) && user.length === 1 && user[0] === '') ? null : user;

        const newCoupon = await Coupon.create({
            name: name,
            description: description,
            type: type,
            discount: discount,
            status: status,
            validity: validity,
            mincartvalue: mincartvalue,
            category: sanitizedCategory,
            user: sanitizedUser,
            brand: brand,
            coupontype: coupontype,
        });

        if (newCoupon) {
            res.send({ message: "Coupon Added Successfully", status: "success", coupon: newCoupon });
        } else {
            res.send({ message: "Unable to add the Coupon", status: "error" });
        }
    } catch (error) {
        console.log(error);
        res.send({ message: "Something went wrong", status: "error" });
    }
};

  

// Login
export const viewAllCoupon = async (req,res)=>{
    try {
              
        const Coupons = await Coupon.find().populate('category');
       
        if(Coupons){
            console.log(Coupons);
            res.send({ message: "All Coupons listed",coupons:Coupons,status: "success" });
    
        }else{
            
            res.send({ message: "Unable to get Coupons",status: "error"});
        }
    
    
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
}

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

export const deleteProduct = async (req,res)=>{
    try {

        const prod_id = req.query.id;
              if(!prod_id){
                res.send({message:"Unable to get product id",status:error});
              }
        const product = await Product.findByIdAndDelete({
            _id:prod_id
        })
       
        if(product){
           
            res.send({ message: "Product has been deleted",status: "success" });
    
        }else{
            
            res.send({ message: "Unable to delete product",status: "error"});
        }
    
    
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
}

export const updateProduct = async (req,res)=>{
    try {
        const prod_id = req.query.id;
        console.log(prod_id);
              if(!prod_id){
                return res.status(400).send({ message: "Unable to get product id", status: "error" });
              
              }
        const {name,description,price,originalPrice,brand,size,color,imageUrl,stock,category,discount,newArrivals,bestSales} = req.body;
        
    const mySchema = z.object({
        name: z.string(),
        description: z.string(),
        originalPrice: z.number(),
        price: z.number(),
        brand: z.string(),
        size: z.string(),
        color: z.string(),
        imageUrl: z.string(),
        stock: z.number(),
      }).strict();
    
    let productSchema =  mySchema.safeParse({
        name:name,
        description:description,
        originalPrice:originalPrice,
        price:price,
        brand:brand,
        size:size,
        color:color,
        imageUrl:imageUrl,
        stock:stock,
        
    })
    // let oldEmail = await Admin.findOne({
    //     email:email
    // })
    console.log();
    if(productSchema.success){  
        
        const updateProd = await Product.findByIdAndUpdate(prod_id,{
            name:name,
            description:description,
            originalPrice:originalPrice,
            price:price,
            brand:brand,
            size:size,
            color:color,
            imageUrl:imageUrl,
            stock:stock,
            category:category,
            discount: discount,
            newArrivals: newArrivals,
            bestSales: bestSales
        },{ new: true, runValidators: true }).populate('category')
       
        if(updateProd){
            console.log(updateProd);
            res.send({ message: "Product Updated  Successfully",status: "success", product: updateProd });
    
        }else{
            
            res.send({ message: "Unable to update the product",status: "error"});
        }
    
    }else{
        res.send({ message:productSchema.error ,status: "error"});
       
    }
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
    }


