let DownloadQueue = require("download-queue")
var fs = require('fs');

let que = new DownloadQueue(10, true);

for(let i = 0; i < 47; i++){
    que.enqueDownload("https://www.goodreads.com/quotes/tag/philosophy-of-life?page=" + i, gotResults);
}

function gotResults(url, error, response, html, $){
    let quotes = $(".quoteText");
    for(let q in quotes){
        if(quotes[q].children != undefined && quotes[q].children[0] != undefined){
            //let data = {, author:$(quotes[q]).find(".authorOrTitle").text()}

            function clean(t){
                t = t.replace(/(\r\n|\n|\r|\t|\t\t)/gm,"");
                //t = t.replace(/[^\x20-\x7E]/gmi, "");
                t = t.replace(/([^A-Za-z 0-9.:,!?()&-])/gm, "")
                t = t.replace(/\s{2,}/gm, " ")
                return t;
            }

            data = $(quotes[q]).first().text();

            if(data.length < 500 && data.length > 10){
                let line = clean(data);
                console.log(line)
                fs.appendFileSync('goodreadquotes_life.txt', line + "\n");
            }
        }
    }
}