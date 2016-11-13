/**
 * Created by wangchunyang on 16/3/24.
 */
var server = require("./server.js");
var route = require("./route.js");
var requestHandlers = require("./requestHandlers.js");

var handle = {
    "/": requestHandlers.start,
    "/start": requestHandlers.start,
    "/upload": requestHandlers.upload,
    "/getText": requestHandlers.getText,
    "/setText": requestHandlers.setText
};

server.start(route.route, handle);