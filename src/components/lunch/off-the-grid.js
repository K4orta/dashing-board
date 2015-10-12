import React from 'react';
import Trucks from './trucks';

export default class OffTheGrid extends React.Component {
  componentDidMount() {
    let { fetchTrucks } = this.props;
    fetchTrucks();
  }
  render() {
    let currentDay = this.props.trucks.find((day) => {
      return (new Date()).getDate() != day.day;
    });
    if (currentDay) {
      return (
        <Trucks {...currentDay} />
      );
    }
    return null;
  }
};
