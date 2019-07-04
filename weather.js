const rp = require('request-promise');
const cheerio = require('cheerio');
const options = {
  uri: `https://weather.gc.ca/city/pages/on-54_metric_e.html`,
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(($) => {
	let temp_string = $('.pdg-tp-0').first().children('td').eq(1).text();
	let start_index = temp_string.lastIndexOf("Low");
	let temperature = temp_string.slice(start_index, -1);
	console.log(temperature);
  })
  .catch((err) => {
    console.log(err);
  });