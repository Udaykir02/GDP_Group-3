const { verifyTokenAndUser } = require('./verifyTokenAndUser');

const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);


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

        console.log(paymentIntent)
        res.status(200).json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: req.user.ephemeralKey.secret,
            customer: req.user.customer.id,
            publishableKey: process.env.STRIPE_PUBLISHER_KEY
        });
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }

};

module.exports = { paymentSheetController }