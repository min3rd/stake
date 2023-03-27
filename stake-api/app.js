require('dotenv').config();
const Engine = require('./core/engine');
const BinanceJob = require('./jobs/binance');
const engine = new Engine();
engine.start();

const binaceJob = new BinanceJob();
binaceJob.start();