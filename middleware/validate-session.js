const jwt = require("jsonwebtoken");
const User = require("../db").import("../models/user");

module.exports = function (req, res, next) {
    if (req.method == "OPTIONS") {
        next(); // allowing options as a method for request
    } else {
        const sessionToken = req.headers.authorization;
        if (!sessionToken) {
            return res.status(403).send({ auth: false, message: "No token provided." });
        } else {
            jwt.verify(sessionToken, "lets_play_sum_games_man", async (err, decoded) => {
                if (decoded) {
                    try {
                        const user = await User.findOne({ where: { id: decoded.id } });
                        req.user = user;
                        next();
                    } catch (err) {
                        res.status(401).send({ error: "not authorized" });
                    }
                } else {
                    res.status(400).send({ error: "not authorized" });
                }
            });
        }
    }
};
