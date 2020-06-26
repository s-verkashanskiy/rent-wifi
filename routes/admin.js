import express from 'express';
const router = express.Router();
import automatList from '../seed/seeder.js';


router.get('/', async (req, res) => {
  try {
    res.render('admin/admin', { isAdmin: true });
  } catch (error) { next(error) };
});

router.route('/automats')
  .get((req, res) => {
    try {
      
      res.render('admin/automats/automats', { isAdmin: true, automatList });
    } catch (error) { next(error) };
  })
  .post((req, res) => {

    res.json({  });
  });


router.get('/q', async (req, res) => {
  try {


    res.render('map');
  } catch (error) { next(error) }
});


export default router;
