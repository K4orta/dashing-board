import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Lunch from '../components/lunch/off-the-grid';
import * as LunchActions from '../actions/lunch-actions';

let mapStateToProps = (state) => {
  return state.lunch;
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(LunchActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Lunch);
