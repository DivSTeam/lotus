import { getSession } from 'next-auth/react';
import Product from '../../../models/Product';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }
  const { user } = session;
  await db.connect();


  const existingFavorite = await Product.find({ _id: { $in: req.body } });
  const existingFavoriteId = existingFavorite.map((fav) => fav._id);

  user.favorites.push(...existingFavoriteId);
  await user.save();
  await db.disconnect();
  res.send(existingFavorite);
};

export default handler;