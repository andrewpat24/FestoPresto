import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const addExpense = (
    {
        description="", 
        note="", 
        amount=0, 
        createdAt=0
    } = {}
) => ({
    type: 'ADD_EXPENSE', 
    expense: {
        id: uuid(), 
        description, 
        note, 
        amount,
        createdAt
    }
});

const removeExpense = ( { id } ) => ({
    type: 'REMOVE_EXPENSE',
    id
})

const editExpense = ( id, updates ) => ({
    type: 'EDIT_EXPENSE', 
    id, 
    updates
});

const setTextFilter = (text='') => ({
    type: 'SET_TEXT_FILTER', 
    text
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

const setStartDate = (startDate=undefined) => ({
    type: 'SET_START_DATE',
    startDate
})

const setEndDate = (endDate=undefined) => ({
    type: 'SET_END_DATE',
    endDate
});

const expensesReducerDefaultState = []; 

const expensesReducer = (state=expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state, 
                action.expense
            ]
        case 'REMOVE_EXPENSE': 
            return state.filter((expense) => {
                return expense.id !== action.id;
            });
        case 'EDIT_EXPENSE': 
            return state.map((expense) => {
                if(expense.id === action.id) {
                    return {
                        ...expense, 
                        ...action.updates
                    }
                }
                return expense; 
            });
        default: 
            return state;
    }
}

const filtersReducerDefaultState = {
    text: '', 
    sortBy: 'date',
    startDate: undefined, 
    endDate: undefined
}

const filtersReducer = (state=filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER': 
            return {
                ...state, 
                text: action.text 
            }; 
        case 'SORT_BY_AMOUNT': 
            return {
                ...state, 
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE': 
            return {
                ...state, 
                sortBy: 'date'
            }
        case 'SET_START_DATE': 
            return {
                ...state, 
                startDate: action.startDate
            }
        case 'SET_END_DATE': 
            return {
                ...state, 
                endDate: action.endDate
            }
        default: 
            return state 
    }
}

const getVisibleExpenses = (expenses, /* filters:*/ { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        
        const startDateMatch = !startDate || expense.createdAt >= startDate;
        const endDateMatch = !endDate || expense.createdAt <= endDate; 
        const textMatch = expense.description.toLowerCase().includes(text); 

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
        } else if (sortBy === 'amount') {
            return a.amount < b.createdAt ? 1 : -1; 
        }
    }); 
}

const store = createStore(combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe( () => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters); 
    console.log(visibleExpenses);
} );

const rentExpense = store.dispatch(addExpense({
    description: 'rent', 
    amount: 100, 
    createdAt: -1000
}));


const groceryExpense = store.dispatch(addExpense({
    description: 'groceries', 
    amount: 2000, 
    createdAt: 1000
}));

const coffeeExpense = store.dispatch(addExpense({
    description: 'coffee', 
    amount: 800, 
    createdAt: 8000
}));

// store.dispatch(removeExpense({ id: rentExpense.expense.id }));

// store.dispatch(editExpense(groceryExpense.expense.id, {amount: 500}));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

store.dispatch(setStartDate(125));
store.dispatch(setEndDate(501));
store.dispatch(setTextFilter('rent'));

// store.dispatch(setStartDate());
// store.dispatch(setEndDate());

const demoState = { 
    expenses: [{
        id: 'oiajerfdfdijgbk', 
        description: 'rent', 
        note: 'final payment',
        amount: 54500, 
        createdAt: '0'
    }], 
    filters: {
        text: 'rent', 
        sortBy: 'amount', 
        startDate: undefined, 
        endDate: undefined
    }
};
