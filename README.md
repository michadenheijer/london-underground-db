# not-php
This is a database with webapp, that can search the Londen Underground for prices, your journeys and what your balance is. It's just a schoolproject so the data is not real. As database I have mysql, communication between the server and the browser are done using socket.io. All made using the [Evie theme](https://evie.undraw.co/) by Undraw.

## Screenshots
### Home
This is the home page, it doesn't do much, it's just there to link to the app.
![index.html](.github/screenshot1.JPG "Home")

### App
This is the apps home screen, the page is renderd locally and the data is provided using socket.io.
![/app/index.html](.github/screenshot2.JPG "App")

### Stations
This is the stations page, here the user can easily search of click the station where they want more information from.
![/app/stations.html](.github/screenshot3.JPG "Stations")

### Stations search
The user can easily search, it's also super fast, so almost no delay when you're trying to search.
![/app/stations.html](.github/screenshot4.JPG "Stations search")

### Lines
Also for the people who want to know something about the lines, well there's some information about that.
![/app/lines.html](.github/screenshot5.JPG "Lines")

### Personal information
The users can also edit their personal information, and it allows them to add money to their underground card.
![/app/user.html](.github/screenshot6.JPG "User")

## npm plugins
socket.io
express
compression
pm2
node-mysql

## database
mysql