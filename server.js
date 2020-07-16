import './dotenv.js';
import http from 'http';
import app from './app.js';
import webSocketBot from './middleware/web-sockets-bot.js';


const port = process.env.PORT || 3000;

const server = http.createServer(app);
webSocketBot(server);

server.listen(port, () => console.log("Listening on " + port));

export default server;
