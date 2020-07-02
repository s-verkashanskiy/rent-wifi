import translate from '@vitalets/google-translate-api';

const tranlater = async (text, from = 'ru', to = 'en') => {
  const result = await translate(text, { from, to });
  return result.text;
};
// tranlater('привет');


export default async (req, res, next) => {
  const dict = req.app.locals.dict.ru;

  for (let temp in dict) {

    const dict_hbs = Object.entries(dict[temp]);

    const translated = await Promise.all(dict_hbs.map(([, value]) => {
      return tranlater(value, 'en', req.session.currentLangShort);
    }));
    req.session.dict[temp] = translated.reduce((acc, x, index) => {
      acc[dict_hbs[index][0]] = x;
      return acc;
    }, {});
  }
  console.log(req.session.dict);

  // next();
};
