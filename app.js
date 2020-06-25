import express from 'express';
import useMiddleware from './middleware/index.js';
import indexRouter from './routes/index.js';
import mapRouter from './routes/map.js';
import { languages } from './seed/seeder.js'

const app = express();
app.locals.languages = languages;
app.locals.dict = {
  intro: `Оцените все преимущества быстрого и безлимитного интернет-соединения 
  на протяжении всего времени вашей поездки с арендой портативного WiFi роутера. 
  Вы можете забрать роутер в одной из точек аренды или же 
  заказать услугу доставки до вашего отеля.`,
};
useMiddleware(app);

// Подключаем импортированные маршруты с определенным url префиксом.
app.use('/', indexRouter);
app.use('/map', mapRouter);

export default app;
