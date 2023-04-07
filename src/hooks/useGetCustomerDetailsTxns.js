import { useState, useEffect } from 'react';
import { getCustomerDetailsRewards } from "../services/getCustomerDetailsRewards";
import { getTransactionsByCustomerId } from "../services/getTransactionsByCustomerId";


export const useGetCustomerDetailsTxns = (selectedCustomer, days) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [customerDetails, setCustomerDetails] = useState({});
    const [customerTxns, setCustomersTxns] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(false);
            try {
                const [customerDetailsResp, customerTxnsResp] = await Promise.all([
                    getCustomerDetailsRewards(selectedCustomer, days),
                    getTransactionsByCustomerId(selectedCustomer, days),
                ]);
                setCustomerDetails(customerDetailsResp);
                setCustomersTxns(customerTxnsResp);
                setIsLoading(false);
            } catch (error) {
                setError(true);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [selectedCustomer, days]);

    return { isLoading, error, customerDetails, customerTxns }

};

export default useGetCustomerDetailsTxns
