/**
 * Created by wangchunyang on 16/3/24.
 */

var exec = require("child_process").exec;

var fs = require("fs");

function start(response, postData) {
    console.log("Request handler 'start' was called.");

    /*function sleep(milliseconds) {
        var startTime = new Date().getTime();
        while(new Date().getTime() < startTime + milliseconds) {}
    }

    sleep(10000);

    return "Hello Start";*/

    var content = "empty";

    // "ls -lah"

    /*exec("find /", {
        timeout: 10000,
        maxBuffer: 1000 * 1024
    }, function(error, stdout, stderr) {
        content = stdout;

        response.writeHead(200, {
            "Content-Type": "text/plain",
            "Server": "nodeJs"
        });
        response.write(content);
        response.end();
    });*/

    var html = "<html>" +
            "<head>" +
            "<meta charset='utf-8'>" +
            "</head>" +
            "<body>" +
            "<form action='/upload' method='post'>" +
            "<div><textarea name='text' cols='60' rows='10'></textarea></div>" +
            "<p><button type='submit'>Submit Text</button></p>" +
            "</form>" +
            "</body>" +
            "</html>";

    response.writeHead(200, {
        "Content-Type": "text/html;charset=utf-8",
        "_Server": "nodeJs"
    });

    response.write(html);
    response.end();
}

function upload(response, postData) {
    console.log("Request handler 'upload' was called.");
    //return "Hello Upload";

    response.writeHead(200, {
        "Content-Type": "text/plain;charset=utf-8",
        "Server": "nodeJs"
    });

    //response.write("Hello Upload");

    response.write("You're send: " + postData);
    response.end();
}

function getText(response) {
    fs.readFile("./data/a.txt", "utf8", function(err, data) {
        response.writeHead(200, {
            "Content-Type": "text/plain;charset=utf-8",
            "_Server": "nodeJs"
        });

        if(err) {
            response.write("Error");
        } else {
            response.write(data);
        }

        response.end();
    });
}

var logArray = [];

var logTimeout;

var isRun = 0;

function runWriteLog() {
    if(!isRun) {
        writeLog();
    }
}

function setText(response, postData, query) {
    logArray.push(decodeURIComponent(query) + "  " + Date.now() + "  " + Math.random() + "\r");

    /*clearTimeout(logTimeout);

    logTimeout = setTimeout(writeLog, 500);*/
    runWriteLog();

    response.writeHead(200, {
        "Content-Type": "text/plain;charset=utf-8",
        "_Server": "nodeJs"
    });

    response.write("Write success");
    response.end();
}

function writeLog() {
    isRun = 1;
    var text = "";

    while(logArray.length) {
        text += logArray.shift();
    }

    fs.appendFile("./data/b.txt", text, function(err) {
        if(err) {
            console.log("Write log error!");
        }
        isRun = 0;
    });

    /*fs.readFile("./data/a.txt", "utf8", function(err, data) {
        var text = "";

        if(err) {
            text = "";
        }

        while(logArray.length) {
            text += data + logArray.shift();
        }

        fs.writeFile("./data/a.txt", text, function(err) {
            if(err) {
                console.log("writeLog error!", err);
            }
        });
    });*/
}

function clearText(response) {
    fs.writeFile("./data/a.txt", "", function(err) {
        response.writeHead(200, {
            "Content-Type": "text/plain;charset=utf-8",
            "_Server": "nodeJs"
        });

        if(err) {
            response.write("Clean error");
        } else {
            response.write("Clean success");
        }

        response.end();
    })
}

exports.start = start;
exports.upload = upload;
exports.getText = getText;
exports.setText = setText;