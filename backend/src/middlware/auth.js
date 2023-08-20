const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).send({ error: "Authorization header missing" });
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send({ error: "Authentication Failed!" });
    }

    const decodedData = jwt.verify(token, "key");

    let user = await User.findOne({
      _id: decodedData?.userId,
    });
    const currentTimestamp = Math.floor(Date.now() / 1000);

if (decodedData.exp < currentTimestamp) {
  return res.status(400).send({error: "token is expire"})
}

    if (!user) {
      return res.status(401).send({ error: "Authentication Failed!" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Authentication error" });
  }
};
