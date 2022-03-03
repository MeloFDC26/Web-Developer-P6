const jwt = require("jsonwebtoken");

//Middleware qui vérifie le token reçu
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userID = decodedToken.userID;
    if (req.body.userID && req.body.userID !== userID) {
        throw 'User ID non valable !';
    } else {
        next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée !" });
  }
};