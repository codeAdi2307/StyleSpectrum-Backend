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

      // Manually populate the coupon if it exists
      if (orders && orders.coupon) {
          await orders.populate('coupon').execPopulate();
      }

      if (orders) {
          // If coupon is unavailable, set a default message
          if (!orders.coupon) {
              orders.coupon = { message: "Coupon unavailable" }; // Set to an object with a message or any other default value
          }
          res.send({ message: "Order details retrieved successfully", item: orders, status: "success" });
      } else {
          res.status(404).send({ message: "Order not found", status: "error" });
      }

  } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong", status: "error" });
  }
}

