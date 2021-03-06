import {serverFactory} from './configure-server';

export const startHapi = async () => {
    const server = await serverFactory();

    await server.start();

    console.log('Started hapi server.', server.info);

    return server;
};
