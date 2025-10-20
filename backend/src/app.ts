import express from 'express';

import postRoutes from './routes/postRoute';
import userRoutes from './routes/userRoute';
import cors from 'cors';
import commentRoutes from './routes/commentRoute';
import cookieParser from 'cookie-parser';
import { protect } from './middleware/protectRoute';
const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN || 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from round 2!');
});

app.get('/api/auth/check', protect, (req, res) => {
  res.json({ loggedIn: true, user: req.user });
});

app.use('/api/post', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);

export { app };
