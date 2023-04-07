export const filterTransactions = (transactionsData, customerId, days) => {
    const today = new Date();
    const msPerDay = 86400000; // number of milliseconds in a day
    const filteredTransactions = transactionsData.filter(transaction => {
        if (days) {
            return transaction.customerId === customerId &&
                (today - new Date(transaction.created)) / msPerDay <= days;
        } else {
            return transaction.customerId === customerId
        }
    });
    return filteredTransactions;
}


// Calculate rewards for a specific txn
// For sake of simplicity we are currently considering amount as whole numbers
// 
export const calculateRewardForEachTxn = (amount) => {

    let pts = 0;

    /* 
        IF amount is greater than 100 
        2 points for $ spent over 100 
        we also add 50 as we  add point for amount spent btwn 50
        and 100
    */
    if (amount > 100) {
        pts = pts + 50 + (2 * (amount - 100));
    }
    /*
        If amount less than 100 and greater than 50
        add points amount - 50
    */
    if (amount <= 100 && amount > 50) {
        pts += 1 * (amount - 50);
    }

    return pts;
}

export const calculateTotalRewardPoints = (txns) => {
    let points = 0;
    txns.forEach(txn => {
        points += calculateRewardForEachTxn(txn.transactionAmount)
    })
    return points
}

export const getCustomerById = (customersData, id) => {
    return customersData.find(customer => customer.id === id);
}

export const getCustomerDetailsRewardsUtil = (customersData, transactionsData, customerId, days) => {
    const filteredTransactionsByDays = filterTransactions(transactionsData, parseInt(customerId), days)
    const filteredTransactions = filterTransactions(transactionsData, parseInt(customerId))
    const customerData = getCustomerById(customersData, parseInt(customerId))
    const totalRewards = calculateTotalRewardPoints(filteredTransactions)
    const partialRewards = calculateTotalRewardPoints(filteredTransactionsByDays)
    return { ...customerData, totalRewards, partialRewards }
}

export const getAllCustomersDetailsRewardsUtil = (customersData, transactionsData, days) => {
    return customersData.map(cust => getCustomerDetailsRewardsUtil(customersData, transactionsData, cust.id, days))
}