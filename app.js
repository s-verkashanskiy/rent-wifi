import express from 'express';
import useMiddleware from './middleware/index.js';
import indexRouter from './routes/index.js';
import mapRouter from './routes/map.js';
import translationRouter from './routes/translate.js';
import adminRouter from './routes/admin.js';

const app = express();

useMiddleware(app);

// Подключаем импортированные маршруты с определенным url префиксом.
app.use('/', indexRouter);
app.use('/map', mapRouter);
app.use('/translation', translationRouter);
app.use('/admin', adminRouter);


export default app;
