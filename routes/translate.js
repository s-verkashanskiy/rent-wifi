import express from 'express';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    
    req.session.currentLang = req.query.lang;
    // console.log('req.session.currentLang', req.session.currentLang);
    const hbs = req.headers.referer.slice(22);
    res.render(hbs);
  } catch (error) { next(error); }
});

export default router;
