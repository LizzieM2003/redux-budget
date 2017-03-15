import expect from 'expect';
import df from 'deep-freeze-strict';

import {
  GET_MONTH,
  GET_MONTH_TOTAL,
  GET_MONTH_EXPENSES,
  GET_MONTH_INCOME
} from 'actions';

import month_reducer from 'reducer_month';
import total_reducer from 'reducer_total';
import expenses_reducer from 'reducer_expenses';
import income_reducer from 'reducer_income';

describe('Reducers', () => {
  describe('Get Month Reducer', () => {
    it('should set month', () => {
      const action = {
        type: GET_MONTH,
        payload: 'June 2017'
      };

      const res = month_reducer(df(''), df(action));
      expect(res).toEqual(action.payload);
    });
  });

  describe('Get Total Reducer', () => {
    it('should set total', () => {
      const action = {
        type: GET_MONTH_TOTAL,
        payload: 10
      };

      const res = total_reducer(df(0), df(action));

      expect(res).toEqual(action.payload);
    });
  });

  describe('Get Expenses Reducer', () => {
    it('should set expenses array', () => {
      const expenseArr = [{
        id: 1,
        description: 'An expense item',
        amount: 1.59
      }];

      const action = {
        type: GET_MONTH_EXPENSES,
        payload: expenseArr
      };

      const res = expenses_reducer(df([]), df(action));

      expect(res).toEqual(action.payload);
    });
  });

  describe('Get Income Reducer', () => {
    it('should set income array', () => {
      const incomeArr = [{
        id: 1,
        description: 'An income item',
        amount: 1.59
      }];

      const action = {
        type: GET_MONTH_INCOME,
        payload: incomeArr
      };

      const res = income_reducer(df([]), df(action));

      expect(res).toEqual(action.payload);
    });
  });
});
