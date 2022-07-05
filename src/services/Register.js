import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

export default asyncHandler(async (req, res) => {
  try {
    const { name, username, pass } = req.body;

    if (!username || !pass || !name) throw 'Lütfen tüm alanları doldurunuz';

    // Şifreyi hashleyerek db'ye kayıt etmek için bcrypt kullanılır
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(pass.toString(), saltRounds);

    const register = await User.create({
      name,
      username,
      password: hashPass,
    });

    if (!register) throw 'Bir hata Oluştu';

    res.status(200).json({
      status: 'success',
      message: 'Üyeliğiniz oluşturuldu',
    });
  } catch (err) {
    res.status(200).json({
      status: 'fail',
      message: err.message,
    });
  }
});
