import moment from 'moment';

import { GET_MONTH } from 'actions';

const month = moment().format('MMMM YYYY');

export default function(state = month, action) {
  switch (action.type) {
    case GET_MONTH:
      return action.payload;
    default:
      return state;
  }
}
