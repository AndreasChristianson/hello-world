import Hapi from '@hapi/hapi';
import inert from '@hapi/inert';

import {routes} from '../../routes';

import {serverFactory} from './configure-server';

jest.mock('@hapi/hapi');

describe('configure-server', () => {
    let mockServer;

    beforeEach(async () => {
        jest.spyOn(process, 'on');

        mockServer = {
            start: jest.fn(),
            stop: jest.fn(),
            route: jest.fn(),
            register: jest.fn()
        };
        Hapi.Server.mockImplementation(() => mockServer);
        await serverFactory();
    });

    afterEach(jest.clearAllMocks);

    test('creates a server instance', () => {
        expect(Hapi.Server).toHaveBeenCalledWith({
            host: '0.0.0.0',
            port: 5555
        });
    });

    test('registers inert', () => {
        expect(mockServer.register).toHaveBeenCalledWith(inert);
    });

    describe.each(['SIGINT', 'SIGTERM'])('%s', (signal) => {
        test('should register handler', () => {
            expect(process.on).toHaveBeenCalledWith(signal, expect.anything());
        });

        test('should call stop', () => {
            const matchingCall = process.on.mock.calls.find((call) => call[0] === signal);

            matchingCall[1]();

            expect(mockServer.stop).toHaveBeenCalledWith();
        });
    });

    describe('routes', () => {
        test('should register all routes', () => {
            expect(mockServer.route).toHaveBeenCalledWith(routes);
        });
    });
});
