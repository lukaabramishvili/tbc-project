const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { payment_method } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: 2000,
        currency: 'usd',
        payment_method: payment_method,
        confirmation_method: 'manual',
        confirm: true,
      });

      res.status(200).json({ client_secret: paymentIntent.client_secret });
    } catch (err) {
      console.error('Error creating payment intent:', err.message);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
