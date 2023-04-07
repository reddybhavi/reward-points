import getAllTxns from '../getAllTxns';
import { transactionsData } from '../../utils/transactionsData'

describe('getAllTxns', () => {
    it('should return a Promise', () => {
        expect(getAllTxns()).toBeInstanceOf(Promise);
    });

    it('should resolve with the transactions data', async () => {
        const txns = await getAllTxns();
        expect(txns).toEqual(transactionsData);
    });

    it('should resolve after a delay of 250 msecond', async () => {
        const startTime = Date.now();
        await getAllTxns();
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        expect(elapsedTime).toBeGreaterThanOrEqual(250);
    });
});
