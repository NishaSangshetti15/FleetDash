const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const { connect } = require('./utils/db');

const app = express();
app.use(cors());

// routes
const ingestRouter = require('./routes/ingest');
app.use('/ingest', ingestRouter);

const PORT = process.env.PORT || 3000;

async function start() {
	await connect();

	const server = http.createServer(app);
	const io = new Server(server, { cors: { origin: '*' } });

	io.on('connection', (socket) => {
		console.log('socket connected', socket.id);
	});

	server.listen(PORT, () => console.log(`FleetDash backend listening on ${PORT}`));
}

start().catch((err) => {
	console.error('Failed to start server', err);
	process.exit(1);
});

