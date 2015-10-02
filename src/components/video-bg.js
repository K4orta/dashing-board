import React from 'react';
require('../../stylesheets/video');

export default class Video extends React.Component {
  render() {
    let videoId = 'Ibt5Zf7P3vM';
        // <iframe className='bg-video' width="100%" height="100%" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&autohide=0&rel=0&showinfo=0&loop=1&&playlist=${videoId}`} frameBorder="0" allowFullScreen></iframe>
    return (
      <div className='video-overlay'>
        <div className='bg-overlay'></div>
      </div>
    );
  }
}
