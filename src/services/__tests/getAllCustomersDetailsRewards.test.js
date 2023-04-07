import { getAllCustomersDetailsRewardsUtil } from '../../utils/commonUtils';
import { transactionsData } from '../../utils/transactionsData'
import { customersData } from '../../utils/customersData'
import getAllCustomersDetailsRewards from '../getAllCustomersDetailsRewards'

jest.mock('../../utils/commonUtils', () => ({
    getAllCustomersDetailsRewardsUtil: jest.fn(),
}));

describe('getAllCustomersDetailsRewards', () => {
    beforeEach(() => {
        jest.useFakeTimers('modern');
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should call getAllCustomersDetailsRewardsUtil with the right parameters and resolve the promise', async () => {
        const expected = [{ id: 1, name: 'Alice', totalRewards: 425, partialRewards: 425 }, { id: 2, name: 'Bob', totalRewards: 150, partialRewards: 150 }];
        const days = undefined;
        const getAllCustomersDetailsRewardsUtilMock = jest.fn(() => expected);
        getAllCustomersDetailsRewardsUtil.mockImplementation(getAllCustomersDetailsRewardsUtilMock);

        const result = getAllCustomersDetailsRewards(days);

        jest.advanceTimersByTime(300);

        await expect(result).resolves.toEqual(expected);
        expect(getAllCustomersDetailsRewardsUtilMock).toHaveBeenCalledWith(customersData, transactionsData, days);
    });

});
