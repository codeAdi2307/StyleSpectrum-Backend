import OrderDetail from "../model/order.details.model";


export const addOrderDetail = async (req, res) => {
    try {
      const { user, coupon,amount,amount_with_tax, orders, address, payment_status, status} = req.body;
  
      const newOrderDetail = await OrderDetail.create({
        user: user,
        coupon: coupon,
        amount: amount,
        amount_with_tax: amount_with_tax,
        orders: orders,
        address: address,
        payment_status: payment_status,
        status: status,
      })
  
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

  export const viewAllOrders = async (req,res)=>{
    try {
              
        const Orders = await OrderDetail.find();

        
        const populatePromises = Orders.map(async (prod) => {
            if (prod.coupon) {
                await prod.populate('coupon');
            }
           
            return prod;
        });

        const populatedOrders = await Promise.all(populatePromises);

       
        if(populatedOrders){
            console.log(populatedOrders);
            res.send({ message: "All orders listed",orders:populatedOrders,status: "success" });
    
        }else{
            
            res.send({ message: "Unable to get orders",status: "error"});
        }
    
    
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
        
    }
}

export const viewParticularOrder = async (req,res)=>{
    try {

        const order_id = req.query.id;
        console.log(order_id);
              if(!order_id){
                return res.status(400).send({ message: "Unable to get order id", status: "error" });
              
              }


    
        const orders = await OrderDetail.findOne({
            _id:order_id
        }).populate('category').populate('brand').populate('coupon')
       
        if(orders){
           
            res.send({ message: "All orderss listed",item:orders,status: "success" });
    
        }else{
            
            res.status(404).send({ message: "orders not found", status: "error" });
        }
    
    
    } catch (error) { 
        console.log(error);
        res.status(500).send({ message: "Something went wrong", status: "error" });
        
    }
}
  