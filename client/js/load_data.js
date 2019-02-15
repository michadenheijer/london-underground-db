/* global io URLSearchParams localStorage*/
var socket = io();

function home() {
    socket.emit('next_three', 'get');
    socket.on('next_three', function(msg) {
        document.getElementById("next_three_loading").remove();
        if (msg == 'error') {
            document.getElementById("next_three").innerHTML = "error";
            return;
        }
        document.getElementById("next_three").innerHTML = "<tr><th>From</th><th>Line</th><th>At</th></tr>";
        for (var i = 0; i < msg.length; i++) {
            document.getElementById("next_three").innerHTML += "<tr><td>" + msg[i].station + "</td><td>" + msg[i].line + "</td><td>" + msg[i].hour.toLocaleString('en-UK', { minimumIntegerDigits: 2, useGrouping: false }) + ":" + msg[i].minute.toLocaleString('en-UK', { minimumIntegerDigits: 2, useGrouping: false }) + "</td>";
        }
    });
    socket.emit('most_populair', 'get');
    socket.on('most_populair', function(msg) {
        document.getElementById("most_populair_station").innerHTML = "";
        if (msg == "error") {
            document.getElementById("most_populair_station").innerHTML = "error";
            return;
        }
        for (var i = 0; i < msg.length; i++) {
            document.getElementById("most_populair_station").innerHTML += "<li><a class='link' href='/app/stations?id=" + msg[i].id + "&return=.'>" + msg[i].name + "</a></li>";
        }
    });

}

function stations() {
    const urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    if (id) {
        getStation(id);
        return;
    }
    socket.emit('most_populair', 'get');
    socket.on('most_populair', function(msg) {
        document.getElementById("most_populair_station").innerHTML = "";
        if (msg == "error") {
            document.getElementById("most_populair_station").innerHTML = "error";
            return;
        }
        for (var i = 0; i < msg.length; i++) {
            document.getElementById("most_populair_station").innerHTML += "<button class='button button__primary' onclick='getStation(" + msg[i].id + ")'>" + msg[i].name + "</button><br>";
        }
    });
    document.getElementById("search_bar").addEventListener("input", function() {
        var search_term = document.getElementById("search_bar").value;
        if (search_term) {
            document.getElementById("populair_station_container").style.display = "none";
            document.getElementById("search_button").style.display = "none";
            document.getElementById("search_result_container").style.display = "inline";
            socket.emit('search_stations', search_term);
        }
        else {
            document.getElementById("populair_station_container").style.display = "initial";
            document.getElementById("search_button").style.display = "initial";
            document.getElementById("search_result_container").style.display = "none";
        }
    });
    socket.on('search_stations', function(msg) {
        if (msg == "error") {
            document.getElementById("search_result_container").innerHTML = "<p>error</p>";
            return;
        }
        if (msg == "nonexistant") {
            document.getElementById("search_result_container").innerHTML = "<p>This station does not exist</p>";
            return;
        }
        document.getElementById("search_result_container").innerHTML = "<ul id='search_results'></ul>";
        for (var i = 0; i < msg.length && i < 15; i++) {
            document.getElementById("search_results").innerHTML += "<li class='search_result_i' onclick='getStation(" + msg[i].id + ")'><a>" + msg[i].name + "</a></li>";
        }
    });
    document.getElementsByClassName('return_button')[0].style.display = 'none';

}

function lines() {
    socket.emit("get_lines", "get");
    socket.on("get_lines", function(msg) {
        document.getElementById('lines').innerHTML = "";
        for (var i = 0; i < msg.length; i++) {
            document.getElementById("lines").innerHTML += "<button class='button button__primary' style='background-color: #" + msg[i].color + "' onclick='getLine(" + msg[i].id + ")'>" + msg[i].name + "</button><br>";
        }
    });
}

function user() {
    var user = { id: localStorage.getItem("user"), password: localStorage.getItem("password") };
    socket.emit("get_balance", user);
    socket.emit("get_trips", user);
    socket.emit("get_personal", user);
    socket.on("wrong_login", function(msg) {
        window.location.replace("/app/login");
    });
    socket.on("get_balance", function(msg) {
        if (msg == "error") {
            document.getElementById("current_balance").innerHTML = "There has been an error, sad.";
            return;
        }
        document.getElementById("current_balance").innerHTML = msg;
    });
    socket.on("get_trips", function(msg) {
        if (msg == "error") {
            document.getElementById("trips_table").innerHTML = "There has been an error, sad";
            return;
        }
        for (var i = 0; i < msg.length; i++) {
            document.getElementById("trips_table").innerHTML += "<tr><td>" + msg[i].departure_station + "</td><td>" + msg[i].arrival_station + "</td><td>£" + msg[i].price + "</td></tr>";
        }
    });
    socket.on("get_personal", function(msg) {
        if (msg == "error") {
            document.getElementById("first").placeholder = "error";
            document.getElementById("second").placeholder = "error";
            document.getElementById("third").placeholder = "error";
            document.getElementById("fourth").placeholder = "error";
            document.getElementById("zip").placeholder = "error";
            return;
        }
        document.getElementById("first").placeholder = msg.first_name;
        document.getElementById("second").placeholder = msg.last_name;
        document.getElementById("third").placeholder = msg.street_address;
        document.getElementById("fourth").placeholder = msg.address_number;
        document.getElementById("zip").placeholder = msg.zip_code;
    });
}

function admin() {
    socket.emit("admin_lines", "admin");
    socket.on("admin_lines", function(msg) {
        document.getElementById("lines").innerHTML = "";
        for (var i = 0; i < msg.length; i++) {
            if (msg[i].color == null) {
                document.getElementById("lines").innerHTML += "<button class='button button__primary' onclick='getLineAdmin(" + msg[i].id + ", \"" + msg[i].name + "\", \"" + msg[i].color + "\")'>" + msg[i].name + "</button><br>";
                continue;
            }
            document.getElementById("lines").innerHTML += "<button class='button button__primary' style='background-color: #" + msg[i].color + "' onclick='getLineAdmin(" + msg[i].id + ", \"" + msg[i].name + "\", \"" + msg[i].color + "\")'>" + msg[i].name + "</button><br>";
        }
    });
}

var serverColor, currentID;

function getLineAdmin(id, name, color) {
    document.getElementById("original").style.display = "none";
    document.getElementById("selected_line").style.display = "inline";
    document.getElementById("selected_line_name").placeholder = name.toString();
    if (!color || color == "null") {
        color = "Select a color";
    }
    serverColor = color;
    currentID = id;
    console.log(color);
    document.getElementById("selected_line_color").value = color;
}

function adminSaveButton() {
    if (document.getElementById("selected_line_name").value) {
        document.getElementById("admin_line").disabled = false;
        return;
    }
    console.log(document.getElementById("selected_line_color").value);
    if (document.getElementById("selected_line_color").value != serverColor) {
        document.getElementById("admin_line").disabled = false;
        return;
    }
    document.getElementById("admin_line").disabled = true;
}

function adminSave() {
    var toSave = { id: "", name: "", color: "" };
    if (document.getElementById("selected_line_color").value != serverColor) {
        toSave.color = document.getElementById("selected_line_color").value;
    }
    toSave.name = document.getElementById("selected_line_name").value;
    if (toSave.name) {
        if (!/^[a-zA-Z]+$/.test(toSave.name)) {
            alert("Name can only contain letters");
            return;
        }
    }
    toSave.id = currentID;
    socket.emit("change_line", toSave);
    document.getElementById("selected_line").style.display = "none";
    document.getElementById("original").style.display = "initial";
    socket.emit("admin_lines", "admin");
    document.getElementById("selected_line_color").value = null;
    document.getElementById("selected_line_name").value = null;
}

function adminReturn() {
    document.getElementById("original").style.display = "initial";
    document.getElementById("selected_line").style.display = "none";
    document.getElementById("selected_line_color").value = null;
    document.getElementById("selected_line_name").value = null;
}

function getStation(id) {
    document.getElementById("search_container").style.display = "none";
    document.getElementById("populair_station_container").style.display = "none";
    document.getElementById("return_button").style.display = "inline";
    socket.emit("get_station_info", id);
    socket.on("get_station_info", function(msg) {
        document.getElementById("station_information").style.display = "inline";
        if (msg.length == 0) {
            document.getElementById('station_information').innerHTML = "<p>There are no trains departing or arriving at this station.</p>";
        }
        else if (msg == "error") {
            document.getElementById('station_information').innerHTML = "<p>There has been an error.</p>";
        }
        else {
            if (msg.length == 1) {
                document.getElementById('station_information').innerHTML = "<p>There is <span class='stress'>one</span> train arriving at this station.";
            }
            else {
                document.getElementById('station_information').innerHTML = "<p>There are <span class='stress'>" + msg.length.toString() + "</span> trains arriving at this station.</p>";
            }
            for (var i = 0; i < msg.length; i++) {
                if (document.getElementById(msg[i].line.toString())) {
                    document.getElementById(msg[i].line.toString() + "_text").innerHTML += "<br><hr><br>";
                    document.getElementById(msg[i].line.toString() + "_text").innerHTML += "<div class='time_container'><div class='time_left'><span class='stress'>Arrival</span> " + msg[i].arrival_hour.toLocaleString('en-UK', { minimumIntegerDigits: 2, useGrouping: false }) + ":" + msg[i].arrival_minute.toLocaleString('en-UK', { minimumIntegerDigits: 2, useGrouping: false }) + "<br>" + "<span class='stress'>Departure</span> " + msg[i].departure_hour.toLocaleString('en-UK', { minimumIntegerDigits: 2, useGrouping: false }) + ":" + msg[i].departure_minute.toLocaleString('en-UK', { minimumIntegerDigits: 2, useGrouping: false }) + "<br>" + "<span class='stress'>Platform</span> " + msg[i].platform.toString() + "</div>" + "<div class='time_right'>To:<br><span class='next_station'><span id='msg" + i.toString() + "'>Loading... </span></span></div></div>";
                }
                else {
                    document.getElementById('station_information').innerHTML += "<div id='" + msg[i].line.toString() + "'></div>";
                    document.getElementById(msg[i].line.toString()).innerHTML = "<img id='img_" + msg[i].line.toString() + "' onerror='showBackup(\"" + msg[i].line.toString() + "\")' src='../images/lines/" + msg[i].line.toString() + ".svg'>" + "<div style='display: none' id='backup_title_" + msg[i].line.toString() + "'><h3>" + msg[i].line.toString() + "</h3></div>" + "<p id='" + msg[i].line.toString() + "_text'></p>";
                    document.getElementById(msg[i].line.toString() + "_text").innerHTML += "<div class='time_container'><div class='time_left'><span class='stress'>Arrival</span> " + msg[i].arrival_hour.toLocaleString('en-UK', { minimumIntegerDigits: 2, useGrouping: false }) + ":" + msg[i].arrival_minute.toLocaleString('en-UK', { minimumIntegerDigits: 2, useGrouping: false }) + "<br>" + "<span class='stress'>Departure</span> " + msg[i].departure_hour.toLocaleString('en-UK', { minimumIntegerDigits: 2, useGrouping: false }) + ":" + msg[i].departure_minute.toLocaleString('en-UK', { minimumIntegerDigits: 2, useGrouping: false }) + "<br>" + "<span class='stress'>Platform</span> " + msg[i].platform.toString() + "</div>" + "<div class='time_right'>To:<br><span class='next_station'><span id='msg" + i.toString() + "'>Loading...</span></span></div></div>";
                    //document.getElementsByClassName("next_station")[i].innerHTML = "testing";

                }
                waitForNext(msg[i].train, msg[i].time_information, i);
            }
        }
    });
}

function showBackup(show) {
    document.getElementById("img_" + show).style.display = "none";
    document.getElementById("backup_title_" + show).style.display = "inline";
}

function returnToStations() {
    const urlParams = new URLSearchParams(window.location.search);
    var pageReturn = urlParams.get('return');
    if (pageReturn) {
        window.location.href = "/app/" + pageReturn;
        return;
    }
    if (!document.getElementById("search_bar").value) {
        document.getElementById("populair_station_container").style.display = "initial";
    }
    document.getElementById('search_container').style.display = "initial";
    document.getElementById("return_button").style.display = "none";
    document.getElementById("station_information").style.display = "none";
}

function waitForNext(train, time, id) {
    socket.on("next_train" + train.toString() + "time" + time.toString(), function(msg) {
        if (msg.length < 1) {
            document.getElementById("msg" + id.toString()).innerHTML = "Last station";
            return;
        }
        document.getElementById("msg" + id.toString()).innerHTML = msg[0].name;
    });
}

function getLine(id) {
    socket.emit("get_line", id);
    socket.on("get_line", function(msg) {
        document.getElementById("lines").style.display = "none";
        document.getElementById("top_information").style.display = "none";
        document.getElementById("line_info").style.display = "inline";
        document.getElementById("line_info").innerHTML = "<h4>Stations connected to this line</h4>";
        for (var i = 0; i < msg.length; i++) {
            document.getElementById("line_info").innerHTML += "<button class='button button__primary' onclick='toStation(" + msg[i].id + ")'>" + msg[i].name + "</button><br>";
        }
        document.getElementById("line_info").innerHTML += "<button onclick='returnLines()' id='return_line_button' class='button button__delete' >Return</button>"
    });
}

function returnLines() {
    document.getElementById("line_info").style.display = "none";
    document.getElementById("lines").style.display = "initial";
    document.getElementById("top_information").style.display = "initial";
    document.getElementById("return_line_button").parentNode.removeChild(document.getElementById("return_line_button"));
}

function toStation(id) {
    window.location.href = "/app/stations?id=" + id.toString() + "&return=lines";
}

function enableSave() {
    for (var i = 0; i < document.getElementById("user_data").elements.length; i++) {
        if (document.getElementById("user_data").elements[i].value) {
            document.getElementById("save_button").disabled = false;
            break;
        }
        if (document.getElementById("user_data").elements.length - 1 == i) {
            document.getElementById("save_button").disabled = true;
        }
    }
}

function topUp() {
    document.getElementById("all_information").style.display = "none";
    document.getElementById("top_up").style.display = "inline";
}

function cancelTopUp() {
    document.getElementById("all_information").style.display = "initial";
    document.getElementById("top_up").style.display = "none";
}

function confirmTopUp() {
    if (document.getElementById("top_up_form").elements[0].value == 0) {
        alert("You have to select an option");
        return;
    }
    document.getElementById("all_information").style.display = "none";
    document.getElementById("top_up").style.display = "none";
    document.getElementById("confirm_top_up").style.display = "inline";
    document.getElementById("top_up_value").innerHTML = document.getElementById("top_up_form").elements[0].value;
    return false;
}

function sendTopUp() {
    var topUpValue = document.getElementById("top_up_form").elements[0].value;
    var toSend = { id: localStorage.getItem("user"), password: localStorage.getItem("password"), top_up: topUpValue };
    socket.emit("top_up", toSend);
    document.getElementById("top_up").style.display = "none";
    document.getElementById("all_information").style.display = "initial";
    document.getElementById("confirm_top_up").style.display = "none";
    socket.on("get_balance", function(msg) {
        if (msg == "error") {
            ocument.getElementById("current_balance").innerHTML = "error";
            return;
        }
        document.getElementById("current_balance").innerHTML = msg;
    });

}

function cancelSendTopUp() {
    document.getElementById("confirm_top_up").style.display = "none";
    document.getElementById("top_up").style.display = "inline";
}

function editUserData() {
    var firstName = document.getElementById("first").value;
    var lastName = document.getElementById("second").value;
    var address = document.getElementById("third").value;
    var number = document.getElementById("fourth").value;
    var zip = document.getElementById("zip").value;
    var query;
    if (/\d/.test(firstName)) {
        alert("First name cannot contain a number");
        return;
    }
    if (/\d/.test(lastName)) {
        alert("Last name cannot contain a number");
        return;
    }
    if (isNaN(number)) {
        alert("Street number has to be a number");
        return;
    }
    if (isValidPostcode(zip)) {
        alert("Invalid zipcode");
        return;
    }
    var user = { id: localStorage.getItem("user"), password: localStorage.getItem("password") };
    socket.emit("edit_user_data", { first: firstName, last: lastName, address: address, number: number, zip: zip, user: user });
    socket.on("get_personal", function(msg) {
        if (msg == "error") {
            console.log("error");
            return;
        }
        document.getElementById("first").placeholder = msg.first_name;
        document.getElementById("second").placeholder = msg.last_name;
        document.getElementById("third").placeholder = msg.street_address;
        document.getElementById("fourth").placeholder = msg.address_number;
        document.getElementById("zip").placeholder = msg.zip_code;
        document.getElementById("first").value = null;
        document.getElementById("second").value = null;
        document.getElementById("third").value = null;
        document.getElementById("fourth").value = null;
        document.getElementById("zip").value = null;
        enableSave();
        document.getElementById("save_button").innerHTML = "Changing your personal information....";
        setTimeout(function() {
            document.getElementById("save_button").innerHTML = "Saved....";
            setTimeout(function() {
                document.getElementById("save_button").innerHTML = "Save";
            }, 1000);
        }, 2000);
    });
    socket.emit("get_personal", user);
}

function logOut() {
    var logOut = { id: null, password: null };
    localStorage.setItem('user', logOut.id);
    localStorage.setItem('password', logOut.password);
    window.location.href = "/app/"
}

function logIn() {
    console.log("Example login:", "User: 1", "Password: password");
    if (!document.getElementById("cardnumber").value) {
        document.getElementById("login_button").classList.add("button__delete");
        document.getElementById("login_button").classList.remove("button_accent");
        document.getElementById("login_button").innerHTML = "You must enter your cardnumber";
        setTimeout(function() {
            document.getElementById("login_button").innerHTML = "Log in";
            document.getElementById("login_button").classList.remove("button__delete");
            document.getElementById("login_button").classList.add("button_accent");
        }, 2000);
        return;
    }
    if (!document.getElementById("password").value) {
        document.getElementById("login_button").classList.add("button__delete");
        document.getElementById("login_button").classList.remove("button_accent");
        document.getElementById("login_button").innerHTML = "You must enter your password";
        setTimeout(function() {
            document.getElementById("login_button").innerHTML = "Log in";
            document.getElementById("login_button").classList.remove("button__delete");
            document.getElementById("login_button").classList.add("button_accent");
        }, 2000);
        return;
    }
    localStorage.setItem('user', document.getElementById("cardnumber").value);
    localStorage.setItem('password', document.getElementById("password").value);
    var user = { user: localStorage.getItem("user"), password: localStorage.getItem("password") };
    socket.emit("login_user", user);
    socket.on("login_user", function(msg) {
        console.log("Yeah this is just to make it simple and to be able to give an easy error when you use the wrong password. If you try just going to the page and removing some stuff, it wont work, you need the user_id and password for every request, but it's probably easy to hack. This redirect is here because of websockets. I know that saving the password locally isn't smart but creating extra stuff to make it more secure is just to much work");
        if (msg == true) {
            window.location.href = "/app/user";
        }
        if (msg == false) {
            document.getElementById("login_button").classList.add("button__delete");
            document.getElementById("login_button").classList.remove("button_accent");
            document.getElementById("login_button").innerHTML = "Wrong password try again";
            setTimeout(function() {
                document.getElementById("login_button").innerHTML = "Log in";
                document.getElementById("login_button").classList.remove("button__delete");
                document.getElementById("login_button").classList.add("button_accent");
            }, 2000);
        }
    });

}

function createAccount() {
    if (!document.getElementById("cardnumber").value) {
        document.getElementById("create_button").classList.add("button__delete");
        document.getElementById("create_button").classList.remove("button_accent");
        document.getElementById("create_button").innerHTML = "You must enter your card id";
        setTimeout(function() {
            document.getElementById("create_button").innerHTML = "Create account";
            document.getElementById("create_button").classList.remove("button__delete");
            document.getElementById("create_button").classList.add("button_accent");
        }, 2000);
        return;
    }
    if (isNaN(document.getElementById("cardnumber").value)) {
        document.getElementById("create_button").classList.add("button__delete");
        document.getElementById("create_button").classList.remove("button_accent");
        document.getElementById("create_button").innerHTML = "Your card id must be a number";
        setTimeout(function() {
            document.getElementById("create_button").innerHTML = "Create account";
            document.getElementById("create_button").classList.remove("button__delete");
            document.getElementById("create_button").classList.add("button_accent");
        }, 2000);
        return;
    }
    if (!document.getElementById("zipcode").value) {
        document.getElementById("create_button").classList.add("button__delete");
        document.getElementById("create_button").classList.remove("button_accent");
        document.getElementById("create_button").innerHTML = "You must enter your zip code";
        setTimeout(function() {
            document.getElementById("create_button").innerHTML = "Create account";
            document.getElementById("create_button").classList.remove("button__delete");
            document.getElementById("create_button").classList.add("button_accent");
        }, 2000);
        return;
    }
    if (isValidPostcode(document.getElementById("zipcode").value)) {
        document.getElementById("create_button").classList.add("button__delete");
        document.getElementById("create_button").classList.remove("button_accent");
        document.getElementById("create_button").innerHTML = "You must enter a valid zip code";
        setTimeout(function() {
            document.getElementById("create_button").innerHTML = "Create account";
            document.getElementById("create_button").classList.remove("button__delete");
            document.getElementById("create_button").classList.add("button_accent");
        }, 2000);
        return;
    }
    if (!document.getElementById("password").value) {
        document.getElementById("create_button").classList.add("button__delete");
        document.getElementById("create_button").classList.remove("button_accent");
        document.getElementById("create_button").innerHTML = "You must enter a password";
        setTimeout(function() {
            document.getElementById("create_button").innerHTML = "Create account";
            document.getElementById("create_button").classList.remove("button__delete");
            document.getElementById("create_button").classList.add("button_accent");
        }, 2000);
        return;
    }
    var newUser = { user: document.getElementById("cardnumber").value, zip: document.getElementById("zipcode").value, password: document.getElementById("password").value };
    socket.emit("create_user", newUser);
    socket.on("create_user", function(msg) {
        if (msg === true) {
            localStorage.setItem('user', newUser.user);
            localStorage.setItem('password', newUser.password);
            window.location.href = "/app/user";
            return;
        }
        document.getElementById("create_button").classList.add("button__delete");
        document.getElementById("create_button").classList.remove("button_accent");
        document.getElementById("create_button").innerHTML = msg;
        setTimeout(function() {
            document.getElementById("create_button").innerHTML = "Create account";
            document.getElementById("create_button").classList.remove("button__delete");
            document.getElementById("create_button").classList.add("button_accent");
        }, 4000);
    });
}
var clicks = 0;

function deleteAccount() {
    clicks++;
    if (clicks == 1) {
        document.getElementById("delete_account").innerHTML = "If you delete your account you won't be able to see it's balance, your trips, and your personal information. Are you sure you want to delete it? <br> Click this button to delete.";
        setTimeout(function() {
            document.getElementById("delete_account").innerHTML = "Delete my account";
            clicks = 0;
        }, 7500);
    }
    if (clicks > 1) {
        var user = { id: localStorage.getItem('user'), password: localStorage.getItem('password') };
        socket.emit("delete_account", user);
    }
    socket.on("delete_account", function(msg) {
        if (msg === true) {
            window.location.href = "/app/";
            return;
        }
        document.getElementById("delete_account").innerHTML = msg;
    });

}

function isValidPostcode(p) {
    if (p.length == 0) { return false; }
    var postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i;
    return !postcodeRegEx.test(p);
}
