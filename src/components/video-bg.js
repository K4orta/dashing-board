import React from 'react';
import randomVideo from '../utils/random-live-video';
require('../../stylesheets/video');

export default class Video extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    let videoId = randomVideo();
    return (
      <div className='video-overlay'>
        <iframe className='bg-video' width="100%" height="100%" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&autohide=0&rel=0&showinfo=0&loop=1&&playlist=${videoId}`} frameBorder="0" allowFullScreen></iframe>
        <div className='bg-overlay'></div>
      </div>
    );
  }
}
