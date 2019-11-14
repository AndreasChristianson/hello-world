import Hapi from '@hapi/hapi';

import {routes} from '../../routes';

const applyRoutes = (server) => {
    server.route(routes);
};

const configureShutdown = (server) => {
    ['SIGINT', 'SIGTERM'].forEach((interrupt) => {
        process.on(interrupt, () => {
            console.error(`Received ${interrupt}.`);
            server.stop();
        });
    });
};

export const serverFactory = () => {
    const server = new Hapi.Server({
        host: '0.0.0.0',
        port: 5555
    });

    applyRoutes(server);
    configureShutdown(server);

    return server;
};
