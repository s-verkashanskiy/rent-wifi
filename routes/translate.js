import express from '../';
const router = express.Router();
import automatList from '../seed/seeder.js';

router.get('/q', async (req, res) => {
  try {
    res.render('map');
  } catch (error) { next(error) }
});


export default router;

