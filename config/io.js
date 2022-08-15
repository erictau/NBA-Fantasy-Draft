let io;

module.exports = {
    init,
    getIo
}

function init(http) {
    io = require('socket.io')(http);

    io.on('connection', function(socket) {
        console.log(socket);

        // Add addl message listeners here

    })
}

function getIo() {
    return io;
}