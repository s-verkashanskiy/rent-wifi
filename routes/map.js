import express from 'express';
const router = express.Router();
import automatList from '../seed/seeder.js';


router.route('/')
  .get((req, res) => {
    try {
      res.render('map');
    } catch (error) { next(error) };
  })
  .post((req, res) => {
    
    res.json({ automatList });
  });


router.get('/q', async (req, res) => {
  try {


    res.render('map');
  } catch (error) { next(error) }
});


export default router;
