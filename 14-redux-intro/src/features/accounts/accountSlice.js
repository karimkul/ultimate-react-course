import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw(state, action) {
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: {
                        amount,
                        purpose
                    }
                };
            },
            reducer(state, action) {
                if (state.loan > 0) return;

                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance = state.balance + action.payload.amount;
            }
        },
        payLoan(state, action) {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        },
        convertingCurrency(state) {
            state.isLoading = true;
        }
    }
});

console.log(accountSlice);

export const { payLoan, requestLoan, withdraw } = accountSlice.actions;

console.log(requestLoan(1000, "buy a car"));

export function deposit(amount, currency) {
    if (currency === "USD") return { type: "account/deposit", payload: amount };

    return async function (dispatch, getState) {
        // API call
        dispatch({ type: "account/convertingCurrency" });

        const res = await fetch(
            `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`
        );
        const data = await res.json();
        const converted = data.rates.USD;

        dispatch({ type: "account/deposit", payload: converted });
    };
}

export default accountSlice.reducer;

// export default function accountReducer(state = initialStateAccount, action) {
//     switch (action.type) {
//         case "account/deposit":
//             return {
//                 ...state,
//                 balance: state.balance + action.payload,
//                 isLoading: false
//             };
//         case "account/withdraw":
//             return {
//                 ...state,
//                 balance: state.balance - action.payload
//             };
//         case "account/requestLoan":
//             if (state.loan > 0) return state;
//             return {
//                 ...state,
//                 balance: state.balance + action.payload.amount,
//                 loan: action.payload.amount,
//                 loanPurpose: action.payload.purpose
//             };
//         case "account/payLoan":
//             return {
//                 ...state,
//                 balance: state.balance - state.loan, // ✅ Corrected order
//                 loan: 0,
//                 loanPurpose: ""
//             };

//         case "account/covertingCurrency":
//             return {
//                 ...state,
//                 isLoading: true
//             };
//         default:
//             return state;
//     }
// }

// export function deposite(amount, currency) {
//     if (currency === "USD") return { type: "account/deposit", payload: amount };

//     return async function (dispatch, getState) {
//         // API call
//         dispatch({ type: "account/convertingCurrency" });

//         const res = await fetch(
//             `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`
//         );
//         const data = await res.json();
//         const converted = data.rates.USD;

//         dispatch({ type: "account/deposit", payload: converted });
//     };
// }
// export function withdraw(amount) {
//     return { type: "account/withdraw", payload: amount };
// }
// export function requestLoan(amount, purpose) {
//     return {
//         type: "account/requestLoan",
//         payload: { amount, purpose }
//     };
// }
// export function payLoan() {
//     return { type: "account/payLoan" };
// }

// export function createCustomer(fullName, nationalID) {
//     return {
//         type: "customer/createCustomer",
//         payload: { fullName, nationalID, createdAt: new Date().toISOString() }
//     };
// }

// export function updateName(fullName) {
//     return { type: "customer/updateName", payload: fullName };
// }
