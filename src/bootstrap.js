import {startHapi} from './infrastructure/hapi/startup';

export const bootstrap = async () => {
    try {
        await startHapi();
    } catch (error) {
        console.error('Error starting', error);
    }
};
