require('../../stylesheets/main');
import React from 'react';

import { connect } from 'react-redux';

import Video from '../components/video-bg';
import Clock from '../components/clock';
import Calendar from '../containers/calendar-container';
import Weather from '../containers/weather-container';
import Transit from '../containers/transit-container';

require('../../stylesheets/status-bar');

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className='container' >
        <Video />
        <Transit />
        <div className='status-bar' >
          <Weather />
          <Calendar />
          <Clock />
        </div>
      </div>
    );
  }
}
