const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/barrage', {useNewUrlParser: true, useUnifiedTopology: true });

const Schema = new mongoose.Schema({
	time: Number,
	msg: String
});

let Barrage = mongoose.model('Barrage', Schema);

module.exports = Barrage;