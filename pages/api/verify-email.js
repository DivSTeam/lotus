import db from '../../utils/db';
import User from '../../models/User';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { token } = req.query;

  try {
    await db.connect();

    const user = await User.findOne({ verificationToken: token });

    if (!user || user.isVerified || user.verificationToken == null) {
      throw new Error('Invalid email verification token');
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    return res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Email verification failed' });
  }
};