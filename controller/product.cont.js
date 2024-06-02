import Admin from "../model/admin.model.js"
import Jwt  from "jsonwebtoken";
import {z} from "zod";
import Dotenv  from "dotenv";
import { ROLE_ADMIN } from "../constants/constants.js";
import Product from "../model/product.model.js"



Dotenv.config();
// register
export const addProduct = async (req, res) => {
    try {
      const { name, description,originalPrice,price, brand, size, color, imageUrl, stock, category,discount,newArrivals,bestSales,status,gender } = req.body;
  
      // Validate the request body
      const mySchema = z.object({
        name: z.string(),
        status: z.string(),
        gender: z.string(),
        description: z.string(),
        price: z.number(),
        originalPrice: z.number(),
      
        size: z.array(z.string()),
        color: z.array(z.string()),
        imageUrl: z.string(),
        stock: z.number(),
      }).strict();
  
      let productSchema = mySchema.safeParse({
        name: name,
        gender: gender,
        status: status,
        description: description,
        originalPrice: originalPrice,
        price: price,
       
        size: size,
        color: color,
        imageUrl: imageUrl,
        stock: stock,
       

      });
  
      if (!productSchema.success) {
        return res.send({ message: productSchema.error, status: "error" });
      }
  
      // Create the product
      const newProduct = await Product.create({
        name: name,
        description: description,
        originalPrice: originalPrice,
        price: price,
        brand: brand,
        size: size,
        color: color,
        imageUrl: imageUrl,
        stock: stock,
        category: category, 
        discount: discount,
        newArrivals: newArrivals,
        bestSales: bestSales,
        status: status,
        gender: gender,
      })
  
      if (newProduct) {
        console.log(newProduct);
        res.send({ message: "Product Added Successfully", status: "success", product: newProduct });
      } else {
        res.send({ message: "Unable to add the product", status: "error" });
      }
    } catch (error) {
      console.log(error);
      res.send({ message: "Something went wrong", status: "error" });
    }
  };
  

// Login
export const viewAllProduct = async (req,res)=>{
    try {
              
        const Products = await Product.find();

        
        const populatePromises = Products.map(async (prod) => {
            if (prod.category) {
                await prod.populate('category');
            }
            if (prod.brand) {
                await prod.populate('brand');
            }
            return prod;
        });

        const populatedProd = await Promise.all(populatePromises);

       
        if(populatedProd){
            console.log(populatedProd);
            res.send({ message: "All products listed",Products:populatedProd,status: "success" });
    
        }else{
            
            res.send({ message: "Unable to get products",status: "error"});
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
        }).populate('category').populate('brand')
       
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
        const {name,description,price,originalPrice,brand,size,color,imageUrl,stock,category,discount,newArrivals,bestSales,gender,status} = req.body;
        
    const mySchema = z.object({
        name: z.string(),
        status: z.string(),
        gender: z.string(),
        description: z.string(),
        originalPrice: z.number(),
        price: z.number(),
     
        size: z.string(),
        color: z.string(),
        imageUrl: z.string(),
        stock: z.number(),
      }).strict();
    
    let productSchema =  mySchema.safeParse({
        name:name,
        gender:gender,
        status:status,
        description:description,
        originalPrice:originalPrice,
        price:price,
       
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
            status:status,
            gender:gender,
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
        },{ new: true, runValidators: true }).populate('category').populate('brand')
       
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


