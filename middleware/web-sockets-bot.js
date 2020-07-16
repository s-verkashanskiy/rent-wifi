import ws from 'ws';
import TelegramBot from 'node-telegram-bot-api';
import config from '../config/config.js';
import server from '../server.js';


export default function (server) {

  const wsServer = new ws.Server({ server });
  const bot = new TelegramBot(config.token, {
    polling: {
      interval: 300,
      autoStart: true,
      params: { timeout: 10 },
    },
  });

  // EventEmitter
  wsServer.on('connection', (client) => {

    console.log('>>>>connected');
    client.on('message', (data) => {

      // Добавление временного штампа к сообщению
      console.log('>>>message', data);
      const json = JSON.parse(data);
      json.timestamp = new Date().getTime();
      client.send(JSON.stringify(json));
      // отправка сообщения в бот
      json.timestamp = `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`;
      bot.sendMessage('642982892', debugMD(json), { parse_mode: 'Markdown' });
    });

    bot.on('message', async (msg) => {
      console.log("from Bot's user:", msg);

      const json = {
        nickname: 'operator',
        message: msg.text,
        timestamp: new Date().getTime(),
      };
      client.send(JSON.stringify(json));
      // wsServer.clients.forEach((currentClient) => {
      //   currentClient.send(JSON.stringify(msg.text));
    });
  });

  function debugMD(obj) {
    let result = '';

    for (let k in obj) {
      result += `*${k}*: ${obj[k]}\n`
    }
    result += '\n';

    return result;
  }
}
