CREATE TABLE stations (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    zone_id INTEGER);

INSERT INTO stations (name, zone_id) VALUES ("King's Cross St Pancras", 1);
INSERT INTO stations (name, zone_id) VALUES ("Waterloo", 1);
INSERT INTO stations (name, zone_id) VALUES ("Oxford Circus", 1);
INSERT INTO stations (name, zone_id) VALUES ("Victoria", 1);
INSERT INTO stations (name, zone_id) VALUES ("London Bridge", 1);
INSERT INTO stations (name, zone_id) VALUES ("Liverpool Street", 2);
INSERT INTO stations (name, zone_id) VALUES ("Stratford", 2);
INSERT INTO stations (name, zone_id) VALUES ("Bank", 2);
INSERT INTO stations (name, zone_id) VALUES ("Monument", 2);
INSERT INTO stations (name, zone_id) VALUES ("Canary Wharf", 2);
INSERT INTO stations (name, zone_id) VALUES ("Paddington", 3);
INSERT INTO stations (name, zone_id) VALUES ("Euston", 3);
INSERT INTO stations (name, zone_id) VALUES ("Tottenham Court Road", 3);
INSERT INTO stations (name, zone_id) VALUES ("Piccadilly Circus", 3);
INSERT INTO stations (name, zone_id) VALUES ("Green Park", 3);
INSERT INTO stations (name, zone_id) VALUES ("Bond Street", 4);
INSERT INTO stations (name, zone_id) VALUES ("Seven Sisters", 4);
INSERT INTO stations (name, zone_id) VALUES ("South Kensington", 4);
INSERT INTO stations (name, zone_id) VALUES ("Brixton", 4);
INSERT INTO stations (name, zone_id) VALUES ("Holborn", 4);
INSERT INTO stations (name, zone_id) VALUES ("Finsbury Park", 5);
INSERT INTO stations (name, zone_id) VALUES ("Vauxhall", 5);
INSERT INTO stations (name, zone_id) VALUES ("Highbury & Islington", 5);
INSERT INTO stations (name, zone_id) VALUES ("Baker Street", 5);
INSERT INTO stations (name, zone_id) VALUES ("North Greenwich", 5);
INSERT INTO stations (name, zone_id) VALUES ("Moorgate", 6);
INSERT INTO stations (name, zone_id) VALUES ("Southwark", 6);
INSERT INTO stations (name, zone_id) VALUES ("Westminster", 6);
INSERT INTO stations (name, zone_id) VALUES ("Shepherd's Bush", 6);

CREATE TABLE zones (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name TEXT);

INSERT INTO zones (name) VALUES ("City Centre");
INSERT INTO zones (name) VALUES ("Near Centre");
INSERT INTO zones (name) VALUES ("Close to Centre");
INSERT INTO zones (name) VALUES ("Residential zone");
INSERT INTO zones (name) VALUES ("Near Londen");
INSERT INTO zones (name) VALUES ("Pretty much not Londen");
    
CREATE TABLE zone_price (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    begin_zone_id INTEGER,
    end_zone_id INTEGER,
    price INTEGER);
    
INSERT INTO zone_price (begin_zone_id, end_zone_id, price) VALUES (1, 1, 2.2);
INSERT INTO zone_price (begin_zone_id, end_zone_id, price) VALUES (1, 2, 2.8);
INSERT INTO zone_price (begin_zone_id, end_zone_id, price) VALUES (1, 3, 3.2);
INSERT INTO zone_price (begin_zone_id, end_zone_id, price) VALUES (1, 4, 3.8);
INSERT INTO zone_price (begin_zone_id, end_zone_id, price) VALUES (1, 5, 4.6);
INSERT INTO zone_price (begin_zone_id, end_zone_id, price) VALUES (1, 6, 5);
INSERT INTO zone_price (begin_zone_id, end_zone_id, price) VALUES (2, 2, 1.6);
INSERT INTO zone_price (begin_zone_id, end_zone_id, price) VALUES (2, 3, 1.6);
INSERT INTO zone_price (begin_zone_id, end_zone_id, price) VALUES (2, 4, 2.3);
INSERT INTO zone_price (begin_zone_id, end_zone_id, price) VALUES (2, 5, 2.7);
INSERT INTO zone_price (begin_zone_id, end_zone_id, price) VALUES (2, 6, 2.7);
INSERT INTO zone_price (begin_zone_id, end_zone_id, price) VALUES (3, 3, 1.6);
INSERT INTO zone_price (begin_zone_id, end_zone_id, price) VALUES (3, 4, 1.6);
INSERT INTO zone_price (begin_zone_id, end_zone_id, price) VALUES (3, 5, 2.3);
INSERT INTO zone_price (begin_zone_id, end_zone_id, price) VALUES (3, 6, 2.7);
INSERT INTO zone_price (begin_zone_id, end_zone_id, price) VALUES (4, 4, 1.6);
INSERT INTO zone_price (begin_zone_id, end_zone_id, price) VALUES (4, 5, 1.6);
INSERT INTO zone_price (begin_zone_id, end_zone_id, price) VALUES (4, 6, 2.3);
INSERT INTO zone_price (begin_zone_id, end_zone_id, price) VALUES (5, 6, 1.6);
INSERT INTO zone_price (begin_zone_id, end_zone_id, price) VALUES (6, 6, 1.6);

   
CREATE TABLE line_names (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    color TEXT);
    
INSERT INTO line_names (name) VALUES ("Bakerloo");
INSERT INTO line_names (name) VALUES ("Central");
INSERT INTO line_names (name) VALUES ("Circle");
INSERT INTO line_names (name) VALUES ("Jubilee");
INSERT INTO line_names (name) VALUES ("Victoria");
INSERT INTO line_names (name) VALUES ("Metropolitan");

CREATE TABLE station_lines (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    station_id INTEGER,
    line_id INTEGER,
    platform INTEGER);
    
INSERT INTO station_lines (station_id, line_id, platform) VALUES (1, 3, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (1, 5, 2);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (1, 6, 2);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (2, 1, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (2, 4, 2);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (3, 1, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (3, 2, 2);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (3, 5, 3);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (4, 3, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (4, 5, 2);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (5, 4, 2);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (6, 2, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (6, 3, 2);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (6, 6, 3);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (7, 2, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (7, 4, 2);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (8, 2, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (9, 3, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (10, 4, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (11, 3, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (12, 5, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (13, 2, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (14, 1, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (15, 4, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (15, 5, 2);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (16, 2, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (16, 4, 2);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (17, 5, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (18, 4, 3);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (19, 5, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (20, 2, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (21, 5, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (22, 5, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (23, 5, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (24, 1, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (24, 3, 2);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (24, 4, 3);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (24, 6, 4);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (25, 4, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (26, 3, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (26, 6, 2);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (27, 4, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (28, 3, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (28, 4, 1);
INSERT INTO station_lines (station_id, line_id, platform) VALUES (29, 2, 1);

    
CREATE TABLE trains (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    line_id INTEGER,
    manufacturer TEXT,
    type TEXT);
    
INSERT INTO trains (line_id, manufacturer, type) VALUES (1, "Metro Cammell", "1972MkII Tube Stock");
INSERT INTO trains (line_id, manufacturer, type) VALUES (1, "Metro Cammell", "1972MkII/D Tube Stock");
INSERT INTO trains (line_id, manufacturer, type) VALUES (1, "Metro Cammell", "1972MkII Tube Stock");
INSERT INTO trains (line_id, manufacturer, type) VALUES (1, "Metro Cammell", "1972MkII Tube Stock");
INSERT INTO trains (line_id, manufacturer, type) VALUES (2, "British Rail Engineering Limited", "1992 ATO Tube Stock");
INSERT INTO trains (line_id, manufacturer, type) VALUES (2, "British Rail Engineering Limited", "1992 ATO Tube Stock");
INSERT INTO trains (line_id, manufacturer, type) VALUES (2, "British Rail Engineering Limited", "1992 ATP Tube Stock");
INSERT INTO trains (line_id, manufacturer, type) VALUES (2, "British Rail Engineering Limited", "1992 ATP Tube Stock");
INSERT INTO trains (line_id, manufacturer, type) VALUES (3, "Bombardier Transportation", "S7 Stock");
INSERT INTO trains (line_id, manufacturer, type) VALUES (3, "Bombardier Transportation", "S7 Stock");
INSERT INTO trains (line_id, manufacturer, type) VALUES (3, "Bombardier Transportation", "S8 Stock");
INSERT INTO trains (line_id, manufacturer, type) VALUES (3, "Bombardier Transportation", "S8 Stock");
INSERT INTO trains (line_id, manufacturer, type) VALUES (4, "Alsthom", "1996 Stock");
INSERT INTO trains (line_id, manufacturer, type) VALUES (4, "Alsthom", "1996 Stock");
INSERT INTO trains (line_id, manufacturer, type) VALUES (5, "Bombardier Transportation", "2009 Stock");
INSERT INTO trains (line_id, manufacturer, type) VALUES (5, "Bombardier Transportation", "2009 Stock");
INSERT INTO trains (line_id, manufacturer, type) VALUES (6, "Bombardier Transportation", "S8 Stock");
INSERT INTO trains (line_id, manufacturer, type) VALUES (6, "Bombardier Transportation", "S8 Stock");
INSERT INTO trains (line_id, manufacturer, type) VALUES (6, "Bombardier Transportation", "S8 Stock");
INSERT INTO trains (line_id, manufacturer, type) VALUES (6, "Bombardier Transportation", "S8 Stock");

CREATE TABLE passengers (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name TEXT,
    last_name TEXT,
    street_address TEXT,
    address_number INTEGER,
    zip_code TEXT);

INSERT INTO passengers (first_name, last_name, street_address, address_number, zip_code) VALUES ("Micha", "den Heijer", "FakeStreet", 68, "ZIP1 89D");
INSERT INTO passengers (first_name, last_name, street_address, address_number, zip_code) VALUES ("Micha", "Honeycutt", "Holburn Lane", 16, "HU12 0TE");
INSERT INTO passengers (first_name, last_name, street_address, address_number, zip_code) VALUES ("Avery", "Begay", "Cunnery Rd", 17, "MK18 7JE");
INSERT INTO passengers (first_name, last_name, street_address, address_number, zip_code) VALUES ("James", "Wooten", "Baldock Street", 34, "YO30 3FU");
INSERT INTO passengers (first_name, last_name, street_address, address_number, zip_code) VALUES ("Donald", "Aragon", "Southern Way", 56, "TA6 8NG");
INSERT INTO passengers (first_name, last_name, street_address, address_number, zip_code) VALUES ("Kelly", "Tate", "Kent Street", 56, "IP7 2NA");
INSERT INTO passengers (first_name, last_name, street_address, address_number, zip_code) VALUES ("Donald", "Carroll", "Ballifeary Road", 40, "IV27 4BP");
INSERT INTO passengers (first_name, last_name, street_address, address_number, zip_code) VALUES ("Robin", "Mauldin", "Nottingham Rd", 82, "DT3 1WF");
INSERT INTO passengers (first_name, last_name, street_address, address_number, zip_code) VALUES ("Denise", "Dove", "Nottingham Rd", 95, "SY16 4BQ");
INSERT INTO passengers (first_name, last_name, street_address, address_number, zip_code) VALUES ("Deborah", "Luciano", "St Andrews Lane", 31, "HS2 7TG");
INSERT INTO passengers (first_name, last_name, street_address, address_number, zip_code) VALUES ("Emma", "Mitchell", "Fraserburgh Rd", 13, "TD9 9DE");
INSERT INTO passengers (first_name, last_name, street_address, address_number, zip_code) VALUES ("Joe", "Heater", "Thompsons Lane", 9, "IP23 5RH");
INSERT INTO passengers (first_name, last_name, street_address, address_number, zip_code) VALUES ("Heather", "Parrish", "FakeStreet", 68, "ZIP89D");
INSERT INTO passengers (first_name, last_name, street_address, address_number, zip_code) VALUES ("Micha", "den Heijer", "Warren St", 18, "WF4 9EH");
INSERT INTO passengers (first_name, last_name, street_address, address_number, zip_code) VALUES ("John", "Rothenberg", "Winchester Rd", 96, "TA5 3TH");
INSERT INTO passengers (first_name, last_name, street_address, address_number, zip_code) VALUES ("Rita", "Escobar", "Marcham Road", 25, "SO30 2LY");
INSERT INTO passengers (first_name, last_name, street_address, address_number, zip_code) VALUES ("Newton", "Navarro", "Walwyn Rd", 36, "WR10 9JD");
INSERT INTO passengers (first_name, last_name, street_address, address_number, zip_code) VALUES ("Deborah", "Tubbs", "Moulton Road", 31, "CB6 4BR");
INSERT INTO passengers (first_name, last_name, street_address, address_number, zip_code) VALUES ("Ann", "Lawson", "Iffley Road", 18, "CT10 0JT");
INSERT INTO passengers (first_name, last_name, street_address, address_number, zip_code) VALUES ("Clayton", "Lightfoot", "Ings Lane", 62, "DL17 3ND");
    
CREATE TABLE payments (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    passenger_id INTEGER,
    payment INTEGER,
    payment_method TEXT);
    
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (1, 15, "card");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (6, 20, "cash");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (19, 50, "cash");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (3, 23.5, "PayPal");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (2, 25, "card");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (4, 67.5, "iDeal");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (17, 5, "PayPal");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (20, 15, "cash");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (13, 100, "iDeal");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (8, 40, "card");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (11, 85, "cash");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (18, 15, "card");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (14, 25, "PayPal");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (15, 15, "card");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (5, 65, "cash");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (1, 15, "iDeal");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (12, 25, "card");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (10, 15, "card");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (9, 5, "cash");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (16, 12.5, "PayPal");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (13, 22.5, "iDeal");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (1, 32.5, "cash");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (10, 35, "cash");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (9, 15, "card");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (4, 56.5, "iDeal");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (11, 5.75, "PayPal");
INSERT INTO payments (passenger_id, payment, payment_method) VALUES (20, 15, "cash");
    
CREATE TABLE journeys (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    passenger_id INTEGER,
    departure_station_id INTEGER,
    arrival_station_id INTEGER);

INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (1, 20, 25);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (15, 5, 29);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (11, 2, 9);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (13, 18, 4);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (8, 21, 23);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (14, 29, 12);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (10, 17, 18);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (11, 29, 9);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (13, 10, 4);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (7, 16, 17);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (4, 4, 22);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (13, 8, 18);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (6, 1, 2);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (9, 25, 5);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (4, 9, 17);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (7, 2, 5);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (16, 11, 2);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (14, 15, 14);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (19, 5, 17);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (5, 10, 14);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (13, 24, 29);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (15, 14, 25);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (14, 23, 20);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (17, 7, 5);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (7, 13, 19);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (18, 18, 29);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (9, 8, 22);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (16, 3, 16);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (18, 21, 14);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (4, 4, 27);
INSERT INTO journeys (passenger_id, departure_station_id, arrival_station_id) VALUES (6, 18, 21);

CREATE TABLE time (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    train_id INTEGER,
    station_id INTEGER,
    line_id INTEGER,
    arrival_hour INTEGER,
    arrival_minute INTEGER,
    arrival_day INTEGER,
    arrival_month INTEGER,
    arrival_year INTEGER,
    departure_minute INTEGER,
    departure_hour INTEGER);


INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (1, 2, 1, 00, 00, 00, 02, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (5, 3, 2, 00, 10, 00, 14, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (9, 1, 3, 00,23, 00, 27, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (1, 3, 1, 00, 28, 00, 29, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (5, 6, 2, 00, 46, 00, 48, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (1, 14, 1, 00, 57, 01,01, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (5, 7, 2, 01, 34, 01,36, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (1, 24, 1, 01, 43, 01, 47, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (9, 4, 3, 01, 59, 02, 02, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (5, 8, 2, 02, 20, 02, 22, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (1, 14, 1, 02, 36, 02, 40, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (5, 13, 2, 02, 43, 02, 46, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (9, 9, 3, 03, 01, 03, 02, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (1, 3, 1, 03, 19, 03, 22, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (5, 16, 2, 04, 23, 04, 26, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (9, 11, 3, 04, 32, 04, 35, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (1, 2, 1, 04, 54, 05, 00, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (5, 20, 2, 05, 10, 05, 12, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (9, 26, 3, 05, 29, 05, 32, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (5, 29, 2, 05, 35, 05, 39, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (13, 2, 4, 06, 34, 06, 36, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (5, 20, 2, 06, 55, 06, 56, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (9, 24, 3, 07, 02, 07, 05, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (5, 16, 2, 07, 21, 07, 23, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (13, 5, 4, 07, 34, 07, 36, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (13, 7, 4, 07, 36, 07, 37, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (13, 8, 4, 07, 46, 07, 49, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (9, 28, 3, 08, 01, 08, 02, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (13, 10, 4, 08, 19, 08, 22, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (5, 13, 2, 08, 29, 08, 32, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (9, 1, 3, 08, 40, 08, 42, 11, 8, 2020);
INSERT INTO time (train_id, station_id, line_id, arrival_hour, arrival_minute, departure_hour, departure_minute, arrival_day, arrival_month, arrival_year) VALUES (13, 15, 4, 08, 59, 09, 02, 11, 8, 2020);

CREATE TABLE users(
    passenger_id INTEGER,
    password TEXT);
    
INSERT INTO users (passenger_id, password) VALUES (1, "password");