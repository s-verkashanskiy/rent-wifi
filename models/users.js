import mongoose from 'mongoose';
// import Entry from './entries.js';


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: [true, "Имя занято, попробуйте другое"],
    required: [true, "Укажите свое имя, пожалуйста"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, "Электронный адрес уже занят"],
    required: [true, "Укажите адрес электронной почты"],
    validate: [
      function (email) {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
      }, "Электронный адрес должен соответствовать шаблону",
    ],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Электронный адрес должен соответствовать шаблону",
    ],
  },
  password: {
    type: String,
    required: [true, "Не забудьте указать пароль, пожалуйста"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  registrationDate: {
    type: String,
    default: new Date(new Date().getTime() + 3 * 3600 * 1000).toUTCString().replace(/ GMT$/, ''),
  }
});

userSchema.post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) 
      next(new Error('Электронный адрес уже занят'));
  else next(error);
});


export default mongoose.model('User', userSchema);
