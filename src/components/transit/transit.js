import React from 'react';
import Direction from './direction';
require('../../../stylesheets/transit');

export default class Transit extends React.Component {
  componentDidMount() {
    let { fetchMuni, fetchBart } = this.props;
    fetchMuni();
    fetchBart();
    // fetchMuni();
  }
  render() {
    let muni = this.props.transit.muni.map((direction) => {
      return <Direction {...direction} />
    });
    let bart = [];
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
