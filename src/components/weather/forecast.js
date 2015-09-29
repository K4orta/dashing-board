import React from 'react';
import Day from './day';

export default class Forecast extends React.Component {
  render() {
    let days = this.props.days.map((day) => {
      return <Day day={day} key={day.time} />
    });
    return (
      <div className='forecast'>
        {days}
      </div>
    );
  }
}
