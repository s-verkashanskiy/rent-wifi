import express from 'express';
import { resolve } from 'path';
import morgan from 'morgan';
import hbs from 'hbs';
import fs from 'fs';
import './db-connect.js';
import './web-sockets-bot.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import { dict } from '../seed/seeder.js';

const FileStore = sessionFileStore(session);

export default function (app) {
  // translater
  app.locals.dict = dict;
// console.log(app.locals.dict);

  // app.use(translater);


  app.use(morgan('dev'));

  // Body POST запросов.
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Подключаем статику
  app.use(express.static(resolve('public')));
  // app.use(express.static(resolve('views')));

  // Подключаем views(hbs)
  app.set('views', resolve('views'));
  hbs.registerPartials(resolve('views/partials'));
  app.set('view engine', 'hbs');

  // initialize cookie-parser to allow us access the cookies stored in the browser.
  app.use(cookieParser());

  // initialize express-session to allow us track the logged-in user across sessions.
  app.use(
    session({
      store: new FileStore(),
      key: 'user_sid',
      secret: 'anything here',
      resave: false,
      saveUninitialized: true,
      cookie: {
        expires: 6000000,
      },
      dict: dict.ru,
    }),
  );

  app.use((req, res, next) => {
    res.locals.isAuth = !!req.session.user;

    res.locals.currentCity = req.session.currentCity || dict.ru.map.cities[0];

    res.locals.dict = req.session.dict || dict.ru;

    res.locals.currentLang = req.session.currentLang || dict.ru.languages['ru'];
    // res.locals.currentLangShort = req.session.currentLangShort || 'ru';

    if (req.session.user) {
      res.locals.userName = req.session.user.username;
      res.locals.isAdmin = req.session.user.isAdmin;
    }
    next();
  });

  hbs.registerHelper('htmlTemplate', (name) => {
    hbs.cachedTemplates = hbs.cachedTemplates || {};
    const template = hbs.cachedTemplates[name]
      || fs.readFileSync(`views/${name}.hbs`, 'utf8');
    hbs.cachedTemplates[name] = template;
    return new hbs.handlebars.SafeString(
      `<template id="${name}Template">
        ${hbs.handlebars.Utils.escapeExpression(template)}
      </template>`,
    );
  });
}
