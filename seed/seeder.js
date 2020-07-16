import fs from 'fs';
import '../middleware/db-connect.js';
import Automat from '../models/automat.js';
import City from '../models/city.js';


const automatList = [];
automatList.push(
  new Automat({
    id: 1,
    adress: {
      title: 'Adress-1',
      city: 'Москва',
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
      city: 'Москва',
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
      city: 'Москва',
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
  new Automat({
    id: 10,
    adress: {
      title: 'Adress-1',
      city: 'Cанкт-Петербург',
      position: {
        lat: 60.0098,
        lng: 30.6577,
      },
    },
    quantity: {
      routers: 4,
      freeCells: 2,
    },
  }),
  new Automat({
    id: 11,
    adress: {
      title: 'Adress-2',
      city: 'Cанкт-Петербург',
      position: {
        lat: 59.685,
        lng: 30.392,
      },
    },
    quantity: {
      routers: 1,
      freeCells: 6,
    },
  }),
  new Automat({
    id: 12,
    adress: {
      title: 'Adress-3',
      city: 'Cанкт-Петербург',
      position: {
        lat: 60.018,
        lng: 30.059,
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
// User.insertMany(automatList).catch((error) => console.log(error));

const cities = [];
cities.push(
  new City({
    title: 'Москва',
    position: {
      lat: 55.7522,
      lng: 37.6156,
    },
    zoom: 13,
  }),
  new City({
    title: 'Cанкт-Петербург',
    position: {
      lat: 59.8138,
      lng: 30.2695,
    },
    zoom: 8,
  }),
);
// City.insertMany(cities).catch((error) => console.log(error));


const dict = JSON.parse(fs.readFileSync('./seed/dict.json', 'utf-8'));


export { automatList, cities, dict };
