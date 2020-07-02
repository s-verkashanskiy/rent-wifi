// import fetch from 'node-fetch';
import pkg from '@google-cloud/translate';
const { TranslationServiceClient } = pkg;

const translationClient = new TranslationServiceClient({
  projectId: '184643420142',
  keyFilename: '../shareRouter-2c5784b573bc.json',
});

const tranlater = async (text, from = 'ru', to = 'en') => {
  const projectId = '184643420142';
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
    console.log(response);
     
    // for (const translation of response.translations) {
    //   console.log(`Translation: ${translation.translatedText}`);
    // }
  } catch (error) {
    console.error(error.details);
  }
}
tranlater('привет');

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


// async function __(text, to = 'en', from = 'ru') {
//   const result = await translate(text,
//     { from, to });
//   return result.text;
// };
// (async () => {
//   const result = await __(`текст`, 'zh-CN');
// })();



// const tranlater = async (text, from = 'ru', to = 'en') => {

//   const response = await fetch(
//     `https://translation.googleapis.com/v3/projects/${projectId}:translateText`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       sourceLanguageCode: from,
//       targetLanguageCode: to,
//       contents: [text],
//       mimeType: "text/plain"
//     }),
//   });
//   const translations = await response.json();
//   console.log(translations);
  
//   return translations;
// }


// import translate from '@vitalets/google-translate-api';
// const tranlater = async (text, from = 'ru', to = 'en') => {
//   const result = await translate(text,
//     { from, to });
//   return result.text;
// };
