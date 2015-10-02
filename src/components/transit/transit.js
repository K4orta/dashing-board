import React from 'react';
import Direction from './direction';
require('../../../stylesheets/transit');

export default class Transit extends React.Component {
  componentDidMount() {
    let { fetchMuni, fetchBart } = this.props;
    fetchMuni();
    fetchBart();
  }
  render() {
    let muni = this.props.transit.muni.map((direction, i) => {
      return <Direction {...direction} key={'muni-' + i} />
    });
    console.log(this.props.transit.bart);
    let bart = this.props.transit.bart.map((direction, i) => {
      return <Direction {...direction} key={'bart-' + i} />
    });
    return (
      <div className='transit'>
        <div className='row'>
          <div className='col'>
            {muni}
          </div>
          <div className='col'>
            {bart}
          </div>
        </div>
      </div>
    );
  }
}
