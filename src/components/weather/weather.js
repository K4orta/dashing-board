import React from 'react';
import Forecast from './forecast';
import { HOUR } from '../../constants/time';
require('../../../stylesheets/weather');

export default class Weather extends React.Component {
  componentDidMount() {
    let { fetchWeather } = this.props;
    fetchWeather();
    this.timer = setInterval(() => {
      fetchWeather();
    }, HOUR / 2);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return (
      <div className='weather'>
        <Forecast days={this.props.weather.daily} />
      </div>
    );
  }
};
