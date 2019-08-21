const jwt = require('jsonwebtoken');

//можно включить токен как query parametr token=dakslkdlakal
module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    console.log(`came to authorization ${authHeader}`);
    if (!authHeader) {
        const err = new Error('Not authenticated');
        err.statusCode = 401;
        throw err;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const err = new Error('Not authenticated');
        err.statusCode = 401;
        throw err;
    }
    req.userId = decodedToken.userId;
    console.log(req.userId)
    next();
}