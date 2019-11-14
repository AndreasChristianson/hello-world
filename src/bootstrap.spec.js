import Chance from 'chance';

import {bootstrap} from './bootstrap';
import {startHapi} from './infrastructure/hapi/startup';

jest.mock('./infrastructure/hapi/startup');

describe('bootstrap.js', () => {
    const chance = new Chance();

    beforeEach(() => {
        jest.spyOn(process, 'on');
        jest.spyOn(console, 'error');
    });

    afterEach(jest.resetAllMocks);

    test('should start hapi', async () => {
        await bootstrap();

        expect(startHapi).toHaveBeenCalledWith();
    });

    describe('exception', () => {
        let error;

        beforeEach(() => {
            error = new Error(chance.sentence());

            startHapi.mockRejectedValue(error);
        });

        test('should log', async () => {
            await bootstrap();

            expect(console.error)
                .toHaveBeenCalledTimes(1)
                .toHaveBeenCalledWith('Error starting', error);
        });
    });
});
