import { insertItem, deleteDbItem } from 'db';

export const GET_MONTH_EXPENSES = 'GET_MONTH_EXPENSES';
export const GET_MONTH_INCOME = 'GET_MONTH_INCOME';
export const GET_MONTH_TOTAL = 'GET_MONTH_TOTAL';
export const GET_MONTH = 'GET_MONTH';

export function initialiseApp(monthData) {
  return function(dispatch) {
    const { expenses, income, month, total } = monthData;
    // console.log('Action data', monthData);
    dispatch(getMonthExpenses(expenses));
    dispatch(getMonthIncome(income));
    dispatch(getNewMonth(month));
    dispatch(getMonthTotal(total));
  }
}

export function addNewItem(month, itemType, item) {
  return function(dispatch) {
    // console.log(month, itemType, item);
    const insertItemPromise = insertItem(month, itemType, item);
      return insertItemPromise.then(monthData => {
        // console.log('month data', monthData);
        const { month, expenses, income, total } = monthData;
        // console.log('Inserted item', monthData);

        // dispatch different actions depending on the itemType
        if (itemType === 'expenses') {
          dispatch(getMonthExpenses(expenses));
        } else if (itemType === 'income') {
          dispatch(getMonthIncome(income));
        }

        dispatch(getMonthTotal(total));
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export function deleteItem(month, itemType, itemId) {
  return function(dispatch) {
    console.log(month, itemType, itemId);
    const deleteDbItemPromise = deleteDbItem(month, itemType, itemId);
      return deleteDbItemPromise.then(monthData => {
        const { month, expenses, income, total } = monthData;
        console.log('Deleted item', monthData);

        // dispatch different actions depending on the itemType
        if (itemType === 'expenses') {
          dispatch(getMonthExpenses(expenses));
        } else if (itemType === 'income') {
          dispatch(getMonthIncome(income));
        }

        dispatch(getMonthTotal(total));
      })
      .catch(error => {
        console.log(error);
      });
    }
}

export function getMonthExpenses(expenses) {
  return {
    type: GET_MONTH_EXPENSES,
    payload: expenses
  }
}

export function getMonthIncome(income) {
  return {
    type: GET_MONTH_INCOME,
    payload: income
  }
}

export function getMonthTotal(total) {
  return {
    type: GET_MONTH_TOTAL,
    payload: total
  }
}

export function getNewMonth(month) {
  return {
    type: GET_MONTH,
    payload: month
  }
}
