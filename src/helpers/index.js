import { store } from '../app';

import { getMonth } from 'db';
import { initialiseApp } from 'actions';

export function initialiseMonthData(month) {
  getMonth(month)
    .then(data => {
      if (data) {
        store.dispatch(initialiseApp(data));
      } else {
        const newMonthData = {
          expenses: [],
          income: [],
          month: month,
          total: 0
        }
        store.dispatch(initialiseApp(newMonthData));
      }
    })
    .catch(error => {
      console.log('Error!');
      console.log(error);
    });
}
