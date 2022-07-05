import express from 'express';
const router = express.Router();

import checkAuth from '../middlewares/checkAuth.js';
import getAllProduct from '../services/getAllProduct.js';
import addProduct from '../services/addProduct.js';
import updateProduct from '../services/updateProduct.js';
import deleteProduct from '../services/deleteProduct.js';

/* checkAuth middleware ile token kontrolü yapıyoruz.
Eğer token geçerliyse reqeust objecti içerisine userData adında yeni bir value ile token içindeki bilgileri yerleştiriyoruz. */

router
  .route('/product')
  .get(checkAuth, getAllProduct)
  .post(checkAuth, addProduct);

router
  .route('/product/:id')
  .delete(checkAuth, deleteProduct)
  .put(checkAuth, updateProduct);

export default router;
