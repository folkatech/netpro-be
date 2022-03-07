# Netpro
## _api netpro v.1.0_


## Tech

Nepro Api uses a number of open source projects to work properly:

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [Mysql] - databse, (min ver 5.7)

## Installation

Netpro requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
clone netpro from repo https://github.com/folkatech/netpro-be
cd netpro
npm i
set up .env file
import data with node app/config/seeder/insertData.js
npm start
```

For production environments...

```sh
mode=development
PORT=3000
DB_NAME=netpro
HTTPS_STAT=off
DB_PASS=""
DB_USER=root
PUBLIC_DIR=public
JWT_SECRET=netproJWT2022oYe
DB_HOST=localhost
MYSQL_PORT=3306
URL_DEV=127.0.0.1:3000/
URL_LIVE=127.0.0.1:3000/
```
## License

MIT

