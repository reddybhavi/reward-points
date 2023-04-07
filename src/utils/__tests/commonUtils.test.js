import { filterTransactions, calculateRewardForEachTxn, calculateTotalRewardPoints, getCustomerById, getCustomerDetailsRewardsUtil } from '../commonUtils';

describe('filterTransactions', () => {
    const transactionsData = [{ id: 1, customerId: 1, amount: 10, created: '2022-03-31T12:00:00Z' }, { id: 2, customerId: 2, amount: 20, created: '2022-04-01T12:00:00Z' }, { id: 3, customerId: 1, amount: 30, created: '2022-04-02T12:00:00Z' },];

    const today = new Date('2022-04-03T12:00:00Z');
    const originalDate = Date;

    beforeEach(() => {
        global.Date = jest.fn(() => today);
        global.Date.UTC = originalDate.UTC;
        global.Date.parse = originalDate.parse;
        global.Date.now = originalDate.now;
    });

    afterEach(() => {
        global.Date = originalDate;
    });

    it('should filter transactions by customerId and days', () => {
        const customerId = 1;
        const days = 2;
        const expectedTransactions = [{ id: 1, customerId: 1, amount: 10, created: '2022-03-31T12:00:00Z' }, { id: 3, customerId: 1, amount: 30, created: '2022-04-02T12:00:00Z' },];
        const filteredTransactions = filterTransactions(transactionsData, customerId, days);
        expect(filteredTransactions).toEqual(expectedTransactions);
    });

    it('should return an empty array if no transactions match', () => {
        const customerId = 3;
        const days = 1;
        const expectedTransactions = [];
        const filteredTransactions = filterTransactions(transactionsData, customerId, days);
        expect(filteredTransactions).toEqual(expectedTransactions);
    });

    it('should handle days with fractional parts', () => {
        const customerId = 2;
        const days = 0.5;
        const expectedTransactions = [{ id: 2, customerId: 2, amount: 20, created: '2022-04-01T12:00:00Z' },];
        const filteredTransactions = filterTransactions(transactionsData, customerId, days);
        expect(filteredTransactions).toEqual(expectedTransactions);
    });
});


describe('calculateRewardForEachTxn', () => {
    it('should return 0 for an amount of 0', () => {
        // Arrange
        const amount = 0;

        // Act
        const result = calculateRewardForEachTxn(amount);

        // Assert
        expect(result).toBe(0);
    });

    it('should return 1 for an amount of 50', () => {
        // Arrange
        const amount = 50;

        // Act
        const result = calculateRewardForEachTxn(amount);

        // Assert
        expect(result).toBe(0);
    });

    it('should return 50 for an amount of 100', () => {
        // Arrange
        const amount = 100;

        // Act
        const result = calculateRewardForEachTxn(amount);

        // Assert
        expect(result).toBe(50);
    });

    it('should return 250 for an amount of 200', () => {
        // Arrange
        const amount = 200;

        // Act
        const result = calculateRewardForEachTxn(amount);

        // Assert
        expect(result).toBe(250);
    });

    it('should return 0 for a negative amount', () => {
        // Arrange
        const amount = -50;

        // Act
        const result = calculateRewardForEachTxn(amount);

        // Assert
        expect(result).toBe(0);
    });
});

describe('calculateTotalRewardPoints', () => {
    it('calculates reward points correctly for transactions', () => {
        const txns = [{ transactionAmount: 50 }, { transactionAmount: 120 }, { transactionAmount: 80 },];
        const actualPoints = calculateTotalRewardPoints(txns);
        expect(actualPoints).toBe(120);
    });

    it('returns 0 if no transactions are provided', () => {
        const txns = [];
        const expectedPoints = 0;
        const actualPoints = calculateTotalRewardPoints(txns);
        expect(actualPoints).toBe(expectedPoints);
    });
});

describe('getCustomerById', () => {
    it('returns the correct customer', () => {
        const customersData = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' },];
        const id = 2;
        const expectedCustomer = { id: 2, name: 'Jane' };
        const actualCustomer = getCustomerById(customersData, id);
        expect(actualCustomer).toEqual(expectedCustomer);
    });

    it('returns undefined if customer is not found', () => {
        const customersData = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' },];
        const id = 3;
        const expectedCustomer = undefined;
        const actualCustomer = getCustomerById(customersData, id);
        expect(actualCustomer).toEqual(expectedCustomer);
    });
});

describe('getCustomerDetailsRewardsUtil', () => {
    const customersData = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' },];
    const transactionsData = [{ customerId: 1, created: '2022-01-01', transactionAmount: 75 }, { customerId: 1, created: '2022-02-01', transactionAmount: 150 }, { customerId: 1, created: '2022-03-01', transactionAmount: 200 }, { customerId: 2, created: '2022-01-01', transactionAmount: 100 }, { customerId: 2, created: '2022-02-01', transactionAmount: 75 }, { customerId: 2, created: '2022-03-01', transactionAmount: 50 },];

    beforeAll(() => {
        jest.spyOn(Date, 'now').mockImplementation(() => new Date('2022-04-01').valueOf());
    });

    afterAll(() => {
        jest.spyOn(Date, 'now').mockRestore();
    });

    test('returns customer details with rewards for all transactions if days is not provided', () => {
        const customerId = 1;
        const days = undefined;
        const expected = {
            id: 1,
            name: 'Alice',
            totalRewards: 425,
            partialRewards: 425,
        };
        const result = getCustomerDetailsRewardsUtil(
            customersData,
            transactionsData,
            customerId,
            days
        );
        expect(result).toEqual(expected);
    });

    test('returns customer details with rewards for transactions within given days', () => {
        const customerId = 1;
        const days = 60;
        const expected = {
            id: 1,
            name: 'Alice',
            totalRewards: 425,
            partialRewards: 0,
        };
        const result = getCustomerDetailsRewardsUtil(
            customersData,
            transactionsData,
            customerId,
            days
        );
        expect(result).toEqual(expected);
    });

    test('returns undefined for non-existent customer ID', () => {
        const customerId = 3;
        const days = undefined;
        const result = getCustomerDetailsRewardsUtil(
            customersData,
            transactionsData,
            customerId,
            days
        );
        expect(result).toEqual({ "partialRewards": 0, "totalRewards": 0 });
    });
});
