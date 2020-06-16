import React, { Component } from 'react';
import Form from '../common/Form';

import { connect } from 'react-redux'
import * as apiActions from '../../store/entities/apiActions';

class LongLatTest extends Form {
  /*
    It's most helpful to initiate your state with names of your form fields.
    These object properties will be populated with field input data based one
    name and instantiating them in your state with empty strings avoids a 
    "controlled Component" warning from React
  */
  state = {
    data: {
      longitute: '',
      latitude: '',
    },
  }

  doSubmit = () => {
    console.log('Submitted:', this.state.data)
  }

  render() {
    return (
      <div className="formContainer">
        <h1>Long Lat Test Form</h1>
        <form onSubmit={this.handleSubmit}> {/*Inherits this from Form component*/}
          <h5>Coordinates</h5>
          <div className="row">
            <div className="col">
              {this.renderInput('longitute', 'Enter Long:', 'text', 'Enter Long coords')}
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
  apiStart: () => dispatch(apiActions.apiCallRequested({ url: '/api' })),
})

export default connect(null, mapDispatchToProps)(LongLatTest);