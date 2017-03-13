import { combineReducers } from 'redux';
import month from 'reducer_month';
import income from 'reducer_income';
import expenses from 'reducer_expenses';
import total from 'reducer_total';

const rootReducer = combineReducers({
  month,
  total,
  income,
  expenses
});

export default rootReducer;
