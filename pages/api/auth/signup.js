import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';
import  sendVerificationEmail  from '../../../utils/verificationEmail';
import { nanoid } from 'nanoid';


async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { name, email, password } = req.body;
  if (
    !name ||
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }

  await db.connect();

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    await db.disconnect();
    return;
  }
  const verificationToken = nanoid();

  const newUser = new User({
    name,
    email,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
    verificationToken : verificationToken
  });

  const user = await newUser.save();
  await sendVerificationEmail(user);
  await db.disconnect();
  res.status(201).send({
    message: 'Created user!',
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
}

export default handler;
