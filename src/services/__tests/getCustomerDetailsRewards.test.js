import { getCustomerDetailsRewards } from '../getCustomerDetailsRewards';


// Mock Date.now()
const mockDate = new Date('2023-04-06T12:00:00Z');
const realDateNow = Date.now.bind(global.Date);
const mockDateNow = jest.fn(() => mockDate.getTime());
beforeAll(() => {
    global.Date.now = mockDateNow;
});
afterAll(() => {
    global.Date.now = realDateNow;
});

describe('getCustomerDetailsRewards', () => {
    it('returns the expected rewards for customer 1', async () => {
        const customerId = 1;
        const days = 30;

        jest.spyOn(global, 'setTimeout').mockImplementation((callback) => {
            // Immediately invoke the callback to avoid waiting for the delay
            callback();
        });

        const result = await getCustomerDetailsRewards(customerId, days);

        expect(result?.totalRewards).toEqual(450);
    });

    it('returns the expected rewards for customer 2', async () => {
        const customerId = 2;
        const days = 60;

        jest.spyOn(global, 'setTimeout').mockImplementation((callback) => {
            // Immediately invoke the callback to avoid waiting for the delay
            callback();
        });

        const result = await getCustomerDetailsRewards(customerId, days);

        expect(result.totalRewards).toEqual(375);
    });

    it('returns the expected rewards for customer 3', async () => {
        const customerId = 3;
        const days = 90;

        jest.spyOn(global, 'setTimeout').mockImplementation((callback) => {
            // Immediately invoke the callback to avoid waiting for the delay
            callback();
        });

        const result = await getCustomerDetailsRewards(customerId, days);

        expect(result.totalRewards).toEqual(180);
    });
});
