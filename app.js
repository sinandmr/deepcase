import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Route Dosyaları
import userRoute from './src/routes/userRoute.js';
import productRoute from './src/routes/productRoute.js';

const app = express();
app.use(cors());

// Method
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
  next();
});

app.disable('x-powered-by');
app.disable('etag');
// Middlewares
app.use(express.json()); // Request içindeki JSON verisine erişmek için bu middleware'i kullanıyorum.

app.use('/api/', userRoute);
app.use('/api/', productRoute);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Bu endpoint kullanılmıyor',
  });
});

// Server start
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server On | Port: ${port}`);
});
