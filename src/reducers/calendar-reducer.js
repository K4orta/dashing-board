import {
  CHANGE_DAY
} from '../actions/calendar-actions';

export default (state = {
  time: 0,
  day: 0,
  month: 0,
  days: []
}, action) => {
  switch (action.type) {
    case CHANGE_DAY:
      let date = new Date(action.time);
      let month = date.getMonth();
      let day = date.getDate();
      let days = state.days;

      if (month !== state.month) {
        days = generateMonth(date.getFullYear(), month);
      }

      return Object.assign({}, {
        time: action.time.getTime(),
        day: day,
        month: month,
        days: days
      });
    default:
      return state;
  }
};

function generateMonth(year, month) {
  let days = [];
  let cDate = new Date(year, month, 1);
  while (cDate.getMonth() === month) {
    days.push({
      weekday: cDate.getDay(),
      date: cDate.getDate()
    });
    cDate = new Date(year, month, cDate.getDate() + 1);
  }

  return days;
}
