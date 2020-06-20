import React, { Component } from 'react';
import Form from '../common/Form';

import { connect } from 'react-redux'
import * as apiActions from '../../store/entities/apiActions';
import { getYelpData, updateUserLocation, getWalkData, getIqAirData, getHealthScore } from '../../store/entities/mapEntity';

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


  doSubmit = async () => {
    console.log('Submitted');
    const { getYelpData, getWalkData, getIqAirData, getHealthScore, updateUserLocation } = this.props;
    updateUserLocation(this.state.data)

    const secretSauce = await Promise.all([
      getYelpData(this.state.data),
      getWalkData(this.state.data),
      getIqAirData(this.state.data),
    ]);

    const { yelpData, walkData, iqAirData } = this.props.map;
    const { restaurants, gyms } = yelpData;

    const secretSauceObj = {
      yelpGyms: gyms.total,
      yelpRestaurants: restaurants.total,
      walkScore: walkData.walkscore,
      iqairscore: iqAirData.data.current.pollution.aqius
    }

    getHealthScore(secretSauceObj);
  }

  render() {
    const { yelpData, walkData, iqAirData, healthScore, healthComputed } = this.props.map;
    const { restaurants, gyms } = yelpData;

    return (
      <div>
        <div>
          <div>{healthComputed && `Your Neighborhood Health Score: ${healthScore}`}</div>
          <div>{restaurants && `Total Restaurants: ${restaurants.total}`}</div>
          <div>{gyms && `Total Gyms: ${gyms.total}`}</div>
          <div>{walkData.walkscore && `Walk Score: ${walkData.walkscore}`}</div>
          <div>{iqAirData.data && `Air Score: ${iqAirData.data.current.pollution.aqius}`}</div>
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
  getIqAirData: latLongObj => dispatch(getIqAirData(latLongObj)),
  getHealthScore: secretSauceObj => dispatch(getHealthScore(secretSauceObj)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LongLatTest);