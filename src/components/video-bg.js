import React from 'react';
import { MINUTE, HOUR } from '../constants/time';

require('../../stylesheets/video');

export default class Video extends React.Component {
  componentDidMount() {
    let { fetchVideo, changeVideo } = this.props;
    fetchVideo();
    this.timer = setInterval(() => {
      fetchVideo();
    }, MINUTE);

    this.secondTimer = setInterval(() => {
      changeVideo();
    }, HOUR);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    clearInterval(this.secondTimer);
  }
  render() {
    let videoId = this.props.videoId;
    return (
      <div className='video-overlay'>
        <iframe className='bg-video' width="100%" height="100%" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&autohide=0&rel=0&showinfo=0&loop=1&&playlist=${videoId}`} frameBorder="0" allowFullScreen></iframe>
        <div className='bg-overlay'></div>
      </div>
    );
  }
}
