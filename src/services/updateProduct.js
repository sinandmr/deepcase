import asyncHandler from '../utils/asyncHandler.js';
import pool from '../database/db.js';
import Product from '../models/Product.js';

export default asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { price, status } = req.body;

    if (!id || !status || !price) throw 'Ürün bilgisi eksik';

    // Status için db'de sadece active veya passive tutacağımız için eğer yanlış bir durum mesajı yazıldıysa
    // bunu hata olarak döneriz.
    if (!['active', 'passive'].includes(status)) throw 'Durum bilgisi yanlış';

    const userID = req.userData.uid;

    // Ürünün satıcı ID'si ile login yapan kullanıcının ID'si eşleşiyor mu diye de kontrol etmeliyiz.
    const findProd = await Product.findOne({
      where: {
        id,
        seller_id: userID,
      },
    });

    if (!findProd) throw 'Ürün bulunamadı';

    // Eğer ürün varsa güncelleme yaparız.
    const updateProd = await Product.update(
      {
        status,
        price,
      },
      {
        where: {
          id,
          seller_id: userID,
        },
      }
    );
    res.status(200).json({
      status: 'success',
      message: 'Ürün bilgileri güncellendi',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
});
