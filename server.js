var cluster = require("cluster");

if (cluster.isMaster){
    let cpuCount = require('os').cpus().length;


    for (var i = 0; i < cpuCount; i+= 1){
        cluster.fork();
    }

    cluster.on("exit", function() {
        cluster.fork();
    });
} else {
    require('./healthapp');
}