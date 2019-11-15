import {serverFactory} from '../../../infrastructure/hapi/configure-server';

describe('POST:/expression', () => {
    let server,
        request;

    beforeEach(async () => {
        server = await serverFactory();
        request = {
            url: '/api/expression',
            method: 'POST',
            payload: { input: "1+1=2" }
        };
    });

    test('returns 200', async () => {
        const response = await server.inject(request);

        expect(response.statusCode).toBe(200);
    });

    test('returns server info', async () => {
        const response = await server.inject(request);

        expect(response.result).toStrictEqual({
            'operator': 'equals',
            'arguments': [
                {
                    'operator': 'addition',
                    'arguments': [
                        1,
                        1
                    ]
                },
                2
            ]
        });
    });
});
