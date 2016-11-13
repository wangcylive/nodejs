/**
 * Created by Wangcy on 2015/8/5.
 */
var http = require("http");
var url = require("url");
var fs = require("fs");

//fs.mkdirSync("./data/txt", 0755);
//fs.open("./data/b.txt", "a", function(err, fd) {});

function start(route, handle) {
    function onRequest(request, response) {
        console.log("Request received %s", new Date());

        var pathname = url.parse(request.url).pathname,
            query = url.parse(request.url).query;

        var postData = "";

        request.setEncoding("utf8");

        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;

            console.log("Received Post data chunk %s", postDataChunk);
        });

        request.addListener("end", function(){
            route(handle, pathname, response, postData, query);
        });

        /*var content = route(handle, pathname);

        response.writeHead(200, {
                "Content-Type": "text/html;charset=utf-8",
                "Server": "nodeJs"
            }
        );
        response.write(content);
        response.end();*/
    }

    http.createServer(onRequest).listen(11000);

    console.log("Server has started. %s", new Date());
}

exports.start = start;
