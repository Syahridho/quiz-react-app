export const decodeHtmlEntity = (str) => {
  return str
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
    .replace(/&(.+);/g, (_, entity) => {
      const entities = {
        amp: "&",
        lt: "<",
        gt: ">",
        quot: '"',
        apos: "'",
        rsquo: "'",
        lsquo: "'",
        ndash: "–",
        mdash: "—",
        nbsp: " ",
        euro: "€",
        pound: "£",
        yen: "¥",
        cent: "¢",
        copy: "©",
        reg: "®",
      };
      return entities[entity] || `&${entity};`;
    });
};
