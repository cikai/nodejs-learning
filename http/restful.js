var http = require("http");
var url = require("url");
var items = [];

var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    switch (req.method) {
        case "POST":
            var item = "";
            req.setEncoding("utf-8");
            req.on("data", function(chunk) {
               item += chunk; 
            });
            req.on("end", function() {
               items.push(item);
               res.end("OK\n");
            });
            break;
        case "GET":
            items.forEach(function(item, i) {
               res.write(i + ") " + item + "\n"); 
            });
            res.end();
            break;
        case "DELETE":
            var path = url.parse(req.url).pathname;
            var i = parseInt(path.slice(1), 10);
            
            if (isNaN(i)) {
                res.statusCode = 400;
                res.end("Invalid item id.");
            } else if (!item[i]) {
                res.statusCode = 404;
                res.end("I am not found.");
            } else {
                item.splice(i, 1);
                res.end("OK\n");
            }
            break;
    }
});

server.listen(process.env.PORT, process.env.IP);