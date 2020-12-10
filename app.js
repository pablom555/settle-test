const Hapi = require('@hapi/hapi');
const routesRate = require('./src/routes/rate.route');

require('./src/config');
require('./database');

const init = async () => {

    const server = new Hapi.Server({
        port: process.env.PORT,
        host: 'localhost'
    });

    server.route(routesRate);

    await server.start();
    console.log(`Server is running on: ${server.info.uri}`);

};

init();
