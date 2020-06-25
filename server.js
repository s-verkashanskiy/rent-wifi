import dotenv from 'dotenv';
import http from 'http';
import app from './app.js';
dotenv.config();


const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => console.log("Listening on " + port));
