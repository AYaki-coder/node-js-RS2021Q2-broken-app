const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../db").import("../models/user");

router.post("/signup", async (req, res) => {
    try {
        const user = await User.create({
            fullName: req.body.user.fullName,
            username: req.body.user.username,
            passwordHash: bcrypt.hashSync(req.body.user.password, 10),
            email: req.body.user.email,
        });
        const token = jwt.sign({ id: user.id }, "lets_play_sum_games_man", { expiresIn: 60 * 60 * 24 });
        res.status(201).json({
            user: user,
            token: token,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post("/signin", async (req, res) => {
    const user = await User.findOne({ where: { username: req.body.user.username } });
    if (user) {
        bcrypt.compare(req.body.user.password, user.passwordHash, (err, matches) => {
            if (matches) {
                const token = jwt.sign({ id: user.id }, "lets_play_sum_games_man", { expiresIn: 60 * 60 * 24 });
                res.json({
                    user: user,
                    message: "Successfully authenticated.",
                    sessionToken: token,
                });
            } else {
                res.status(502).send({ error: "Passwords do not match." });
            }
        });
    } else {
        res.status(403).send({ error: "User not found." });
    }
});

module.exports = router;
