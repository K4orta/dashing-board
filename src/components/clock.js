import React from 'react';
import moment from 'moment';
require('../../stylesheets/clock');

export default class Clock extends React.Component {
  constructor() {
    super();
    this.state = {
      time: this._currentFormattedTime()
    };
  }
  componentDidMount() {
      setInterval(() => {
        this.setState({
          time: this._currentFormattedTime()
        });
      }, 1000);
  }
  render() {
    return (
      <div className='clock'>
        {this.state.time}
      </div>
    );
  }
  _currentFormattedTime() {
    return moment().format('h:mma');
  }
}
