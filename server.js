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

const nextStation = function(train_id, time_id, year, month, day, hour, minute, callback) {
  try {
    con.query('SELECT stations.name FROM time JOIN stations ON stations.id = time.station_id WHERE train_id = ' + train_id.toString() + ' AND UNIX_TIMESTAMP(CONCAT(arrival_year, "-", arrival_month, "-", arrival_day," ",  MAKETIME(arrival_hour, arrival_minute, 0))) < UNIX_TIMESTAMP(CONCAT(' + year.toString() + ' , "-", ' + month.toString() + ' , "-",' + day.toString() + ' , " ", MAKETIME(' + hour.toString() + ' , ' + minute.toString() + ' , 0))) LIMIT 1;', function(err, rows, fields) {
      if (err) {
        callback(err);
      }
      callback(null, rows, train_id, time_id);
    });
  }
  catch (err) {
    callback(err);
  }
};

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
    try {
      if (!msg) { return }
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
    }
    catch (err) { return }
  });

  //give more station information
  socket.on('get_station_info', function(msg) {
    try {
      if (!msg) { return }
      con.query('SELECT trains.id AS train, time.id AS time_information, line_names.name AS line, station_lines.platform, arrival_year, arrival_month, arrival_day, arrival_hour, arrival_minute, departure_hour, departure_minute, trains.manufacturer, trains.type FROM time JOIN line_names ON time.line_id = line_names.id JOIN trains ON time.train_id = trains.id JOIN station_lines ON station_lines.line_id = time.line_id AND station_lines.station_id = time.station_id WHERE time.station_id = ' + msg.toString() + ';', function(err, rows, fields) {
        if (err) {
          socket.emit('get_station_info', 'error');
          return;
        }
        socket.emit('get_station_info', rows);
        for (var i = 0; i < rows.length; i++) {
          nextStation(rows[i].train, rows[i].time_information, rows[i].arrival_year, rows[i].arrival_month, rows[i].arrival_day, rows[i].arrival_hour, rows[i].arrival_minute, function(err, returnedStation, train, time) {
            if (err) {
              console.log(err);
              return;
            }
            socket.emit("next_train" + train.toString() + "time" + time.toString(), returnedStation);
          });
        }
      });
    }
    catch (err) { return }
  });

  socket.on('get_lines', function(msg) {
    con.query('SELECT id, name, color FROM line_names', function(err, rows, fields) {
      if (err) {
        console.error(err);
        return;
      }
      socket.emit("get_lines", rows);
    });
  });
  socket.on("get_line", function(msg) {
    try {
      con.query('SELECT stations.id, stations.name FROM station_lines JOIN stations ON stations.id = station_lines.station_id WHERE line_id = ' + msg + ';', function(err, rows, fields) {
        if (err) {
          console.error(err);
          return;
        }
        socket.emit("get_line", rows);
      });
    }
    catch (err) { return }
  });
  socket.on("get_balance", function(msg) {
    checkPassword(msg.id, msg.password, function(err, loggedIn) {
      if (err) {
        socket.emit("get_balance", "error");
        return;
      }
      if (!loggedIn) {
        socket.emit("wrong_login", "wrong");
        return;
      }
      getBalance(msg.id, function(err, balance) {
        if (err) { socket.emit("error"); }
        socket.emit("get_balance", balance);
      });
    });
  });
  socket.on("get_trips", function(msg) {
    checkPassword(msg.id, msg.password, function(err, loggedIn) {
      if (err) { socket.emit("get_trips", "error"); return }
      if (!loggedIn) { socket.emit("wrong_password", "wrong"); return }
      getTrips(msg.id, function(err, trips) {
        if (err) { socket.emit("get_trips", "error"); return }
        socket.emit("get_trips", trips);
      });
    });
  });
  socket.on("get_personal", function(msg) {
    checkPassword(msg.id, msg.password, function(err, loggedIn) {
      if (err) { socket.emit("get_personal", "error"); return }
      if (!loggedIn) { socket.emit("wrong_password", "wrong"); return }
      getPersonal(msg.id, function(err, personal) {
        if (err) { socket.emit("get_personal", "error"); return }
        socket.emit("get_personal", personal);
      });
    });
  });
  socket.on("top_up", function(msg) {
    checkPassword(msg.id, msg.password, function(err, loggedIn) {
      if (err) { return }
      if (!loggedIn) { return }
      con.query("INSERT INTO payments (passenger_id, payment, payment_method) VALUES (" + msg.id + ", " + msg.top_up + ", 'website');", function(err, rows, fields) {
        if (err) { return }
        getBalance(msg.id, function(err, balance) {
          if (err) { return }
          socket.emit("get_balance", balance);
        });
      });
    });
  });
  socket.on("edit_user_data", function(msg) {
    checkPassword(msg.user.id, msg.user.password, function(err, loggedIn) {
      if (err) { return }
      if (!loggedIn) { return }
      if (msg.first) {
        con.query("UPDATE passengers SET first_name = '" + msg.first + "' WHERE id=" + msg.user.id + ";", function(err, rows, fields) {
          if (err) { return }
        });
      }
      if (msg.last) {
        con.query("UPDATE passengers SET last_name = '" + msg.last + "' WHERE id=" + msg.user.id + ";", function(err, rows, fields) {
          if (err) { return }
        });
      }
      if (msg.address) {
        con.query("UPDATE passengers SET street_address = '" + msg.address + "' WHERE id=" + msg.user.id + ";", function(err, rows, fields) {
          if (err) { return }
        });
      }
      if (msg.number) {
        con.query("UPDATE passengers SET address_number = '" + msg.number + "' WHERE id=" + msg.user.id + ";", function(err, rows, fields) {
          if (err) { return }
        });
      }
      if (msg.zip) {
        con.query("UPDATE passengers SET zip_code = '" + msg.zip + "' WHERE id=" + msg.user.id + ";", function(err, rows, fields) {
          if (err) { return }
        });
      }
    });
  });
  socket.on("train_info", function(msg) {
    try {
      con.query('select trains.id, line_names.name, manufacturer, type from trains join line_names on line_id=line_names.id;', function(err, rows, fields) {
        if (err) { return }
        socket.emit("train_info", rows);
      });
    }
    catch (err) {
      return;
    }
  });
  socket.on("login_user", function(msg) {
    try {
      checkPassword(msg.user, msg.password, function(err, loggedIn) {
        if (err) {
          socket.emit("login_user", false);
          return;
        }
        if (!loggedIn) {
          socket.emit('login_user', false);
          return;
        }
        socket.emit('login_user', true);
      });
    }
    catch (err) {
      socket.emit("login_user", false)
    }
  });
  socket.on("create_user", function(msg) {
    var user, zip, password;
    try {
      user = msg.user;
      zip = msg.zip;
      password = msg.password;
    }
    catch (err) {
      socket.emit("create_user", "Not all required fields are submitted");
      return;
    }
    createUser(msg.user, msg.zip, msg.password, function(created, error) {
      if (created) {
        socket.emit("create_user", true);
        return;
      }
      socket.emit('create_user', error);
    });
  });
  socket.on("admin_lines", function(msg) {
    if (!msg) { socket.emit("admin_lines", "error"); return }
    if (!msg == "admin") { socket.emit("admin_lines", "wrong_password"); return }
    try {
      con.query("SELECT id, name, color FROM line_names;", function(err, rows, fields) {
        if (err) { socket.emit("admin_lines", "error"); return }
        socket.emit("admin_lines", rows);
      });
    }
    catch (err) {
      socket.emit("admin_lines", "error");
    }
  });
  socket.on("change_line", function(msg) {
    if (!msg) {
      socket.emit("change_line", "error");
    }
    var id, name, color;
    try {
      id = msg.id;
      name = msg.name;
      color = msg.color;
    }
    catch (err) {
      socket.emit("change_line", "error");
      return;
    }
    try {
      if (msg.name) {
        con.query('UPDATE line_names SET name="' + msg.name.toString() + '" WHERE id=' + msg.id.toString() + ';', function(err, rows, fields) {
          if (err) { return }
        });
      }
      if (msg.color) {
        con.query('UPDATE line_names SET color="' + msg.color.toString() + '" WHERE id=' + msg.id.toString() + ';', function(err, rows, fields) {
          if (err) { return }
        });
      }
    }
    catch (err) {
      return;
    }
  });
  socket.on("delete_account", function(msg) {
    try {
      var user = msg.id;
      var password = msg.password;
      checkPassword(user, password, function(err, loggedIn) {
        if (err) {
          socket.emit("delete_account", "Something went wrong");
          return;
        }
        if (!loggedIn) {
          socket.emit("delete_account", "You haven't been logged in, could write code that could check, but I dont.");
          return;
        }
        con.query('DELETE FROM users WHERE passenger_id = ' + user.toString() + ";", function(err, rows, fields) {
          if (err) {
            socket.emit("delete_account", "failed");
            return;
          }
          socket.emit("delete_account", true);
        });
      });
    }
    catch (err) {
      socket.emit("delete_account", "Not all required information");
    }
  });
});


//Load all the pages
app.use(compression());
app.use(express.static('client', { extensions: ['html'], maxAge: 86400 }));

const getBalance = function(userId, callback) {
  con.query('select sum(payment) as balance from payments where passenger_id = ' + userId.toString() + ';', function(err, rows, fields) {
    if (err) {
      callback(err);
    }
    con.query('SELECT SUM(cost.price) AS cost FROM journeys      JOIN stations AS departure     ON journeys.departure_station_id = departure.id     JOIN stations AS arrival     ON journeys.arrival_station_id = arrival.id     JOIN zones AS departure_zone     ON departure.zone_id = departure_zone.id     JOIN zones AS arrival_zone     ON arrival.zone_id = arrival_zone.id     JOIN zone_price AS cost         ON departure.zone_id =          CASE             WHEN departure.zone_id < arrival.zone_id             THEN cost.begin_zone_id             ELSE cost.end_zone_id             END         AND arrival.zone_id =          CASE             WHEN departure.zone_id > arrival.zone_id             THEN cost.begin_zone_id             ELSE cost.end_zone_id             END     WHERE journeys.passenger_id=' + userId.toString() + '     ORDER BY journeys.id;', function(err, data) {
      if (err) {
        callback(err);
      }
      var balance = rows[0].balance - data[0].cost;
      callback(null, balance);
    });
  });
};

const getTrips = function(userId, callback) {
  try {
    con.query('SELECT departure.name AS departure_station, arrival.name AS arrival_station, cost.price FROM journeys JOIN stations AS departure ON journeys.departure_station_id = departure.id JOIN stations AS arrival ON journeys.arrival_station_id = arrival.id JOIN zones AS departure_zone ON departure.zone_id = departure_zone.id JOIN zones AS arrival_zone ON arrival.zone_id = arrival_zone.id JOIN zone_price AS cost ON departure.zone_id = CASE WHEN departure.zone_id < arrival.zone_id THEN cost.begin_zone_id ELSE cost.end_zone_id END AND arrival.zone_id = CASE WHEN departure.zone_id > arrival.zone_id THEN cost.begin_zone_id ELSE cost.end_zone_id END WHERE journeys.passenger_id =' + userId.toString() + ' ORDER BY journeys.id LIMIT 5;', function(err, rows, fields) {
      if (err) {
        callback(err);
      }
      callback(null, rows);
    })
  }
  catch (err) {
    callback(err);
  }
}

const checkPassword = function(userId, password, callback) {
  if (!userId) {
    callback(null, false);
    return;
  }
  if (!password) {
    callback(null, false);
    return;
  }
  try {
    con.query('SELECT password FROM users WHERE passenger_id = ' + userId.toString() + ";", function(err, rows, fields) {
      try {
        if (err) {
          callback(err);
        }
        if (!rows) {
          callback(null, false);
          return;
        }
        if (password != rows[0].password) {
          callback(null, false);
          return;
        }
        callback(null, true);
      }
      catch (err) {
        callback(null, false);
      }
    });
  }
  catch (err) {
    callback(null, false);
  }
};

const getPersonal = function(userId, callback) {
  try {
    con.query('SELECT first_name, last_name, street_address, address_number, zip_code FROM passengers WHERE id=' + userId.toString() + ';', function(err, rows, fields) {
      if (err) {
        callback(err)
      }
      callback(null, rows[0]);
    })
  }
  catch (err) {
    callback(err);
  }
}

const createUser = function(userId, zipCode, password, callback) {
  if (!userId) {
    callback(false, "No userId given");
    return;
  }
  if (!zipCode) {
    callback(false, "No zipcode given");
    return;
  }
  if (!password) {
    callback(false, "No password given");
    return;
  }
  con.query('SELECT passenger_id FROM users WHERE passenger_id = ' + userId.toString() + ';', function(err, rows, fields) {
    if (err) {
      callback(false, "Server Error");
      return;
    }
    try {
      var user = rows[0].passenger_id;
      callback(false, "There's already an account for your card");
    }
    catch (err) {
      con.query('SELECT zip_code FROM passengers WHERE id = ' + userId.toString() + ';', function(err, rows, fields) {
        if (err) {
          callback(false, "Server Error");
          return;
        }
        try {
          if (rows[0].zip_code == zipCode) {
            con.query('INSERT INTO users (passenger_id, password) VALUES (' + userId + ', "' + password.toString() + '");', function(err, rows, fields) {
              if (err) {
                callback(false, "Server Error");
                return;
              }
              callback(true);
            });
          }
        }
        catch (err) {
          callback(false, "Card doesn't exist");
          return;
        }
      });
    }
  });
};

//Open the server
http.listen(8080, function() {
  console.log('App is running at: https://not-php-michabeste.c9users.io');
});
