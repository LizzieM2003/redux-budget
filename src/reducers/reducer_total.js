import { GET_MONTH_TOTAL } from 'actions';

export default function(state=0, action) {
  switch(action.type) {
    case GET_MONTH_TOTAL:
      return action.payload;
    default:
      return state;
  }
}
