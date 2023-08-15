import express from 'express';
import cors from 'cors';
import voucherRoute from './routes/voucher.route.js';
import historiRoute from './routes/histori.route.js';
import stnkRoute from './routes/stnk.route.js';

const app = express();

const whiteList = ['http://localhost:3000'];

const corsOptions = {

  origin: (origin, callback) => {

    (whiteList.indexOf(origin) !== -1 || !origin)
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'));
  }
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api', voucherRoute);
app.use('/api', historiRoute);
app.use('/api', stnkRoute);

app.use((req, res) => res.status(404).json({ message: 'ENDPOINT NOT FOUND.' }));

export default app;
