import translate from '@vitalets/google-translate-api';

const tranlater = async (text, to = 'en', from = 'ru') => {
  const result = await translate(text,
    { from, to });
  return result.text;
};
export default async (req, res, next) => {
  const dict = Object.entries(req.app.locals.dict);
  const translated = await Promise.all(dict.map(([, value]) => {
    return tranlater(value); // <<<---- req.session.lang
  }));
  res.locals.dict = translated.reduce((acc, x, index) => {
    acc[dict[index][0]] = x;
    return acc;
  }, {});
  next();
};
// async function __(text, to = 'en', from = 'ru') {
//   const result = await translate(text,
//     { from, to });
//   return result.text;
// };
// (async () => {
//   const result = await __(`текст`, 'zh-CN');
// })();
