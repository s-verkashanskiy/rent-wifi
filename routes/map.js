import express from 'express';
const router = express.Router();
import { automatList, cities }  from '../seed/seeder.js';

router.route('/:id')
  .get((req, res) => {
    // console.log('<<<<<<<<<<<<<MAP', req.params.id);
    
    res.render('map', { cities, currentCity: req.params.id });
  })
  .post((req, res) => {
    res.json({ status: 200, automatList, cities });
  });


export default router;
