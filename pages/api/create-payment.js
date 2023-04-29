import axios from 'axios';

const YOOKASSA_API_URL = 'https://api.yookassa.ru/v3/payments';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { amount, currency, returnUrl } = req.body;

    try {
      const response = await axios.post(
        YOOKASSA_API_URL,
        {
          amount: { value: amount, currency: currency },
          payment_method_data: { type: 'bank_card' },
          capture: true,
          confirmation: { type: 'redirect', return_url: returnUrl },
        },
        {
          auth: {
            username: process.env.YOOKASSA_SHOP_ID,
            password: process.env.YOOKASSA_SECRET_KEY,
          },
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const paymentId = response.data.id;
      const confirmationUrl = response.data.confirmation.confirmation_url;
      res.status(200).json({ paymentId, confirmationUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;