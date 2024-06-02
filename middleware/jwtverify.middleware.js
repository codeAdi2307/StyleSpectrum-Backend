import Dotenv  from "dotenv";
import jwt from "jsonwebtoken";
Dotenv.config();

export const adminJwtVerify = async (req,res,next)=>{
 
    try {
      const authHeader = req.headers['authorization'];
      console.log("hkjahsjdhla");
      console.log(authHeader);
      if (!authHeader) {
        throw new Error("Token missing");
      }
        let auth =await authHeader.split(" ")[1];
      
        // console.log(auth);
        if(auth){
          let check =  jwt.verify(auth,process.env.SECRET);
          console.log(check);
          if(check){
            req.user = check;
            next();
          }else{
            console.log("unable to verify token");
          }
        }else{
          throw console.error("token missing");
        }
      } catch (error) {
        console.log(error);
      }


}