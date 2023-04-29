import Product from '../../../models/Product';
import db from '../../../utils/db';

export default async function handler(req, res) {
  await db.connect();
  try {
    const products = await this.find({ isFeatured: true }).sort({ rating: -1 }).limit(10);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}