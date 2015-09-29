import React from 'react';

export default class Day extends React.Component {
  render() {
    let addedClasses = '';
    if (this.props.day) {
      addedClasses += ' active-month';
    }
    if (this.props.isActive) {
      addedClasses += ' current';
    }
    return (
      <div className={'calendar__day' + addedClasses} ></div>
    );
  }
}
