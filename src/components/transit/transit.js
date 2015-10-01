import React from 'react';

export default class Transit extends React.Component {
  componentDidMount() {
    let { fetchMuni } = this.props;
    fetchMuni();
  }
  render() {
    return (
      <div className='transit'>
        
      </div>
    );
  }
}
