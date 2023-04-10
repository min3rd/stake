const Game = require("../models/Game");
const baseMigration = require("./BaseMigration");

const game_2023041001 = baseMigration.create('2023041001_game', async () => {
    let luckyCard = new Game();
});

module.exports = game_2023041001;