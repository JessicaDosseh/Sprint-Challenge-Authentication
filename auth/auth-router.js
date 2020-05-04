const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

const Users = require('../users/users-model.js'); 

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8); 
  user.password = hash; 

  Users.add(user)
    .then(saved => {
      res.status(201).json({ savedUser: saved })
    })
    .catch(error => {
      res.status(500).json({ message: 'Error adding user', error })
    })
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ message: `Welcome ${user.username}!`, token });
      } else {
        res.status(401).json({ message: "Invalid Credentials!" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Error logging in',error });
    });
});


function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
  };
  const secret = process.env.JWT_SECRET || "mysecret";
  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
