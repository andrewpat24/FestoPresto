import { setStartDate, setEndDate, sortByDate, sortByAmount, setTextFilter } from '../../actions/filters'; 
import moment from 'moment';

test('Should generate set start date action object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE', 
        startDate: moment(0)
    })
});

test('should generate set end date action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    })
});

test('Should generate sort by date action object', () => {
    const action = sortByDate(); 
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    });
});

test('Should generate sort by amount action object', () => {
    const action = sortByAmount(); 
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    });
});

test('Should generate set text filter action object', () => {
    const action = setTextFilter('test text');
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER', 
        text: 'test text'
    });
});

test('Should generate set text filter action object with default value', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER', 
        text: ''
    });
});


// export const setTextFilter = (text='') => ({
//     type: 'SET_TEXT_FILTER', 
//     text
// });

// export const sortByAmount = () => ({
//     type: 'SORT_BY_AMOUNT'
// });

// export const sortByDate = () => ({
//     type: 'SORT_BY_DATE'
// });

// export const setStartDate = (startDate=undefined) => ({
//     type: 'SET_START_DATE',
//     startDate
// })

// export const setEndDate = (endDate=undefined) => ({
//     type: 'SET_END_DATE',
//     endDate
// });
