// Price ticker
EthTools.ticker = new Mongo.Collection("ethereum_price_ticker", {
  connection: null
});
if (Meteor.isClient) new PersistentMinimongo(EthTools.ticker);

EthTools.ticker.start = function(options) {
  options = options || {};
  if (!options.currencies) {
    options.currencies = ["BTC", "USD", "EUR"];
  }
  var url =
    "https://api.1won.com/data/price?fsym=WON&tsyms=" +
    options.currencies.join(",");
  if (options.extraParams) {
    url += "&extraParams=" + options.extraParams;
  }

  var updatePrice = function(e, res) {
    if (!e && res && res.statusCode === 200) {
      var content = JSON.parse(res.content);

      if (content) {
        _.each(content, function(price, key) {
          var name = key.toLowerCase();

          // make sure its a number and nothing else!
          if (_.isFinite(price)) {
            EthTools.ticker.upsert(name, {
              $set: {
                price: String(price),
                timestamp: null
              }
            });
          }
        });
      }
    } else {
      console.warn(
        "Can not connect to https://api.1won.com to get price ticker data, please check your internet connection."
      );
    }
  };

  // update right away
  HTTP.get(url, updatePrice);

  // update prices
  // Meteor.setInterval(function() {
  //   HTTP.get(url, updatePrice);
  // }, 1000 * 30);
};
