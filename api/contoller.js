import Admin from "../model/admin.model.js"
import User from "../model/user.model.js";
import Jwt  from "jsonwebtoken";
import {z} from "zod";
import Dotenv  from "dotenv";
import Product from "../model/product.model.js"
import Category from "../model/category.model.js";
import Banner from "../model/banner.model.js";
import Brand from "../model/brand.model.js";
import Cart from "../model/cart.model.js";
import Coupon from "../model/coupon.model.js";
import Address from "../model/address.model.js";
import OrderDetail from "../model/order.details.model.js";
import Wishlist from "../model/wishlist.model.js";
import { STATUS_ACTIVE,ROLE_USER,ROLE_ADMIN,PENDING,STATUS_INACTIVE } from "../constants/constants.js";


Dotenv.config();


// For Viewing All Products
export const viewAllProduct = async (req,res)=>{
    try {
              
        const Products = await Product.find()
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

// search product
export const searchProducts = async (req, res) => {
  try {
    let categoryId = req.query.id;
    let searchTerm = req.query.text;

    console.log(categoryId);
    console.log(searchTerm);

    let products = [];

    if (categoryId && searchTerm) {
      let products_list = await Product.find({ category: categoryId }).populate("category");

      let text = searchTerm.toLowerCase().split(' ').join('');

      let filtered_data = products_list.filter((item) => {
        let productName = item.name.toLowerCase().split(' ').join('');
        console.log(productName);

        return productName.includes(text);
      });

      products = filtered_data;  

    } else if (categoryId && !searchTerm) {
      let products_list = await Product.find({ category: categoryId }).populate("category");
      products = products_list;  

    } else if (!categoryId && searchTerm) {
      let text = searchTerm.toLowerCase().split(' ').join('');

      let all_prod = await Product.find();

      let filtered_data = all_prod.filter((item) => {
        let productName = item.name.toLowerCase().split(' ').join('');
        console.log(productName);

        return productName.includes(text);
      });

      products = filtered_data;  
    }
    

    if (products.length) {
      res.send({ message: "All Products listed", prod: products, status: "success" });
    } else {
      res.send({ message: "Unable to get Products", status: "error" });
    }

  } catch (error) {
    console.log(error);
    res.send({ message: "something went wrong" });
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
            res.send({ message: "Not Registered or Wrong Password",status: "error"});   
    }
    }else{
        res.send({ message: "Enter in data in right format",status: "error"});
       
    }
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
    }
// user cart details

export const cartDetails = async (req, res) => {
    try {
      const { item, token } = req.body;
      let user_data;
  
      if (token) {
        try {
          user_data = Jwt.verify(token, process.env.SECRET);
        } catch (err) {
          return res.status(401).send({ message: "Invalid token", status: "error" });
        }
  
        if (!user_data) {
          return res.status(401).send({ message: "Unable to get user details", status: "error" });
        }
      } else {
        return res.status(400).send({ message: "Token not provided", status: "error" });
      }
  
      let old_prod_cart = await Cart.findOne({ product: item._id, user: user_data._id });
      let cartDetails;
  
      if (old_prod_cart) {
        old_prod_cart.quantity = item.qty;
        cartDetails = await old_prod_cart.save();
        cartDetails = await Cart.findById(cartDetails._id).populate('product').populate('user');
      } else {
        cartDetails = await Cart.create({
          product: item._id,
          user: user_data._id,
          quantity: item.qty,
          price: item.price,
          originalPrice: item.originalPrice
        });
  
        cartDetails = await Cart.findById(cartDetails._id).populate('product').populate('user');
      }
  
      if (cartDetails) {
        return res.status(200).send({ message: "All cart details added", cart: cartDetails, status: "success" });
      } else {
        return res.status(500).send({ message: "Unable to add cart details", status: "error" });
      }
  
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Something went wrong", status: "error" });
    }
  };

//   list of coupons
export const viewAllCoupon = async (req, res) => {
    try {
        const CouponsData = await Coupon.find();

        let Coupons = [];

        const populatedCoupons = CouponsData.map(async (element) => {
            if (element.category == null && element.user == null  && element.brand == null) {
                return element;
            } else if (element.category != null && element.user == null && element.brand == null) {
                return await element.populate('category');
            } else if (element.category == null && element.user != null&& element.brand == null) {
                return await element.populate('user');
            } 
            else if (element.category == null && element.user == null&& element.brand != null) {
                return await element.populate('brand');
            } 
        });

        Coupons = await Promise.all(populatedCoupons);

        if (Coupons.length > 0) {
            console.log(Coupons);
            res.send({ message: "All Coupons listed", coupons: Coupons, status: "success" });
        } else {
            res.send({ message: "Unable to get Coupons", status: "error" });
        }
    } catch (error) {
        console.log(error);
        res.send({ message: "something went wrong" });
    }


}


// add address
export const addAddress = async (req, res, next) => {
    try {
      console.log("adasd");
      const { type, name, street, city, state, postalCode, country, phonenumber } = req.body;
      const user_data = req.user;
  
      const mySchema = z.object({
        type: z.string(),
        name: z.string(),
        street: z.string(),
        city: z.string(),
        state: z.string(), 
        postalCode: z.string(), 
        phonenumber: z.string(), 
        country: z.string(),
      }).strict();
  
      const validationResult = mySchema.safeParse({
        type: type,
        name: name,
        street: street,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country,
        phonenumber: phonenumber,
        
      });

      console.log("hdahdasd");
      console.log(validationResult);
  
      if (!validationResult.success) {
        const errors = validationResult.error.errors.map(err => err.message);
        return res.status(400).json({ message: "Validation failed", errors: errors });
      }
  
      const newAddress = await Address.create({
        type: type,
        name: name,
        street: street,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country,
        phonenumber: phonenumber,
        user: user_data,
        status: STATUS_ACTIVE
      });
  
      console.log("ashdahd");
      console.log(newAddress);
  
      if (newAddress) {
        console.log("ajsdadddddddd");
        console.log(newAddress);
        res.status(201).json({ message: "Address Added Successfully", status: "success", address: newAddress });
      } else {
        res.status(500).json({ message: "Unable to add the address", status: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Something went wrong", status: "error" });
    }
  };


//  update address
export const updateAddress = async (req, res, next) => {
    try {

        const { id } = req.params;
        if(!id){
                res.send({message:"Unable to get address id",status:error});
              }
      console.log("adasd");
      const { type, name, street, city, state, postalCode, country, phonenumber } = req.body;
      const user_data = req.user;
  
    //   const mySchema = z.object({
    //     type: z.string(),
    //     name: z.string(),
    //     street: z.string(),
    //     city: z.string(),
    //     state: z.string(), 
    //     postalCode: z.string(), 
    //     phonenumber: z.string(), 
    //     country: z.string(),
    //   }).strict();
  
    //   const validationResult = mySchema.safeParse({
    //     type: type,
    //     name: name,
    //     street: street,
    //     city: city,
    //     state: state,
    //     postalCode: postalCode,
    //     country: country,
    //     phonenumber: phonenumber,
        
    //   });

    //   console.log("hdahdasd");
    //   console.log(validationResult);
  
    //   if (!validationResult.success) {
    //     const errors = validationResult.error.errors.map(err => err.message);
    //     return res.status(400).json({ message: "Validation failed", errors: errors });
    //   }
  
      const newAddress = await Address.findByIdAndUpdate({_id:id},{
        type: type,
        name: name,
        street: street,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country,
        phonenumber: phonenumber,
        user: user_data,
        status: STATUS_ACTIVE
      });
  
      console.log("ashdahd");
      console.log(newAddress);
  
      if (newAddress) {
        console.log("ajsdadddddddd");
        console.log(newAddress);
        res.status(201).json({ message: "Address Updated Successfully", status: "success", address: newAddress });
      } else {
        res.status(500).json({ message: "Unable to update the address", status: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Something went wrong", status: "error" });
    }
  };

//view all address
export const viewAllAddress= async (req,res)=>{
    try {
        const user_data = req.user;

        console.log("aduhasjdhja");
        console.log(user_data._id);

        const addresses = await Address.find().where({user : user_data._id,status:STATUS_ACTIVE}).populate('user');
        

        if(addresses){
            console.log(addresses);
            res.send({ message: "All address listed",address:addresses,status: "success" });
    
        }else{
            
            res.send({ message: "Unable to get addresses",status: "error"});
        }
    
    
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
}

export const viewParticularAddress = async (req, res) => {
    try {
        const { aaddress } = req.body;
    
        if (!aaddress) {
            return res.status(400).send({ message: "Unable to get address id", status: "error" });
        }

        const addresses = await Address.find().where({_id:aaddress});

       
        if (addresses) {
            res.send({ message: "All address listed", adres: addresses, status: "success" });
        } else {
            res.status(404).send({ message: "Address not found", status: "error" });
        }
    
    } catch (error) { 
        console.log(error);
        res.status(500).send({ message: "Something went wrong", status: "error" });
    }
};
 export const deleteAddress = async (req,res)=>{
    try {

        const { id } = req.params;
        if(!id){
                res.send({message:"Unable to get address id",status:error});
              }
        const addresses = await Address.findByIdAndUpdate({
            _id:id
        },{status:STATUS_INACTIVE})
       
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
// place order
export const addOrderDetail = async (req, res) => {
    try {
      const { coupon, amount, amount_with_tax, address, product, payment_status, status } = req.body;
      const user_data = req.user;

      console.log("products", product);

      const orderDetailData = {
        user: user_data, 
        amount: amount,
        amount_with_tax: amount_with_tax,
        product: product,
        address: address, 
        payment_status: payment_status,
        status: status,
      };

      if (coupon) {
        orderDetailData.coupon = coupon;
      }

      const newOrderDetail = await OrderDetail.create(orderDetailData);

      if (newOrderDetail) {
        console.log(newOrderDetail);
        res.send({ message: "Details Added Successfully", status: "success", order_detail: newOrderDetail });
      } else {
        res.send({ message: "Unable to add the Details", status: "error" });
      }
    } catch (error) {
      console.log(error);
      res.send({ message: "Something went wrong", status: "error" });
    }
  };

  export const viewParticularOrder = async (req, res) => {
    try {
        const order_id = req.params.id;
        console.log(order_id);

        if (!order_id) {
            return res.status(400).send({ message: "Unable to get order id", status: "error" });
        }

        const orders = await OrderDetail.findOne({ _id: order_id })
            .populate('user')
            .populate('address')
            .populate('product');

        if (orders && orders.coupon) {
            await orders.populate('coupon');
        }

        if (orders) {
            if (!orders.coupon) {
                orders.coupon ="Coupon unavailable" ; 
            }
            res.send({ message: "Order details retrieved successfully", order_data: orders, status: "success" });
        } else {
            res.status(404).send({ message: "Order not found", status: "error" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong", status: "error" });
    }
}

export const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const user_data = req.user;
  
    console.log("Details");
    console.log(id);
    console.log(status);
  
    try {
      const updatedOrder = await OrderDetail.findByIdAndUpdate(
        id,
        { payment_status: status || 'paid' },  
        { new: true }  
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' })
      }
  
      await Cart.deleteMany({ user: user_data._id });
  
      console.log(updatedOrder);
  
      res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder, status: "Success" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


export const viewAllOrders = async (req, res) => {
  try {
    const user_data = req.user;
    const { status, time, payment_status } = req.query;

    let filters = { user: user_data._id };

    if (status) {
      filters.status = status;
    }

    if (payment_status) {
      filters.payment_status = payment_status;
    }

    if (time) {
      let date = new Date();
      if (time === 'Last 30 days') {
        date.setDate(date.getDate() - 30);
      } else if (!isNaN(time)) {
        date = new Date(time, 0, 1);
      } else if (time === 'Older') {
        date = new Date('2000-01-01');
      }
      filters.createdAt = { $gte: date };
    }

    const Orders = await OrderDetail.find(filters)
                                   .populate("product")
                                   .sort({ createdAt: -1 }); // Sort by createdAt in descending order

    if (Orders) {
      console.log(Orders);
      res.send({ message: "All orders listed", orders_list: Orders, status: "success" });
    } else {
      res.send({ message: "Unable to get orders", status: "error" });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "something went wrong" });
  }
}



export const addWishlist = async (req, res) => {
    try {
      const { product } = req.body;
      const user_data = req.user; 
  
      let existingWishlistItem = await Wishlist.findOne({ user: user_data, product });
  
      if (existingWishlistItem) {
        await Wishlist.findByIdAndDelete(existingWishlistItem._id);
        res.send({ message: "Product removed from Wishlist", status: "success" });
      } else {
        const wishlistData = {
          user: user_data,
          product: product,
        };
  
        const newWishDetail = await Wishlist.create(wishlistData);
  
        if (newWishDetail) {
          res.send({ message: "Product Added To Wishlist", status: "success", wishlist: newWishDetail });
        } else {
          res.send({ message: "Unable to add to Wishlist", status: "error" });
        }
      }
    } catch (error) {
      console.log(error);
      res.send({ message: "Something went wrong", status: "error" });
    }
  };

export const viewAllWishList= async (req,res)=>{
    try {
        const user_data = req.user;

        console.log("aduhasjdhja");
        console.log(user_data._id);

        const wishlist = await Wishlist.find().where({user : user_data._id}).populate('product')
        

        if(wishlist){
            console.log(wishlist);
            res.send({ message: "All wishlist listed",wishlists:wishlist,status: "success" });
    
        }else{
            
            res.send({ message: "Unable to get wishlist",status: "error"});
        }
    
    
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
}





  

