import express from 'express';
import cors from 'cors';
import pengambilanRoute from './routes/pengembalian.route.js';
import pengembalianRoute from './routes/pengambilan.route.js';

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

app.use('/api', pengambilanRoute);
app.use('/api', pengembalianRoute);

app.use((req, res) => res.status(404).json({ message: 'ENDPOINT NOT FOUND.' }));

export default app;