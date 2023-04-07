import { renderHook } from '@testing-library/react-hooks';
import useGetAllCutomersDetailsTxns from '../useGetAllCutomersDetailsTxns';
import getAllCustomersDetailsRewards from "../../services/getAllCustomersDetailsRewards";
import getAllTxns from "../../services/getAllTxns";

jest.mock('../../services/getAllTxns');
jest.mock('../../services/getAllCustomersDetailsRewards');

describe('useGetAllCutomersDetailsTxns', () => {
    const customers = [
        {
            id: 1,
            name: "John",
        },
        {
            id: 2,
            name: "Jane",
        },
    ];
    const transactions = [
        {
            id: 1,
            customer: "John",
            amount: 100,
            date: "2022-01-01",
        },
        {
            id: 2,
            customer: "Jane",
            amount: 50,
            date: "2022-01-02",
        },
    ];
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch all transactions and customer data on mount', async () => {

        getAllCustomersDetailsRewards.mockResolvedValue(customers);
        getAllTxns.mockResolvedValue(transactions);

        const { result, waitForNextUpdate } = renderHook(() =>
            useGetAllCutomersDetailsTxns(7)
        );

        expect(result.current.loading).toBe(true);

        await waitForNextUpdate({ timeout: 5000 });

        expect(getAllTxns).toHaveBeenCalled();
        expect(getAllCustomersDetailsRewards).toHaveBeenCalledWith(7);
        expect(result.current.allTransactions).toEqual(transactions);
        expect(result.current.allCustomersData).toEqual(customers);
        expect(result.current.loading).toBe(false);
        expect(result.current.allTxnsError).toBe(false);
    });


    it('should handle errors while fetching all transactions and customer data on mount', async () => {
        getAllTxns.mockRejectedValue(new Error('Failed to fetch transactions'));
        getAllCustomersDetailsRewards.mockRejectedValue(
            new Error('Failed to fetch customers')
        );

        const { result, waitForNextUpdate } = renderHook(() =>
            useGetAllCutomersDetailsTxns(7)
        );

        expect(result.current.loading).toBe(true);

        await waitForNextUpdate({ timeout: 5000 });


        expect(getAllTxns).toHaveBeenCalled();
        expect(getAllCustomersDetailsRewards).toHaveBeenCalledWith(7);
        expect(result.current.allTxnsError).toBe(true);
        expect(result.current.loading).toBe(false);
    });

    it('should fetch customer data when days prop changes', async () => {
        const customers = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
        getAllCustomersDetailsRewards.mockResolvedValue(customers);

        const { result, waitForNextUpdate, rerender } = renderHook(
            ({ days }) => useGetAllCutomersDetailsTxns(days),
            {
                initialProps: { days: 7 },
            }
        );

        expect(result.current.loadingCustomer).toBe(true);

        await waitForNextUpdate({ timeout: 5000 });


        expect(getAllCustomersDetailsRewards).toHaveBeenCalledWith(7);
        expect(result.current.allCustomersData).toEqual(customers);
        expect(result.current.loadingCustomer).toBe(false);

        getAllCustomersDetailsRewards.mockResolvedValue([{ id: 3, name: 'Charlie' }]);

        rerender({ days: 14 });

        expect(result.current.loadingCustomer).toBe(true);

        await waitForNextUpdate({ timeout: 5000 });

        expect(getAllCustomersDetailsRewards).toHaveBeenCalledWith(14);
        expect(result.current.allCustomersData).toEqual([{ id: 3, name: 'Charlie' }]);
        expect(result.current.loadingCustomer).toBe(false);
    });

    it('should handle errors while fetching customer data when days prop changes', async () => {
        getAllCustomersDetailsRewards.mockRejectedValue(
            new Error('Failed to fetch customers')
        );

        const { result, waitForNextUpdate, rerender } = renderHook(
            ({ days }) => useGetAllCutomersDetailsTxns(days),
            {
                initialProps: { days: 7 },
            }
        );

        expect(result.current.loadingCustomer).toBe(true);

        await waitForNextUpdate({ timeout: 5000 });


        expect(getAllCustomersDetailsRewards).toHaveBeenCalledWith(7);
        expect(result.current.loadingCustomer).toBe(false);

        getAllCustomersDetailsRewards.mockRejectedValue(
            new Error('Failed to fetch customers')
        );

        rerender({ days: 14 });

        expect(result.current.loadingCustomer).toBe(true);

        await waitForNextUpdate({ timeout: 5000 });


        expect(getAllCustomersDetailsRewards).toHaveBeenCalledWith(14);
        expect(result.current.allCustomersData).toEqual([]);
        expect(result.current.loadingCustomer).toBe(false);

    });

});