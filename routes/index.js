import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import User from '../models/users.js';

const saltRounds = 10;


router.get('/', (req, res) => {
  try {
    res.render('index', { isHome: true });
  }
  catch (err) {console.error(err)}
});

router
  .route('/signup')
  .get((req, res) => {
    res.render('signup');
  })
  .post(async (req, res, next) => {
    // let errUnqUser, errUnqEmail, isError = false;
    try {
      const { username, email, password } = req.body;
      
      // if (username && await User.findOne({username})) {
      //   errUnqUser = 'Такое имя уже занято';
      //   isError = true;
      // };
      // if (email && await User.findOne({email})) {
      //   errUnqEmail = 'Введенный e-mail, к сожалению, занят';
      //   isError = true;
      // };
      
      // if (!isError) {
        await new User({
          username,
          email,
          password: await bcrypt.hash(password, saltRounds),
        }).save();
        return res.end();
      res.end();

    } catch (error) {
      console.log(error);
      
      res.json({status: 401, error });
    }
  });

router
  .route('/login')
  .get((req, res) => {
    if (req.session.user) res.redirect('/');
    else res.render('login');
  })
  .post(async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        req.session.user = user;
        if (session.prevUrl) {
          res.redirect(session.prevUrl);
          delete session.prevUrl;
        } else res.redirect('/');
      } else if (!user) {
        res.render('login', { message: 'Введенный e-mail не зарегистрирован' });
      } else res.render('login', { message: 'Введенный пароль не совпадает' });
    } catch (error) {
      console.log(error.message);
      // res.json({status: error.message});
    }
  });


router.get('/logout', async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie('user_sid');
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect('/login');
  }
});

export default router;
