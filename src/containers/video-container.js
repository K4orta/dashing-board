import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Video from '../components/video-bg';
import * as VideoActions from '../actions/video-actions';

let mapStateToProps = (state) => {
  return {
    video: state.video
  };
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(VideoActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Video);
