const Game = require("../models/game/Game");
const baseMigration = require("./BaseMigration");

const game_2023041001 = baseMigration.create('2023041001_game', async () => {
    let mines = new Game();
});

module.exports = game_2023041001;