import React from 'react';
require('../../../stylesheets/routes');

export default class Route extends React.Component {
  render() {
    let departures = this.props.departures.map((time) => {
      return <li className='route__departures__time' key={time} >{time}</li>
    });
    return (
      <div className='route' data-code={this.props.code}>
        <div className='route__label'>{this.props.name}</div>
        <ul className='route__departures'>
          {departures}
        </ul>
      </div>
    );
  }
}
