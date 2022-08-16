let io;

module.exports = {
    init,
    getIo
}

function init(http) {
    io = require('socket.io')(http);

    io.on('connection', function(socket) {
        console.log('Socket is connected to server');

        // Add addl message listeners here
        socket.on('joined-draft', function(draftId) {
            socket.join(draftId)
        })

        socket.on('draft-player', function(data) {
            socket.to(data._id).emit('update-draft', data)
        })

    

    })
}

function getIo() {
    return io;
}