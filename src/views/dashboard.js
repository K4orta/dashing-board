require('../../stylesheets/main');
import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TimeActions from '../actions/time-actions';

import Video from '../components/video-bg';
import Clock from '../components/clock';
import Calendar from '../containers/calendar-container';
import Weather from '../containers/weather-container';
import Transit from '../containers/transit-container';
import TimedContent from '../components/timed-content';

require('../../stylesheets/status-bar');
const SECOND = 1000
const MINUTE = SECOND * 60;

class Dashboard extends React.Component {
  componentDidMount() {
    let {minuteTick} = this.props;
    this.timer = setInterval(() => {
      minuteTick();
    }, MINUTE);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return (
      <div className='container' >
        <Video />
        <TimedContent startTime={15} endTime={23} {...this.props.time}>
          <Transit />
        </TimedContent>
        <div className='status-bar' >
          <Weather />
          <Calendar />
          <Clock />
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {time: state.time};
}, dispatch => {
  return bindActionCreators(TimeActions, dispatch);
})(Dashboard);