## `Info`
### This project is done as part of assesement.

### `yarn`

To install dependencies

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `yarn test`
`yarn test` Launches the test runner in the interactive watch mode and press a to run all tests.\
 `yarn test:ci` to run all tests.\
 See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `Thoughts`

- Since this is a simple react so used only react with hooks, As the scope of the project grows we can include a state management library like redux. Also we can include [custom middleware patterns](https://redux.js.org/tutorials/fundamentals/part-4-store#writing-custom-middleware) to have listen to events and dispatch actions/ api calls based on the actions. 
- Used custom hooks for making api calls to listen changes on props and made sure that they are reusable.
- Used timeouts in services to simiulate api calls. In a real scenario case we should paginate all api calls which are required (for ex: gettransactions).


### `Summary of the files/project`

1.  App.js is the root file.
2.  RewardsHome.js is the start file for code and its where the code for tabs lives, It has 2 components
    \
        DisplayTransactionsByUser
            \
        DisplayAllUsersTxns

3.  DisplayTransactionsByUser
    \
    Uses a custom hook useGetCustomerDetailsTxns to get all txns and details for specific user.
    \
    Contains code for 2 Dropdowns in HeaderArea component and TableComponent to display user data in table.
4.  DisplayAllUsersTxns
    \
    Uses a custom hook useGetAllCutomersDetailsTxns to Get all customers details and reward points
    \
    Dislays dayspicker and 2 tables for showing customers data.
5.  All the service calls reside in services folder.
6.  All hooks are in hooks folder.
7.  All common reusable react components are in common folder.
8.  All utils, data being fetched by services and constants are in Utils folder.
9.  Function to calculate rewards is in commonUtil(calculateRewardForEachTxn).
10. CSS files for components are in css folder inside the same folder.
11. All unit tests are in the same folder as of components/ services in folder __tests, covered most cases I think.


### `Total tests summary`

Test Suites: 17 passed, 17 total
\
Tests: 59 passed, 59 total
\
Snapshots: 0 total
\
Time: 4.753 s, estimated 8 s
\
Ran all test suites.

### `Screenshots of final portal`

![Single Customer Data](/images/singleCustomer.png?raw=true "Single Customer Data")

![All Customers Data](/images/allCustomers.png?raw=true "All Customers Data")
