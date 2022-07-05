import asyncHandler from '../utils/asyncHandler.js';
import pool from '../database/db.js';
import Product from '../models/Product.js';

export default asyncHandler(async (req, res) => {
  try {
    // Tüm ürünler db'den çekilir.
    const all = await Product.findAll();

    if (!all) throw 'Ürün bulunamadı';
    if (all.length == 0) {
      return res.status(200).json({
        status: 'success',
        message: 'Henüz ürün eklenmemiş',
      });
    }
    res.status(200).json({
      status: 'success',
      results: all.length,
      products: all,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
});
