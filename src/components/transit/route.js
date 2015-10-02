import React from 'react';

export default class Route extends React.Component {
  render() {
    console.log(this.props);
    let departures = this.props.departures.map((time) => {
      return <li className='route__departures__time'>{time}</li>
    });
    return (
      <div className='route'>
        <div className='route__label'>{this.props.name}</div>
        <ul className='route__departures'>
          {departures}
        </ul>
      </div>
    );
  }
}
