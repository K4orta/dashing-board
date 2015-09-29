import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Weather from '../components/weather/weather';
import * as WeatherActions from '../actions/weather-actions';

let mapStateToProps = (state) => {
  return {
    weather: state.weather
  }
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(WeatherActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
