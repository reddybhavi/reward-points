import { transactionsData } from '../utils/transactionsData'
import { customersData } from '../utils/customersData'
import { getAllCustomersDetailsRewardsUtil } from '../utils/commonUtils'

export const getAllCustomersDetailsRewards = (days) => {
    return new Promise((resolve) => {
        // Simulate a delay
        setTimeout(() => {
            resolve(getAllCustomersDetailsRewardsUtil(customersData, transactionsData, days));
        }, 200);
    });
};

export default getAllCustomersDetailsRewards