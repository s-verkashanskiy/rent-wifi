import express from 'express';
import { resolve } from 'path';
import morgan from 'morgan';
import hbs from 'hbs';
import fs from 'fs';
import './db-connect.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { cookiesCleaner } from './auth.js';
import sessionFileStore from 'session-file-store';
const FileStore = sessionFileStore(session);
import translater from './translate.js';
import { languages } from '../seed/seeder.js';


export default function (app) {
  
  app.use(morgan("dev"));

  // Body POST запросов.
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  
  // Подключаем статику
  app.use(express.static(resolve('public')));
  // app.use(express.static(resolve('views')));

  // Подключаем views(hbs)
  app.set('views', resolve('views'));
  hbs.registerPartials(resolve('views/partials'));
  app.set("view engine", "hbs");


  // initialize cookie-parser to allow us access the cookies stored in the browser.
  app.use(cookieParser());

  // initialize express-session to allow us track the logged-in user across sessions.
  app.use(
    session({
      store: new FileStore(),
      key: "user_sid",
      secret: "anything here",
      resave: false,
      saveUninitialized: true,
      cookie: {
        expires: 6000000,
      },
    }),
  );

  app.use((req, res, next) => {
    res.locals.isAuth = !!req.session.user;
    if (req.session.user) {
      res.locals.userName = req.session.user.username;
    }
    next();
  });

  //translater
  app.use(translater);
  app.locals.languages = languages;
  app.locals.currentLang = languages.ru;
  app.locals.dict = {
  intro: `Оцените все преимущества быстрого и безлимитного интернет-соединения 
  на протяжении всего времени вашей поездки с арендой портативного WiFi роутера. 
  Вы можете забрать роутер в одной из точек аренды или же 
  заказать услугу доставки до вашего отеля.`,
};
  

  hbs.registerHelper('htmlTemplate', (name) => {
    hbs.cachedTemplates = hbs.cachedTemplates || {};
    const template = hbs.cachedTemplates[name]
      || fs.readFileSync(`views/partials/${name}.hbs`, 'utf8');
    hbs.cachedTemplates[name] = template;
    return new hbs.handlebars.SafeString(
      `<template id="${name}Template">
        ${hbs.handlebars.Utils.escapeExpression(template)}
      </template>`,
    );
  });
};
