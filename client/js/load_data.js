/* global io*/
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
            document.getElementById("most_populair_station").innerHTML += "<li><a class='link' href='/stations?id=" + msg[i].id + "'>" + msg[i].name + "</a></li>";
        }
    });

}

function stations() {
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
            document.getElementById("search_result_container").innerHTML = "<p>This station does not exist</p>"
            return;
        }
        document.getElementById("search_result_container").innerHTML = "<ul id='search_results'></ul>";
        for (var i = 0; i < msg.length && i < 15; i++) {
            document.getElementById("search_results").innerHTML += "<li class='search_result_i' onclick='getStation(" + msg[i].id + ")'><a>" + msg[i].name + "</a></li>";
        }
    });
    document.getElementsByClassName('return_button')[0].style.display = 'none';

}

function lines() {}

function trains() {}

function pastRides() {}

function balance() {}


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
            console.log(msg);
            for (var i = 0; i < msg.length; i++) {
                if (document.getElementById(msg[i].line.toString())) {
                    document.getElementById(msg[i].line.toString() + "_text").innerHTML += "<br><hr><br>";
                    document.getElementById(msg[i].line.toString() + "_text").innerHTML += "<div class='time_container'><div class='time_left'><span class='stress'>Arrival</span> " + msg[i].arrival_hour.toLocaleString('en-UK', { minimumIntegerDigits: 2, useGrouping: false }) + ":" + msg[i].arrival_minute.toLocaleString('en-UK', { minimumIntegerDigits: 2, useGrouping: false }) + "<br>" + "<span class='stress'>Departure</span> " + msg[i].departure_hour.toLocaleString('en-UK', { minimumIntegerDigits: 2, useGrouping: false }) + ":" + msg[i].departure_minute.toLocaleString('en-UK', { minimumIntegerDigits: 2, useGrouping: false }) + "<br>" + "<span class='stress'>Platform</span> " + msg[i].platform.toString() + "</div>" + "<div class='time_right'>To:<br><span class='next_station'>Next station</span></div></div>";
                }
                else {
                    document.getElementById('station_information').innerHTML += "<div id='" + msg[i].line.toString() + "'></div>";
                    document.getElementById(msg[i].line.toString()).innerHTML = "<img src='../images/lines/" + msg[i].line.toString() + ".svg'><p id='" + msg[i].line.toString() + "_text'></p>";
                    document.getElementById(msg[i].line.toString() + "_text").innerHTML += "<div class='time_container'><div class='time_left'><span class='stress'>Arrival</span> " + msg[i].arrival_hour.toLocaleString('en-UK', { minimumIntegerDigits: 2, useGrouping: false }) + ":" + msg[i].arrival_minute.toLocaleString('en-UK', { minimumIntegerDigits: 2, useGrouping: false }) + "<br>" + "<span class='stress'>Departure</span> " + msg[i].departure_hour.toLocaleString('en-UK', { minimumIntegerDigits: 2, useGrouping: false }) + ":" + msg[i].departure_minute.toLocaleString('en-UK', { minimumIntegerDigits: 2, useGrouping: false }) + "<br>" + "<span class='stress'>Platform</span> " + msg[i].platform.toString() + "</div>" + "<div class='time_right'>To:<br><span class='next_station'>Next station</span></div></div>";
                    //document.getElementsByClassName("next_station")[i].innerHTML = "testing";

                }
            }
        }
    });
}

function returnToStations() {
    if (!document.getElementById("search_bar").value) {
        document.getElementById("populair_station_container").style.display = "initial";
    }
    document.getElementById('search_container').style.display = "initial";
    document.getElementById("return_button").style.display = "none";
    document.getElementById("station_information").style.display = "none";
}
