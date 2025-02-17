const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: ""
};

export default function accountReducer(state = initialStateAccount, action) {
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

export function deposite(amount) {
    return { type: "account/deposit", payload: amount };
}
export function withdraw(amount) {
    return { type: "account/withdraw", payload: amount };
}
export function requestLoan(amount, purpose) {
    return {
        type: "account/requestLoan",
        payload: { amount, purpose }
    };
}
export function payLoan() {
    return { type: "account/payLoan" };
}

export function createCustomer(fullName, nationalID) {
    return {
        type: "customer/createCustomer",
        payload: { fullName, nationalID, createdAt: new Date().toISOString() }
    };
}

export function updateName(fullName) {
    return { type: "customer/updateName", payload: fullName };
}
