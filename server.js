const mysql = require('mysql');
const express = require('express');
const compression = require('compression');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var queries = require('./queries');

console.log("started server");
var con = mysql.createConnection({
  host: "localhost",
  user: "nodejs",
  password: "",
  database: "underground"
});

io.on('connection', function(socket) {
  //get zones
  socket.on('zones', function(msg) {
    con.query(queries.zones, function(err, rows, fields) {
      if (err) {
        socket.emit('zones', 'error');
        return;
      }
      socket.emit('zones', rows);
    });
  });

  //get next three
  socket.on('next_three', function(msg) {
    con.query(queries.next_leaving_trains, function(err, rows, fields) {
      if (err) {
        socket.emit('next_three', "error");
        console.log(err);
        return;
      }
      socket.emit('next_three', rows);
    });
  });

  //get most popular stations
  socket.on('most_populair', function(msg) {
    con.query(queries.most_populair_station, function(err, rows, fiels) {
      if (err) {
        socket.emit('most_populair', 'error');
        return;
      }
      socket.emit('most_populair', rows);
    });
  });

  //respond with for search
  socket.on('search_stations', function(msg) {
    con.query('SELECT id, name FROM stations WHERE name LIKE "%' + msg.replace(/[^a-z0-9 ]/gi, '') + '%" LIMIT 5', function(err, rows, fields) {
      if (err) {
        socket.emit('search_stations', 'error');
        return;
      }
      if (rows.length == 0) {
        socket.emit('search_stations', 'nonexistant');
        return;
      }
      socket.emit('search_stations', rows);
    });
  });

  //give more station information
  socket.on('get_station_info', function(msg) {
    con.query('SELECT line_names.name AS line, station_lines.platform, arrival_hour, arrival_minute, departure_hour, departure_minute, trains.manufacturer, trains.type FROM time JOIN line_names ON time.line_id = line_names.id JOIN trains ON time.train_id = trains.id JOIN station_lines ON station_lines.line_id = time.line_id AND station_lines.station_id = time.station_id WHERE time.station_id = ' + msg.toString() + ';', function(err, rows, fields) {
      if (err) {
        socket.emit('get_station_info', 'error');
        return;
      }
      socket.emit('get_station_info', rows);
    });
  });
});

//Load all the pages
app.use(compression());
app.use(express.static('client', { extensions: ['html'] }));


//Open the server
http.listen(8080, function() {
  console.log('Server is running... (port 8080)');
});
