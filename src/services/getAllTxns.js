import { transactionsData } from '../utils/transactionsData'

export const getAllTxns = () => {
    return new Promise((resolve) => {
        // Simulate a delay
        setTimeout(() => {
            resolve(transactionsData);
        }, 250);
    });
};

export default getAllTxns
