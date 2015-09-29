import React from 'react';
import Forecast from './forecast';
require('../../../stylesheets/weather');

export default class Weather extends React.Component {
  componentDidMount() {
    let { fetchWeather } = this.props;
    fetchWeather();
  }
  render() {
    return (
      <div className='weather'>
        <Forecast days={this.props.weather.daily} />
      </div>
    );
  }
};
