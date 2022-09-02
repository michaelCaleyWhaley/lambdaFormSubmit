function findHasBannedWords(text) {
  const matches = text.match(/(seo)|(search engine)|(search rankings)/gim);
  return !!matches?.length;
}

module.exports = { findHasBannedWords };
