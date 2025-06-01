require('dotenv').config();
const jwt = require('jsonwebtoken');

const key = process.env.JWT_KEY;
const expiresIn = process.env.JWT_EXPIRES;

if (!key) throw new Error('Missing JWT_KEY in .env');

function signToken(payload) {
  return jwt.sign(payload, key, { expiresIn }); 
}

function verifyToken(token) {
  try {
    return jwt.verify(token, key);
  } catch {
    return null;
  }
}

module.exports = { signToken, verifyToken };
