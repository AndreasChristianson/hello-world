import {serverFactory} from '../../../infrastructure/hapi/configure-server';

describe('GET:/healthz', () => {
    let server,
        request;

    beforeEach(async () => {
        server = await serverFactory();
        request = {
            url: '/api/hello-world'
        };
    });

    test('returns 200', async () => {
        const response = await server.inject(request);

        expect(response.statusCode).toBe(200);
    });

    test('returns server info', async () => {
        const response = await server.inject(request);

        expect(response.result).toStrictEqual({
            message: 'hiya!'
        });
    });
});
