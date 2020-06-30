import express from 'express';
const router = express.Router();
import fs from 'fs';
import translater from '../middleware/translate.js';

router.get('/', async (req, res, next) => {
  try {
    req.session.currentLang = req.app.locals.dict.ru.languages[req.query.lang];
    req.session.currentLangShort = req.query.lang;
    req.session.dict = await translater(req, res);
console.log(req.session.dict);

    fs.writeFileSync(`./seed/dict.txt`, req.session.dict);
    const hbs = req.headers.referer.slice(22);

    res.redirect(hbs || '/');
  } catch (error) { next(error) };
});

export default router;
