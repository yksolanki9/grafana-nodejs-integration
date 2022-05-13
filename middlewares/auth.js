let API_TOKEN = null;

function setToken(token) {
  API_TOKEN = token;
}

function addToken(req, res, next) {
  if (!token) {
    return res.status(401).json({message: 'No Auth key provided'});
  }
  res.headers.authorization = `Bearer ${API_TOKEN}`;
  next();
}

module.exports = { addToken }