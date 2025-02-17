import { combineReducers, createStore } from "redux";

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: ""
};

const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: ""
};

function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case "account/deposit":
            return {
                ...state,
                balance: state.balance + action.payload
            };
        case "account/withdraw":
            return {
                ...state,
                balance: state.balance - action.payload
            };
        case "account/requestLoan":
            if (state.loan > 0) return state;
            return {
                ...state,
                balance: state.balance + action.payload.amount,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose
            };
        case "account/payLoan":
            return {
                ...state,
                balance: state.balance - state.loan, // ✅ Corrected order
                loan: 0,
                loanPurpose: ""
            };
        default:
            return state;
    }
}

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case "customer/createCustomer":
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt
            };
        case "customer/updateName":
            return { ...state, fullName: action.payload };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
});

const store = createStore(rootReducer);

// ✅ Ensure all actions are properly dispatched
function deposite(amount) {
    store.dispatch({ type: "account/deposit", payload: amount });
}
function withdraw(amount) {
    store.dispatch({ type: "account/withdraw", payload: amount }); // ✅ Now correctly dispatched
}
function requestLoan(amount, purpose) {
    store.dispatch({
        type: "account/requestLoan",
        payload: { amount, purpose }
    });
}
function payLoan() {
    store.dispatch({ type: "account/payLoan" }); // ✅ Now correctly dispatched
}

function createCustomer(fullName, nationalID) {
    store.dispatch({
        type: "customer/createCustomer",
        payload: { fullName, nationalID, createdAt: new Date().toISOString() }
    });
}

function updateName(fullName) {
    store.dispatch({ type: "customer/updateName", payload: fullName });
}

// ✅ Running test cases
deposite(500);
withdraw(200);
console.log(store.getState()); // ✅ Expected: balance = 300

requestLoan(1000, "Buy a cheap car");
console.log(store.getState()); // ✅ Expected: balance = 1300, loan = 1000

payLoan();
console.log(store.getState()); // ✅ Expected: balance = 300, loan = 0

createCustomer("Jamshid Karimkulov", "2387452873");
console.log(store.getState()); // ✅ Customer added correctly

deposite(250);
console.log(store.getState());
