import mongoose from 'mongoose';

const automatSchema = new mongoose.Schema({
  id: {
    type: Number,
    trim: true,
    unique: true,
    required: true,
  },
  adress: {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    position: {
      lat: Number,
      lng: Number,
    },
  },
  status: {
    flag: {
      type: String,
      default: 'активен',
    },
    description: {
      type: String,
      default: 'ok',
    },
  },
  quantity: {
    routers: {
      type: Number,
      default: 5,
    },
    freeCells: {
      type: Number,
      default: 2,
    },
  },
  lastUpdateTime: {
    type: String,
    default: new Date(new Date().getTime() + 3 * 3600 * 1000).toUTCString().replace(/ GMT$/, ''),
  },
  registrationDate: {
    type: String,
    default: new Date(new Date().getTime() + 3 * 3600 * 1000).toUTCString().replace(/ GMT$/, ''),
  },
});

export default mongoose.model('Automat', automatSchema);
