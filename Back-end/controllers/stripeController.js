const { verifyTokenAndUser } = require('./verifyTokenAndUser');
const { resetCart } = require('./userController');
var User = require('../models/account');

const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);
const Order = require('../models/order');
const uuid = require('uuid');
const paymentSheetController = async (req, res) => {
    try {
        const { amount } = req.body;


        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            customer: req.user.customer.id,
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter
            // is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });

        // Generate an ephemeral key for the customer
        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: req.user.customer.id },
            { apiVersion: '2024-04-10' }
        );

        console.log(paymentIntent)
        res.status(200).json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: req.user.customer.id,
            publishableKey: process.env.STRIPE_PUBLISHER_KEY,
            paymentIntentId: paymentIntent.id
        });
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }

};

const placeOrder = async (req, res) => {
    try {
        const { userId, paymentIntentId, vendorId, items } = req.body;

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status === 'succeeded') {
            const orderId = uuid.v4();
            const address = {
                country: "USA",
                street1: "123 Main St",
                street2: "",
                city: "New York",
                state: "NY",
                zip: "10001"
            }
            const shipping = {
                address: address,
                origin: address,
                carrier: 'truck',
                tracking: orderId
            };
            const orderBody = {
                orderId: orderId,
                userId: userId,
                paymentId: paymentIntent.id,
                vendorId: vendorId,
                paymentStatus: paymentIntent.status,
                paymentMethod: paymentIntent.payment_method_types[0],
                status: "placed",
                currency: paymentIntent.currency,
                totalCost: paymentIntent.Orderamount,
                items: items,
                shipping: shipping
            }

            console.log(orderBody)
            const order = new Order(orderBody);
            const user = await User.findOne({ userId });
            user.cart = []
            await user.save();

            await order.save();

  
            res.status(200).json({
                success: true, order: order
            });
        }
        else {
            return res.status(404).json({ message: 'Payment error, please try again' });
        }
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }

};


module.exports = { paymentSheetController, placeOrder }