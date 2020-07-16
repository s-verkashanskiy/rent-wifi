import pkg from '@google-cloud/translate';
const { TranslationServiceClient } = pkg;

const translationClient = new TranslationServiceClient({
  projectId: 'avian-line-282114',
  keyFilename: './config/MyFirstProject-d545caf6b6e8.json',
});

const translater = async (text, from = 'ru', to = 'en') => {
  const projectId = 'avian-line-282114';
  // const projectId = '184643420142';
  const location = 'global';
  // Construct request
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    contents: [text],
    mimeType: 'text/plain', // mime types: text/plain, text/html
    sourceLanguageCode: from,
    targetLanguageCode: to,
  };

  try {
    // Run request
    const [response] = await translationClient.translateText(request);
    // console.log(response.translations[0].translatedText);

    // for (const translation of response.translations) {
      // console.log(`Translation: ${translation.translatedText}`);
    // }
    // console.log('!!!', response);
    
    return response.translations[0].translatedText;
  } catch (error) {
    console.error('???', error);
  }
}
// translater('привет, Сергей!', 'ru', 'en');

export default async (req, res, next) => {
  const dict = req.app.locals.dict.ru;
  // console.log(req.app.locals.dict.ru);

  const result = {};

  for (let temp in dict) {

    const dictInHBS = Object.entries(dict[temp]);

    const translated = await Promise.all(dictInHBS.map(([, value]) => {
      // console.log('req.session.currentLangShort', req.session.currentLangShort);
      return translater(value, 'ru', req.session.currentLangShort);
      // return translaterFree(value, 'ru', req.session.currentLangShort);
    }));

    result[temp] = translated.reduce((acc, x, index) => {
      acc[dictInHBS[index][0]] = x;
      return acc;
    }, {});
    // console.log(result[temp]);
    
  };
console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');

  return result;

  // next();
};


import translate from '@vitalets/google-translate-api';

const translaterFree = async (text, from = 'ru', to = 'en') => {
  const result = await translate(text, { from, to });
  // console.log(result.text);

  return result.text;
};
// translaterFree('привет');
