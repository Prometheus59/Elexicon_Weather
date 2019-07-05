const rp = require('request-promise');
const cheerio = require('cheerio');

let cities = [
	{
		name: "Ajax",
		url: "http://weather.gc.ca/city/pages/on-54_metric_e.html"
	},
	{
		name: "Pickering",
		url: "http://weather.gc.ca/city/pages/on-54_metric_e.html"
	},
	{
		name: "Clarington/Port Hope",
		url: "http://weather.gc.ca/city/pages/on-117_metric_e.html"
	},
	{
		name: "Belleville",
		url: "http://weather.gc.ca/city/pages/on-3_metric_e.html"
	},
	{
		name: "Scugog",
		url: "http://weather.gc.ca/city/pages/on-13_metric_e.html"
	},
	{
		name: "Gravenhurst",
		url: "http://weather.gc.ca/city/pages/on-38_metric_e.html"
	},
	{
		name: "Uxbridge/Brock",
		url: "http://weather.gc.ca/city/pages/on-13_metric_e.html"
	}
];

async function getWeather(city){
	var options = {
	  uri: city.url,
	  transform: function (body) {
		return cheerio.load(body);
	  }
	};
	
	await rp(options)
	  .then(($) => {
		let temp_string = $('.pdg-tp-0').first().children('td').eq(1).text();
		let start_index = temp_string.lastIndexOf("Low");
		let temperature = temp_string.slice(start_index, -1);
		console.log(city.name + " temperature: " + temperature);
	  })
	  .catch((err) => {
		console.log(err);
	  });
};


let i = 0, x = cities.length;

console.log("\nLoading Temperatures\n");

(async() => {

	while (i < x) {
		
		let city = cities[i];
		await getWeather(city);
		i++;
	}
})();

