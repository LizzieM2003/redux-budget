import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const createMockStore = configureMockStore([thunk]);

import {
  GET_MONTH_EXPENSES,
  GET_MONTH_INCOME,
  GET_MONTH_TOTAL,
  GET_MONTH,
  getMonthExpenses,
  getMonthIncome,
  getMonthTotal,
  getNewMonth,
  addNewItem
 } from 'actions';



describe('Actions', () => {
  it('should generate get month expenses action', () => {
    const expense = {
      id: 1,
      description: 'An expense item',
      amount: 1.59
    }

    const action = {
      type: GET_MONTH_EXPENSES,
      payload: [expense]
    };

    const res = getMonthExpenses([expense]);

    expect(res).toEqual(action);
  });

  it('should generate get month income action', () => {
    const income = {
      id: 1,
      description: 'An income item',
      amount: 1.59
    }

    const action = {
      type: GET_MONTH_INCOME,
      payload: [income]
    };

    const res = getMonthIncome([income]);
    expect(res).toEqual(action);
  });

  it('should generate get month total action', () => {
    const action = {
      type: GET_MONTH_TOTAL,
      payload: 0
    };

    const res = getMonthTotal(action.payload);
    expect(res).toEqual(action);
  });

  it('should generate get month action', () => {
    const action = {
      type: GET_MONTH,
      payload: 'June 2017'
    };

    const res = getNewMonth(action.payload);
    expect(res).toEqual(action);
  });

  it('should generate addNewItem action and dispatch subsequent actions', (done) => {
    const store = createMockStore({});
    const itemToAdd = {
      description: "Test Expense",
      amount: 1
    }
    store.dispatch(addNewItem("May 2017", "expenses", itemToAdd)).then(() => {
      const actions = store.getActions();
      console.log('actions', actions);
      // three further actions should be fired
      expect(actions.length).toEqual(3);
      // expect the 2nd action to be GET_MONTH_EXPENSES
      expect(actions[1]).toInclude({
        type: GET_MONTH_EXPENSES
      });
      expect(actions[1].payload).toInclude({
        month: 'May 2017'
      });
      done();
    }).catch(done);
  });
});
