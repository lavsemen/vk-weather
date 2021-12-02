import translate from "translate";

translate.engine = "google"; // Or "yandex", "libre", "deepl"
translate.key = process.env.GOOGLE_KEY;

async function translateWord(word, lang) {
  try {
    const res = await translate(word, lang);
    return res
  } catch(err) {
    console.log('Лимит запросов привышен')
    return word
  }
  
}
export {translateWord};