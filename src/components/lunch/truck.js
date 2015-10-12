import React from 'react';

export default class Truck extends React.Component {
  render() {
    return (
      <div className='lunch__truck'>
        {this.props.name}
      </div>
    );
  }
}
