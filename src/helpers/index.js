import store  from 'configureStore';

import { getMonth } from 'db';
import { initialiseApp } from 'actions';

export function initialiseMonthData(month) {
  getMonth(month)
    .then(data => {
      if (data) {
        console.log(data);
        store.dispatch(initialiseApp(data));
      } else {
        const newMonthData = {
          expenses: [],
          income: [],
          month: month,
          total: 0
        }
        console.log(newMonthData);
        store.dispatch(initialiseApp(newMonthData));
      }
    })
    .catch(error => {
      console.log('Error!');
      console.log(error);
    });
}
