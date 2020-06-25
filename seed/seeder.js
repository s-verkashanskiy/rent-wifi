import '../middleware/db-connect.js';
import Automat from '../models/automat.js';


const automatList = [];
automatList.push(
  new Automat({
    id: 1,
    adress: {
      title: 'Adress-1',
      position: {
        lat: 55.7522,
        lng: 37.6156,
      },
    },
    quantity: {
      routers: 4,
      freeCells: 2,
    },
  }),
  new Automat({
    id: 2,
    adress: {
      title: 'Adress-2',
      position: {
        lat: 55.742,
        lng: 37.625,
      },
    },
    quantity: {
      routers: 1,
      freeCells: 6,
    },
  }),
  new Automat({
    id: 3,
    adress: {
      title: 'Adress-3',
      position: {
        lat: 55.746,
        lng: 37.627,
      },
    },
    status: {
      flag: 'не активен',
      description: 'Временные неполадки',
    },
    quantity: {
      routers: 0,
      freeCells: 7,
    },
  }),
);
// User.insertMany(automatList).catch((error) => console.log(error)); a

export default automatList;
