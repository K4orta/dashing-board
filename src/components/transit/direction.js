import React from 'react';
import Route from './route';
export default class Direction extends React.Component {
  render() {
    let routes = this.props.routes.map((route) => {
      return <Route {...route} key={route.code} />
    });
    return (
      <div className='transit__direction'>
        <div className='transit__direction__label'>
          {this.props.name}
        </div>
        {routes}
      </div>
    );
  }
}
