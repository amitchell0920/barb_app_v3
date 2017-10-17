import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PropTypes from 'prop-types';

class Appointment extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchMessage()
  };

  render() {
    return (
      <div>
        <div>{this.props.message}</div>
        // Calendly inline widget begin 
        <div>
          <h2>This is appointments page</h2>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { message: state.auth.message }
}


export default connect(mapStateToProps, actions)(Appointment);

