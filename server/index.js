/**
 * Require some modules
 */

const express = require('express'), // for setting up http stuff
  http = require('http'), // wrapping express for socket.io
  helmet = require('helmet'), // for security!
  socketio = require('socket.io'), // socket.io for sockets
  Enmap = require("enmap"), // a module to make maps even better
  config = require('./config'); // config for easy customization

/**
* Set up our server
*/

// Startup our express app
var app = express();
// Helmet for security
app.use(helmet());

// wrap our http server around express for socket.io
var server = http.Server(app);
// setup socket.io with a custom pingTimeout so we dont get errors on client end
var io = socketio(server, {
  pingTimeout: 30000
});

// Make a map to help store data
var connectedUsers = {};
var availableUsers = [];

// our matchmaking system


// setup our socket.io stuff
// This is called whenever there is a new socket connection
io.on('connection', (socket) => {

  socket.on('setUsername', (username, callBack) => {

    socket.user = {
      username: username,
      id: socket.id
    };

    connectedUsers[username] = socket;
    availableUsers.push(username);

    callBack(socket.user);
  })

  socket.on('battleRandom', (callback) => {
    /**
     * TODO: code to add users to a array and grab random users every so often
     */
  })

  socket.on('requestBattle:username', (username, callBack) => {

    var user = connectedUsers[username];

    if (!user) return callBack('no one with that username');

    if (availableUsers.indexOf(username) == -1) return callBack('that person is busy');

    user.emit('battleRequest:user', socket.user);

    callBack(`request sent to ${username}`);
  });

  socket.on('battleRequest:accept', (challenger, defender, callBack) => {

    var challengerSocket = connectedUsers[challenger.username];
    var defenderSocket = connectedUsers[defender.username];

    if (!challengerSocket) return callBack('That person has disconnected');
    if (!defenderSocket) return callBack('um wtf');
    if (availableUsers.indexOf(defender.username) == -1) return callBack('ERROR: you arent available');
    if (availableUsers.indexOf(challenger.username) == -1) return callBack('The challenger is busy');

    challengerSocket.join(`${challenger.username}VS${defender.username}`);
    defenderSocket.join(`${challenger.username}VS${defender.username}`);

    io.in(`${challenger.username}VS${defender.username}`).emit('game:starting', challenger, defender);

  })

  socket.on('battleRequest:decline', (challenger, defender, callBack) => {
    var challengerSocket = connectedUsers[challenger.username];
    var defenderSocket = connectedUsers[defender.username];

    if (!challengerSocket) return callBack('That person has disconnected');
    if (!defenderSocket) return callBack('um wtf');

    challengerSocket.emit('battleRequest:decline', (defender));
  })

  socket.on('disconnect', (socket) => {
    if (socket.user) {
      delete connectedUsers[socket.user.username];
    }
    var index = availableUsers.indexOf(socket.user.username)
    if (index !== -1) {
      availableUsers.slice(index, 1);
    }
  })
})

/**
* Base Route
*/
app.get('/', (req, res) => {
  res.send('base route');
})

// start our server
server.listen(config.port, () => {
  console.log('Server started!');
});