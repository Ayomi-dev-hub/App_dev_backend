require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());
app.use(cors())

app.post('/api/payout', async (req, res) => {
  const { amount } = req.body;

  try {
    const payout = await stripe.payouts.create({
      amount: Math.round(Number(amount) * 100), 
      currency: 'usd',
    });
    console.log('Payout created:', payout);
    res.json({ success: true, payout });
  } catch (error) {
    console.error('Error creating payout:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(5000, () => console.log('Server running on https://app-dev-backend-9w2h.onrender.com'));
