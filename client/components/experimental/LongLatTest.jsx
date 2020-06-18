import React, { Component } from 'react';
import Form from '../common/Form';

import { connect } from 'react-redux'
import * as apiActions from '../../store/entities/apiActions';
import { getYelpData } from '../../store/entities/mapEntity';
import { getWalkData } from '../../store/entities/mapEntity';

class LongLatTest extends Form {
  /*
    It's most helpful to initiate your state with names of your form fields.
    These object properties will be populated with field input data based one
    name and instantiating them in your state with empty strings avoids a 
    "controlled Component" warning from React
  */
  state = {
    data: {
      longitude: '',
      latitude: '',
    },
  }

  doSubmit = () => {
    console.log('Submitted');
    console.log('state', this.state.data);
    this.props.getYelpData(this.state.data);
    this.props.getWalkData(this.state.data);
  }

  render() {
    return (
      <div className="formContainer">
        <h1>Long Lat Test Form</h1>
        <form onSubmit={this.handleSubmit}> {/*Inherits this from Form component*/}
          <h5>Coordinates</h5>
          <div className="row">
            <div className="col">
              {this.renderInput('longitude', 'Enter Long:', 'text', 'Enter Long coords')}
            </div>
            <div className="col">
              {this.renderInput('latitude', 'Enter Lat:', 'text', 'Enter Lat coords')}
            </div>
          </div>
          <div>
            {this.renderButton('Submit', 'btnClass')}
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getYelpData: latLongObj => dispatch(getYelpData(latLongObj)),
  getWalkData: latLongObj => dispatch(getWalkData(latLongObj)),
})

export default connect(null, mapDispatchToProps)(LongLatTest);