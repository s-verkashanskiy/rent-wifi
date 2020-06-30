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


const dict = {
  ru: {
    navbar: {
      btn1: 'Карта',
      btn2: 'Главная',
      btn3: 'Регистрация',
      btn4: 'Войти',
      btn5: 'Выйти',
    },
    index: {
      intro: `Оцените все преимущества быстрого и безлимитного интернет-соединения 
  на протяжении всего времени вашей поездки с арендой портативного WiFi роутера. 
  Вы можете забрать роутер в одной из точек аренды или же 
  заказать услугу доставки до вашего отеля.`,
      title1: 'Что такое карманный WiFi?',
      forTitle1: `Его функции практически идентичны беспроводному WiFi 
      роутеру у вас дома с той разницей, 
      что City WiFi компактен и легко переносим, а также не 
      требует никакой предварительной установки.`,
    },
    signIn: {
      text1: 'Аутентификация',
    },
    map: {
      title: 'Автоматы аренды роутеров Wi-Fi',
      cities: [
        'Москва',
        'Cанкт-Петербург',
      ],
    },
    signup: {
      text1: 'Регистрация',
    },
    languages: {
      ru: 'Russian',
      en: 'English',
      de: 'German',
      fr: 'French',
      'zh-CN': 'Chinese (Simplified)',
      'zh-TW': 'Chinese (Traditional)',
      af: 'Afrikaans',
      sq: 'Albanian',
      am: 'Amharic',
      ar: 'Arabic',
      hy: 'Armenian',
      az: 'Azerbaijani',
      eu: 'Basque',
      be: 'Belarusian',
      bn: 'Bengali',
      bs: 'Bosnian',
      bg: 'Bulgarian',
      ca: 'Catalan',
      ceb: 'Cebuano',
      ny: 'Chichewa',
      co: 'Corsican',
      hr: 'Croatian',
      cs: 'Czech',
      da: 'Danish',
      nl: 'Dutch',
      eo: 'Esperanto',
      et: 'Estonian',
      tl: 'Filipino',
      fi: 'Finnish',
      fy: 'Frisian',
      gl: 'Galician',
      ka: 'Georgian',
      el: 'Greek',
      gu: 'Gujarati',
      ht: 'Haitian Creole',
      ha: 'Hausa',
      haw: 'Hawaiian',
      he: 'Hebrew',
      iw: 'Hebrew',
      hi: 'Hindi',
      hmn: 'Hmong',
      hu: 'Hungarian',
      is: 'Icelandic',
      ig: 'Igbo',
      id: 'Indonesian',
      ga: 'Irish',
      it: 'Italian',
      ja: 'Japanese',
      jw: 'Javanese',
      kn: 'Kannada',
      kk: 'Kazakh',
      km: 'Khmer',
      ko: 'Korean',
      ku: 'Kurdish (Kurmanji)',
      ky: 'Kyrgyz',
      lo: 'Lao',
      la: 'Latin',
      lv: 'Latvian',
      lt: 'Lithuanian',
      lb: 'Luxembourgish',
      mk: 'Macedonian',
      mg: 'Malagasy',
      ms: 'Malay',
      ml: 'Malayalam',
      mt: 'Maltese',
      mi: 'Maori',
      mr: 'Marathi',
      mn: 'Mongolian',
      my: 'Myanmar (Burmese)',
      ne: 'Nepali',
      no: 'Norwegian',
      ps: 'Pashto',
      fa: 'Persian',
      pl: 'Polish',
      pt: 'Portuguese',
      pa: 'Punjabi',
      ro: 'Romanian',
      sm: 'Samoan',
      gd: 'Scots Gaelic',
      sr: 'Serbian',
      st: 'Sesotho',
      sn: 'Shona',
      sd: 'Sindhi',
      si: 'Sinhala',
      sk: 'Slovak',
      sl: 'Slovenian',
      so: 'Somali',
      es: 'Spanish',
      su: 'Sundanese',
      sw: 'Swahili',
      sv: 'Swedish',
      tg: 'Tajik',
      ta: 'Tamil',
      te: 'Telugu',
      th: 'Thai',
      tr: 'Turkish',
      uk: 'Ukrainian',
      ur: 'Urdu',
      uz: 'Uzbek',
      vi: 'Vietnamese',
      cy: 'Welsh',
      xh: 'Xhosa',
      yi: 'Yiddish',
      yo: 'Yoruba',
      zu: 'Zulu',
    },
  },
};

export { automatList, cities, dict };
