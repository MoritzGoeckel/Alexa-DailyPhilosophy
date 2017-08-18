var fs = require('fs');

var text = fs.readFileSync('goodreadquotes_philo_cleaned.txt','utf8') + "\n" + fs.readFileSync('goodreadquotes_life_cleaned.txt','utf8')

fs.writeFile('quotes.json', JSON.stringify(text.split("\n")));