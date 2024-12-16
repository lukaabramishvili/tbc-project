import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // Get the card details
      const cardElement = elements.getElement(CardElement);

      // Create a PaymentMethod
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        console.error('Error creating payment method:', error.message);
        alert(error.message);
        setLoading(false);
        return;
      }

      // Send PaymentMethod to Backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_method: paymentMethod.id }),
      });

      const data = await response.json();

      if (data.error) {
        console.error('Server Error:', data.error);
        alert(data.error);
        setLoading(false);
        return;
      }

      // Confirm Card Payment on Frontend
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(data.client_secret);

      if (confirmError) {
        console.error('Error confirming payment:', confirmError.message);
        alert(confirmError.message);
      } else if (paymentIntent.status === 'succeeded') {
        alert('Payment succeeded!');
      } else {
        alert('Payment failed!');
      }
    } catch (err) {
      console.error('Payment Error:', err.message);
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>
      <div className="mb-4 border rounded p-2">
        <CardElement options={{ hidePostalCode: true }} className="p-2" />
      </div>
      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer border-none"
      >
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
