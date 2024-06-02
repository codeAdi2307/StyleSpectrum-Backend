import Dotenv from "dotenv";
import { Cashfree } from "cashfree-pg";

Dotenv.config();

console.log("Client ID:", process.env.CASHFREE_X_CLIENT_ID);
console.log("Client Secret:", process.env.CASHFREE_X_CLIENT_SECRET);
console.log("Environment:", process.env.CASHFREE_X_ENVIRONMENT);

Cashfree.XClientId = process.env.CASHFREE_X_CLIENT_ID;
Cashfree.XClientSecret = process.env.CASHFREE_X_CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment[process.env.CASHFREE_X_ENVIRONMENT];

export const cashfree = async (req, res, next) => {
    try {
        const { order_amount, order_currency, customer_details } = req.body;
        const request = {
            order_amount: order_amount.toString(), // Ensure amount is a string
            order_currency,
            customer_details,
            order_meta: {
                return_url: `https://test.cashfree.com/pgappsdemos/return.php?order_id=${req.body.order_id}`
            },
            order_note: req.body.order_note || ""
        };

        const response = await Cashfree.PGCreateOrder(new Date().toISOString().split('T')[0], request);
      
        res.status(200).json({ order: response.data });
       
    } catch (error) {
        const errorMessage = error.response ? error.response.data : 'Internal Server Error';
        res.status(500).json({ error: errorMessage });
    }
};
