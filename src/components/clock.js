import React from 'react';
import moment from 'moment';
require('../../stylesheets/clock');

export default class Clock extends React.Component {
  constructor() {
    super();
    this.state = {
      time: moment()
    };
  }
  componentDidMount() {
      setInterval(() => {
        this.setState({
          time: moment()
        });
      }, 1000);
  }
  render() {
    return (
      <div className='clock'>
        {this.state.time.format('h:mma')}
        <div className='calendar__dateline'>{this.state.time.format('MMM Do')}</div>
      </div>
    );
  }
}
