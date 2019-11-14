import {serverFactory} from './configure-server';
import {startHapi} from './startup';

jest.mock('./configure-server');

describe('startHapi', () => {
    let mockServer;

    beforeEach(() => {
        mockServer = {
            start: jest.fn()
        };
        serverFactory.mockResolvedValue(mockServer);
    });
    test('should start the server', async () => {
        await startHapi();

        expect(mockServer.start).toHaveBeenCalledWith();
    });

    test('should await the server starting', async () => {
        let serverStarted;

        mockServer.start.mockReturnValue(new Promise((resolve) => {
            serverStarted = resolve;
        }));

        const serverPromise = startHapi();

        setImmediate(() => {
            mockServer.started = true;
            serverStarted();
        });

        await serverPromise.then((server) => {
            expect(server.started).toBe(true);
        });
    });
});
