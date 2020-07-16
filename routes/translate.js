import express from 'express';
const router = express.Router();
import fs from 'fs';
import translater from '../middleware/translate.js';
import { cities }  from '../seed/seeder.js';

router.get('/', async (req, res, next) => {
  req.session.currentLangShort = req.query.lang;
  
  if (req.app.locals.dict[req.query.lang]) {
    // обновление словаря данного пользователя
    req.session.dict = req.app.locals.dict[req.query.lang];
    // обновление значения текущего языка
    req.session.currentLang = req.app.locals.dict[req.query.lang].languages[req.query.lang];

  } else {
    try {
      req.session.dict = await translater(req, res);
    } catch (error) { next(error) };
    // console.log(req.session.dict);
    // console.log(req.query.lang);


    req.app.locals.dict[req.query.lang] = req.session.dict;
    req.session.currentLang = req.app.locals.dict[req.query.lang].languages[req.query.lang];
    // req.session.dict = req.app.locals.dict.ru;

    fs.writeFileSync(`./seed/dict___.json`, JSON.stringify(req.app.locals.dict), 'utf-8');
  }

  // переименование массива городов, в которых есть автоматы
  cities.forEach((city, index) => {
    // переименовываем город "по умолчанию"

    // console.log(cities[index].title, res.locals.currentCity);
    if (cities[index].title == res.locals.currentCity) {
      req.session.currentCity = req.session.dict.map.cities[index];
    }
    // переименовываем город
    cities[index].title = req.session.dict.map.cities[index];
  });

  // console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');

  // Восстанавливаем url страницы на которой выполнили перевод
  let hbs = req.headers.referer.slice(22);
  // переименовываем город в url
  if (hbs.includes('map')) {hbs = 'map/' + req.session.currentCity }

  res.redirect(hbs || '/');
});

export default router;
