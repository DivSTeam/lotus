import Product from '../../../models/Product';
import db from '../../../utils/db';

export default async function handler(req, res) {
  await db.connect();
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(10);
    await db.disconnect();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    await db.disconnect();
    res.status(500).json({ success: false, message: error.message });
  }
}