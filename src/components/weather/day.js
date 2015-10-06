import React from 'react';
import moment from 'moment';

import weatherIcon from '../../utils/weather-icons';

export default class Day extends React.Component {
  render() {
    let dayName = moment(this.props.day.time * 1000).format('ddd');
    let day = this.props.day;
    return (
      <div className={'day temp--' + Math.round(day.apparentTemperatureMax)}>
        <div className='day__name'>{dayName}</div>
        <div className={'day__icon wi wi-' + weatherIcon(day.icon)}></div>
        <div className={'day__temp' }>{Math.round(day.apparentTemperatureMax)}</div>
      </div>
    );
  }
}
