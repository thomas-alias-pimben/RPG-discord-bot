const config = require("../config.json");

function getURLTenor(term, limit) {
  let tabTenor = [];
  const Tenor = require("tenorjs").client({
    Key: config.TenorKey, // https://developers.google.com/tenor/guides/quickstart
    Filter: "off", // "off", "low", "medium", "high", not case sensitive
    Locale: "en_US", // Your locale here, case-sensitivity depends on input
    MediaFilter: "minimal", // either minimal or basic, not case sensitive
    DateFormat: "D/MM/YYYY - H:mm:ss A", // Change this accordingly
  });
  Tenor.Search.Query(term, limit)
    .then((Results) => {
      Results.forEach((Post) => {
        tabTenor.push(Post);
        /*console.log(
          `Item #${Post.id} (Created: ${Post.created}) @ ${Post.url}`,
        );*/
      });
    })
    .catch(console.error);
  return tabTenor;
}

module.exports = getURLTenor;
