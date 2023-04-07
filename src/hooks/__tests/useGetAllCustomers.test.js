import { renderHook } from '@testing-library/react-hooks';
import useGetAllCustomers from '../useGetAllCustomers';

describe('useGetAllCustomers', () => {

    it('returns all customers when successfully fetched', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useGetAllCustomers());

        await waitForNextUpdate({ timeout: 5000 });
        jest.runAllTimers();

        expect(Object.values(result.current.allCustomers)).toHaveLength(3);
        expect(result.current.isAllCustomersLoading).toBe(false);
        expect(result.current.isAllCustomersError).toBeNull();
    });

});
