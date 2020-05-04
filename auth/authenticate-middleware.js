/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken'); 
const secret = process.env.JWT_SECRET || "mysecret";

module.exports = (req, res, next) => {

  const token = req.headers.authorization;

  if(!token) {
    res.status(401).json({ message: 'missing token' });
  } else if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if(error) {
        res.status(401).json({ message: 'You shall not pass!' }); 
      } else {
        req.decodedToken = decodedToken; 
        next(); 
      }
    })
  } else {
    res.status(400).json({ message: "Please provide credentials" });
  }
};
