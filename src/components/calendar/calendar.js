import React from 'react';
import Day from './day';
import moment from 'moment';

import { MINUTE } from '../../constants/time';
require('../../../stylesheets/calendar');

export default class Calendar extends React.Component {
  componentDidMount() {
    let {changeDay} = this.props;
    changeDay(new Date());
    this.timer = setInterval(() => {

    }, MINUTE)
  }
  componentWillUnmount() {
    clearInterval(this.timer); 
  }
  render() {
    let fillerDays = [];
    let days = this.props.calendar.days;
    if (days.length > 0) {
      while (fillerDays.length < days[0].weekday) {
        fillerDays.push(<Day key={fillerDays.length} />);
      }
    }

    let renderedDays = this.props.calendar.days.map((day) => {
      return <Day day={day} key={day.date + fillerDays.length} isActive={day.date===this.props.calendar.day} />
    });
    let t = moment(this.props.calendar.time);

    return (
      <div className='calendar'>
        <ul className='calendar__legend clearfix'>
          <li className='calendar__legend__label'>S</li>
          <li className='calendar__legend__label'>M</li>
          <li className='calendar__legend__label'>T</li>
          <li className='calendar__legend__label'>W</li>
          <li className='calendar__legend__label'>T</li>
          <li className='calendar__legend__label'>F</li>
          <li className='calendar__legend__label'>S</li>
        </ul>
        <div>
          {fillerDays}
          {renderedDays}
        </div>
      </div>
    );
  }
}
