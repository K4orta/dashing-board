import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Transit from '../components/transit/transit';
import * as TransitActions from '../actions/transit-actions';

let mapStateToProps = (state) => {
  return {
    transit: state.transit
  };
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(TransitActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Transit);
