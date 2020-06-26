import express from 'express';
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    console.log('req.session.currentLang', req.session.currentLang);
    
    const hbs = req.headers.referer.slice(22);
    req.app.locals.currentLang = req.app.locals.languages[req.query.lang];
    
    res.redirect(hbs || '/');
  } catch (error) { next(error) };
});


export default router;

