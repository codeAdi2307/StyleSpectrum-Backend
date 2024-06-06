import dotenv from "dotenv";
import Razorpay from "razorpay";

dotenv.config();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const createOrder = async (req, res) => {
    try {
        const { amount, currency, receipt, customer_details,success_url } = req.body;
        const options = {
            amount: amount * 100, // amount in the smallest currency unit
            currency: currency,
            receipt: receipt,
            payment_capture: 1 ,// auto capture
            success_url:success_url
        };
        
        const order = await razorpayInstance.orders.create(options);
        console.log("response");
        console.log(order);
        console.log(order.data)
        res.status(200).json({ order });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: error.message });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Request params:", req.params);
        
        const order = await razorpayInstance.orders.fetch(id);
        console.log("Fetched order response:", order);
        
        res.status(200).json({ order });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: error.message });
    }
};


