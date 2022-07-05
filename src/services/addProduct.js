import asyncHandler from '../utils/asyncHandler.js';
import pool from '../database/db.js';
import Product from '../models/Product.js';

export default asyncHandler(async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) throw 'Ürün bilgileri eksik';

    // Ürünü satan kişinin id'sini Auth kontrolünde giriş yapan kullanıcı id'si olarak atıyorum.
    const sellerUserID = req.userData.uid;

    const newProduct = await Product.create({
      name,
      price,
      seller_id: sellerUserID,
    });
    if (!newProduct) throw 'Ürün eklenemedi';
    res.status(200).json({
      status: 'success',
      message: 'Ürün eklendi',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
});
