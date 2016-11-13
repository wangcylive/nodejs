/**
 * Created by wangchunyang on 16/3/24.
 */
function route(handle, pathname, response, posData, query) {
    console.log("About to route a request for %s", pathname);

    if(typeof handle[pathname] == "function") {
        /*return handle[pathname](response);*/
        handle[pathname](response, posData, query);
    } else {
        console.log("No request handler fount for %s", pathname);
        /*return "404 Not found";*/

        response.writeHead(404, {
            "Content-Type": "text/plain",
            "Server": "nodeJs"
        });

        response.write("404 Not found");

        response.end();
    }
}

exports.route = route;