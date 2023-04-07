import getTransactionsByCustomerId from '../getTransactionsByCustomerId';
import { filterTransactions } from '../../utils/commonUtils';
import { transactionsData } from '../../utils/transactionsData';

jest.mock('../../utils/commonUtils', () => ({
    filterTransactions: jest.fn(),
}));

describe('getTransactionsByCustomerId', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return a Promise', () => {
        expect(getTransactionsByCustomerId(1, 30)).toBeInstanceOf(Promise);
    });

    it('should call filterTransactions with the correct arguments', async () => {
        const customerId = 1;
        const days = 30;
        await getTransactionsByCustomerId(customerId, days);
        expect(filterTransactions).toHaveBeenCalledWith(transactionsData, customerId, days);
    });

    it('should resolve with the filtered transactions data', async () => {
        const customerId = 1;
        const days = 30;
        const filteredTransactions = [{ id: 1, customerId: 1, amount: 10 }, { id: 2, customerId: 1, amount: 20 }];
        filterTransactions.mockReturnValueOnce(filteredTransactions);
        const txns = await getTransactionsByCustomerId(customerId, days);
        expect(txns).toEqual(filteredTransactions);
    });

});
