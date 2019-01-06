module.exports = {
    zones: "SELECT * FROM zones;",
    next_leaving_trains: 'SELECT stations.name AS station, line_names.name AS line, departure_hour AS hour, departure_minute AS minute FROM time JOIN stations ON time.station_id = stations.id JOIN line_names ON line_names.id = time.line_id WHERE arrival_year >= ' + (new Date()).getFullYear().toString() + ' ORDER BY arrival_year, arrival_month, arrival_day, departure_hour, departure_minute LIMIT 3;',
    most_populair_station: 'SELECT stations.id, stations.name FROM journeys JOIN stations ON stations.id = journeys.departure_station_id GROUP BY departure_station_id ORDER BY COUNT(departure_station_id) DESC LIMIT 5;',
    lines: 'SELECT * FROM line_names;'
};
