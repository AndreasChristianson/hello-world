import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';

import {routes} from '../../routes';

const applyRoutes = (server) => {
    server.route(routes);
};

const registerEngines = (server) => server.register(Inert);

const configureShutdown = (server) => {
    ['SIGINT', 'SIGTERM'].forEach((interrupt) => {
        process.on(interrupt, () => {
            console.error(`Received ${interrupt}.`);
            server.stop();
        });
    });
};

export const serverFactory = async () => {
    const server = new Hapi.Server({
        host: '0.0.0.0',
        port: 5555
    });

    applyRoutes(server);
    configureShutdown(server);
    await registerEngines(server);

    return server;
};
