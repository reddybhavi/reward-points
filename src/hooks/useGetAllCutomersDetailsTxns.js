import { useState, useEffect } from 'react';
import getAllCustomersDetailsRewards from "../services/getAllCustomersDetailsRewards";
import getAllTxns from "../services/getAllTxns";

export const useGetAllCutomersDetailsTxns = (days) => {
    const [allTransactions, setAllTxns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [allTxnsError, setAllTxnsError] = useState(false);
    const [allCustomersData, setAllCustomersData] = useState([]);
    const [loadingCustomer, setLoadingCustomer] = useState(false);
    useEffect(() => {
        setLoading(true);
        setAllTxnsError(false);
        Promise.all([getAllTxns(), getAllCustomersDetailsRewards(days)])
            .then(([txnsResp, customersResp]) => {
                setAllTxns(txnsResp);
                setAllCustomersData(customersResp);
                setLoading(false);
                setAllTxnsError(false);
            })
            .catch(() => {
                setAllTxnsError(true);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setLoadingCustomer(true);
        getAllCustomersDetailsRewards(days)
            .then((customersResp) => {
                setAllCustomersData(customersResp);
                setLoadingCustomer(false);
            })
            .catch(() => {
                setLoadingCustomer(false);
            });
    }, [days]);

    return { allTransactions, loading, allTxnsError, allCustomersData, loadingCustomer }

};

export default useGetAllCutomersDetailsTxns
