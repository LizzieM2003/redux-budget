const uuidV1 = require('uuid/v1');

import { GET_MONTH_INCOME } from 'actions';

export default function(state=[], action) {
  switch(action.type) {
    case GET_MONTH_INCOME:
      return action.payload;
    default:
        return state;
  }
}
