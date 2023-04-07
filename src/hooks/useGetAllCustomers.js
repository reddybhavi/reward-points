import { useState, useEffect } from 'react';
import { customersData } from '../utils/customersData'

export const useGetAllCustomers = () => {
    const [allCustomers, setAllCustomers] = useState([]);
    const [isAllCustomersLoading, setAllCustomersLoading] = useState(false);
    const [isAllCustomersError, setAllCustomersError] = useState(null);

    useEffect(() => {
        setAllCustomersLoading(true);
        setAllCustomersError(null);
        setTimeout(() => {
            try {
                const customersById = customersData.reduce((acc, customer) => {
                    acc[customer.id] = { id: customer?.id, name: customer?.name };
                    return acc;
                }, {});
                setAllCustomers(customersById);
                setAllCustomersLoading(false);
            } catch (error) {
                setAllCustomersError(error);
                setAllCustomersLoading(false);
            }
        }, 500); // set a timeout of 2 seconds to simulate loading time
    }, []);

    return { allCustomers, isAllCustomersLoading, isAllCustomersError };
};

export default useGetAllCustomers
