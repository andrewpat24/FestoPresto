import selectExpenses from '../../selectors/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';

test('Should filter by text value', () => {
    const filters = {
        text: 'e', 
        sortBy: 'date', 
        startDate: undefined, 
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters); 
    expect(result).toEqual([ expenses[2], expenses[1] ])
})

test('Should filter by startDate', () => {
    const filters = {
        text: '', 
        sortBy: 'date', 
        startDate: moment(0), 
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([ expenses[2], expenses[0] ]);
});

// Filter by endDate
test('Should filter by endDate', () => {
    const filters = {
        text: '',
        sortBy: 'date', 
        startDate: undefined,
        endDate: moment(1)
    }

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[0], expenses[1]]);
});

// Sort by date
test('Should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined, 
        endDate: undefined
    };

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([ expenses[2], expenses[0], expenses[1] ])
});

// Sort by amount
test('Should sort by amount', () => {
    const filters = {
        text: '', 
        sortBy: 'amount', 
        startDate: undefined, 
        endDate: undefined
    };

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[1], expenses[0]]);
});