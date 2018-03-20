import {connect} from 'react-redux';
import NavigatorView from './NavigatorView';

export default connect(state => ({
  navigator: state.navigator
}))(NavigatorView);