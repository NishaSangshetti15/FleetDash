const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fleetdash';

let connected = false;

async function connect() {
  if (connected) return mongoose;
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connected = true;
  return mongoose;
}

module.exports = { connect, mongoose };
