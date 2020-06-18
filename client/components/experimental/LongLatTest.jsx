import React, { Component } from 'react';
import Form from '../common/Form';

import { connect } from 'react-redux'
import * as apiActions from '../../store/entities/apiActions';
import { getYelpData, updateUserLocation, getWalkData } from '../../store/entities/mapEntity';

class LongLatTest extends Form {
  /*
    It's most helpful to initiate your state with names of your form fields.
    These object properties will be populated with field input data based one
    name and instantiating them in your state with empty strings avoids a 
    "controlled Component" warning from React
  */
  state = {
    data: {
      lng: '',
      lat: '',
    },
  }

  renderRestaurantTotal = (busnArr) => {
    return <h5>{`Total Restaurants: ${busnArr.total}`}</h5>
  }

  renderGymTotal = (busnArr) => {
    return <h5>{`Total Gyms: ${busnArr.total}`}</h5>
  }

  doSubmit = () => {
    console.log('Submitted');
    console.log('state', this.state.data);
    this.props.updateUserLocation(this.state.data)
    this.props.getYelpData(this.state.data);
    this.props.getWalkData(this.state.data);
  }

  render() {
    const { yelpData, walkData } = this.props.map;
    const { restaurants, gyms } = yelpData;
    return (
      <div>
        <div>
          {restaurants && this.renderRestaurantTotal(restaurants)}
          {gyms && this.renderGymTotal(gyms)}
        </div>

        <div className="formContainer">
          <h1>Long Lat Test Form</h1>
          <form onSubmit={this.handleSubmit}> {/*Inherits this from Form component*/}
            <h5>Coordinates</h5>
            <div className="row">
              <div className="col">
                {this.renderInput('lng', 'Enter Long:', 'text', 'Enter Long coords')}
              </div>
              <div className="col">
                {this.renderInput('lat', 'Enter Lat:', 'text', 'Enter Lat coords')}
              </div>
            </div>
            <div>
              {this.renderButton('Submit', 'btnClass')}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  map: state.map,
})

const mapDispatchToProps = dispatch => ({
  updateUserLocation: latLongObj => dispatch(updateUserLocation(latLongObj)),
  getYelpData: latLongObj => dispatch(getYelpData(latLongObj)),
  getWalkData: latLongObj => dispatch(getWalkData(latLongObj)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LongLatTest);