import { renderHook } from '@testing-library/react-hooks';
import getCustomerDetailsRewards from '../../services/getCustomerDetailsRewards'
import getTransactionsByCustomerId from '../../services/getTransactionsByCustomerId'
import useGetCustomerDetailsTxns from '../useGetCustomerDetailsTxns';

jest.mock('../../services/getCustomerDetailsRewards');
jest.mock('../../services/getTransactionsByCustomerId');

describe('useGetCustomerDetailsTxns', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('fetches customer details and transactions on mount', async () => {
        const selectedCustomer = '123';
        const days = 7;
        const customerDetailsResp = { name: 'John', rewardsPoints: 100 };
        const customerTxnsResp = [{ id: 1, amount: 50 }, { id: 2, amount: 75 }];

        getCustomerDetailsRewards.mockResolvedValue(customerDetailsResp);
        getTransactionsByCustomerId.mockResolvedValue(customerTxnsResp);

        const { result, waitForNextUpdate } = renderHook(() =>
            useGetCustomerDetailsTxns(selectedCustomer, days)
        );

        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBe(false);
        expect(result.current.customerDetails).toEqual({});
        expect(result.current.customerTxns).toEqual([]);

        await waitForNextUpdate();

        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBe(false);
        expect(result.current.customerDetails).toEqual(customerDetailsResp);
        expect(result.current.customerTxns).toEqual(customerTxnsResp);
    });

    it('handles errors when fetching data', async () => {
        const selectedCustomer = '123';
        const days = 7;

        getCustomerDetailsRewards.mockRejectedValueOnce(new Error('Failed to fetch customer details'));
        getTransactionsByCustomerId.mockRejectedValueOnce(new Error('Failed to fetch customer transactions'));

        const { result, waitForNextUpdate } = renderHook(() =>
            useGetCustomerDetailsTxns(selectedCustomer, days)
        );

        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBe(false);
        expect(result.current.customerDetails).toEqual({});
        expect(result.current.customerTxns).toEqual([]);

        await waitForNextUpdate();

        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBe(true);
        expect(result.current.customerDetails).toEqual({});
        expect(result.current.customerTxns).toEqual([]);
    });

    it('should handle errors while fetching customer data when days prop changes', async () => {
        getCustomerDetailsRewards.mockRejectedValueOnce(new Error('Failed to fetch customer details'));
        getTransactionsByCustomerId.mockRejectedValueOnce(new Error('Failed to fetch customer transactions'));

        const { result, waitForNextUpdate, rerender } = renderHook(
            ({ selectedCustomer, days }) => useGetCustomerDetailsTxns(selectedCustomer, days),
            {
                initialProps: { days: 7, selectedCustomer: '123' },
            }
        );

        expect(result.current.isLoading).toBe(true);

        await waitForNextUpdate({ timeout: 5000 });

        expect(getCustomerDetailsRewards).toHaveBeenCalledWith('123', 7);
        expect(getTransactionsByCustomerId).toHaveBeenCalledWith('123', 7);
        expect(result.current.isLoading).toBe(false);

        getCustomerDetailsRewards.mockRejectedValue(new Error('Failed to fetch customer details'));
        getTransactionsByCustomerId.mockRejectedValue(new Error('Failed to fetch customer transactions'));

        rerender({ days: 14, selectedCustomer: '456' });

        expect(result.current.isLoading).toBe(true);

        await waitForNextUpdate({ timeout: 5000 });

        expect(getCustomerDetailsRewards).toHaveBeenCalledWith('456', 14);
        expect(getTransactionsByCustomerId).toHaveBeenCalledWith('456', 14);
        expect(result.current.error).toBe(true);
        expect(result.current.isLoading).toBe(false);
    });

});

