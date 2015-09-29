import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Calendar from '../components/calendar/calendar';
import * as calendarActions from '../actions/calendar-actions';

let mapStateToProps = (state) => {
  return {
    calendar: state.calendar
  }
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(calendarActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
