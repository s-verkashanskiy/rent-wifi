import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  position: {
    lat: Number,
    lng: Number,
  },
  zoom: Number,
});


export default mongoose.model('City', citySchema);
