import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('Should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('Should set sortBy to amount', () => {
    const state = filtersReducer(undefined, {
        type: 'SORT_BY_AMOUNT'
    });
    expect(state.sortBy).toBe('amount');
});

test('Should set sortBy to date', () => {
    const currentState = {
        text: '',
        startDate: undefined, 
        endDate: undefined, 
        sortBy: 'amount'
    };
    const action = {
        type: 'SORT_BY_DATE'
    }
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

// Should set text filter 
test('Should set text filter', () => {
    const action = {
        type: 'SET_TEXT_FILTER', 
        text: 'new text filter'
    }
    const state = filtersReducer(undefined, action);
    expect(state.text).toBe('new text filter');
});

// Should set startDate filter
test('Should set startDate filter', () => {
    const action = {
        type: 'SET_START_DATE', 
        startDate: 69
    };
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toBe(69);
});

// should set endDate filter
test('Should set endDate filter', () => {
    const action = {
        type: 'SET_END_DATE', 
        endDate: 69
    };
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toBe(69);
});