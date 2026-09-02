export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, description, redirectUrl } = req.body;

  try {
    const response = await fetch('https://api.mollie.com/v2/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MOLLIE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: {
          currency: 'EUR',
          value: parseFloat(amount).toFixed(2),
        },
        description,
        redirectUrl,
      }),
    });

    const payment = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: payment.detail || 'Mollie error' });
    }

    return res.status(200).json({
      checkoutUrl: payment._links.checkout.href,
      paymentId: payment.id,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
