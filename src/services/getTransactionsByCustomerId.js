import { transactionsData } from '../utils/transactionsData'
import { filterTransactions } from '../utils/commonUtils'

export const getTransactionsByCustomerId = (customerId, days) => {
    return new Promise((resolve) => {
        // Simulate a delay
        setTimeout(() => {
            const filteredTransactions = filterTransactions(transactionsData, parseInt(customerId), days)
            resolve(filteredTransactions);
        }, 250);
    });
};

export default getTransactionsByCustomerId
