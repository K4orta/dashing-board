import React from 'react';

export default class TimeContent extends React.Component {
  render() {
      let time = this.props.time.getHours();
      let content;
      if (time >= this.props.startTime && time < this.props.endTime) {
        content = this.props.children;
      }
    return (
      <div className='timed-content'>
        {content}
      </div>
    );
  }
}
