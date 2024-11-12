function findHasBannedWords(text) {
  const matches = text.match(/(seo)|(search engine)|(search rankings)|(advertronixltd)|(Google Ads)/gim);
  return !!matches?.length;
}

module.exports = { findHasBannedWords };
