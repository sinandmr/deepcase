import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    // Bareer token olarak girilen tokeni ayrıştırır.
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // Tokendeki bilgileri request object'ine bir value olarak veriyorum.
    // Auth'un geçerli olduğu bundan sonraki request isteklerinde giriş yapan kullanıcıya her zaman aşağıdaki bilgiden ulaşırız.
    req.userData = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send({
      status: 'fail',
      message: 'Authentication başarısız',
    });
  }
};
