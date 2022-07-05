import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

export default asyncHandler(async (req, res) => {
  try {
    // Login işlemi için atılan istekteki json verisini işleyerek o kullanıcıyı bulacağız
    const { username, pass } = req.body;

    if (!username || !pass) throw 'Kullanıcı bilgileri eksik';

    // DB'den kullanıcıyı sorgular
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) throw 'Kullanıcı bulunamadı';

    // İstek atılan json'daki şifre ile db'deki hash edilmiş şifreyi karşılaştırırız
    const isMatch = await bcrypt.compare(
      pass.toString(),
      user.password.toString()
    );
    if (!isMatch) throw 'Şifreler uyuşmuyor';

    // Şifre doğru ise token oluşturulur ve response olarak gönderilir.
    const token = jwt.sign(
      {
        uid: user.id,
        name: user.name,
        username: user.username,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '1h', // Token süresi 1 saat
      }
    );

    // JWT ile token oluşturduk ve bunu json verisi olarak döndük.
    return res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    res.status(200).json({
      status: 'fail',
      message: err,
    });
  }
});
