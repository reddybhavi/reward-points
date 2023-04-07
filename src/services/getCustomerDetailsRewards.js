import { transactionsData } from '../utils/transactionsData'
import { getCustomerDetailsRewardsUtil } from '../utils/commonUtils'
import { customersData } from '../utils/customersData'

export const getCustomerDetailsRewards = (customerId, days) => {
    return new Promise((resolve) => {
        // Simulate a delay
        setTimeout(() => {
            resolve(getCustomerDetailsRewardsUtil(customersData, transactionsData, customerId, days));
        }, 250);
    });
};

export default getCustomerDetailsRewards
