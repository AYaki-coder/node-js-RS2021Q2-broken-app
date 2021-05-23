const router = require("express").Router();
const Game = require("../db").import("../models/game");

router.get("/all", async (req, res) => {
    try {
        const data = await Game.findAll({ where: { ownerId: req.user.id } });
        res.status(200).json({
            games: data,
            message: "Data fetched.",
        });
    } catch (err) {
        res.status(500).json({
            message: "Data not found",
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const game = await Game.findOne({ where: { id: req.params.id, ownerId: req.user.id } });
        res.status(200).json({
            game: game,
        });
    } catch (err) {
        res.status(500).json({
            message: "Data not found.",
        });
    }
});

router.post("/create", async (req, res) => {
    try {
        const game = await Game.create({
            title: req.body.game.title,
            ownerId: req.user.id,
            studio: req.body.game.studio,
            esrbRating: req.body.game.esrbRating,
            userRating: req.body.game.userRating,
            havePlayed: req.body.game.havePlayed,
        });
        res.status(200).json({
            game: game,
            message: "Game created.",
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const game = await Game.update(
            {
                title: req.body.game.title,
                studio: req.body.game.studio,
                esrbRating: req.body.game.esrbRating,
                userRating: req.body.game.userRating,
                havePlayed: req.body.game.havePlayed,
            },
            {
                where: {
                    id: req.params.id,
                    ownerId: req.user.id,
                },
            }
        );
        res.status(200).json({
            game: game,
            message: "Successfully updated.",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

router.delete("/remove/:id", async (req, res) => {
    try {
        const game = await Game.destroy({
            where: {
                id: req.params.id,
                ownerId: req.user.id,
            },
        });
        res.status(200).json({
            game: game,
            message: "Successfully deleted",
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

module.exports = router;
