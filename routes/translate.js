import express from 'express';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    req.session.currentLang = req.query.lang;
    req.app.locals.currentLang = req.app.locals.languages[req.query.lang];

    const hbs = req.headers.referer.slice(22);

    res.redirect(hbs || '/');
  } catch (error) { next(error) };
});

export default router;
