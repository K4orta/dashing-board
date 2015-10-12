import React from 'react';
import Truck from './truck';
require('../../../stylesheets/lunch');

export default class Trucks extends React.Component {
  render() {
    let trucks = this.props.vendors.map((truck) => {
      return <Truck name={truck} key={truck} />;
    });
    console.log(this.props);
    return (
      <div className='lunch'>
        {trucks}
      </div>
    );
  }
}
