import asyncHandler from '../utils/asyncHandler.js';
import pool from '../database/db.js';
import Product from '../models/Product.js';

export default asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) throw 'Ürün bilgisi eksik';

    const userID = req.userData.uid;

    // Ürünün satıcı ID'si ile login yapan kullanıcının ID'si eşleşiyor mu diye de kontrol etmeliyiz.
    const product = await Product.findOne({
      where: {
        id,
        seller_id: userID,
      },
    });

    if (!product) throw 'Ürün bulunamadı';

    // Eğer ürün varsa ve silmek isteyen kişi ürünün sahibi ise ürünü siler.
    const deleteProduct = await Product.destroy({
      where: {
        id,
        seller_id: userID,
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'Ürün silindi',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
});
