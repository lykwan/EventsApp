import { connect } from 'react-redux';
import GroupIndex from './group_index';

const mapStateToProps = state => {
  return {
    groups: state.groups.groups
  };
};

export default connect(
  mapStateToProps
)(GroupIndex);
