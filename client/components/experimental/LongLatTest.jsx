import React, { Component } from 'react';
import { connect } from 'react-redux';
import GooglePlacesAutoComplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';

import {
  getYelpData,
  updateUserLocation,
  getWalkData,
  getIqAirData,
  getHealthScore,
  toggleInitialLoad,
} from '../../store/entities/mapEntity';
import WheelLoader from '../common/experimental/WheelLoader/WheelLoader';
import SphereLoader from '../common/experimental/SphereLoader/SphereLoader';

class LongLatTest extends Component {
  /*
    It's most helpful to initiate your state with names of your form fields.
    These object properties will be populated with field input data based one
    name and instantiating them in your state with empty strings avoids a 
    "controlled Component" warning from React
  */
  state = {
    data: {
      lng: -118.470531,
      lat: 33.987854,
    },
  };

  handleGoogleAutocompleteSelect = async (result) => {
    const { place_id } = result;
    const place = await geocodeByPlaceId(place_id);
    const latLng = await getLatLng(place[0]);

    console.log('result', latLng);
    this.props.toggleInitialLoad();
    this.props.updateUserLocation(latLng);
  };

  callApis = async () => {
    console.log('Submitted');
    const {
      getYelpData,
      getWalkData,
      getIqAirData,
      getHealthScore,
    } = this.props;
    const { userEnteredLocation } = this.props.map;

    try {
      const secretSauce = await Promise.all([
        getYelpData(userEnteredLocation),
        getWalkData(userEnteredLocation),
        getIqAirData(userEnteredLocation),
      ]);
    } catch (e) {
      console.log(e.message);
    }

    const {
      yelp: { data: yelpData, isLoading: yelpLoading },
      walk: { data: walkData, isLoading: walkLoading },
      iqAir: { data: iqAirData, isLoading: iqAirLoading },
    } = this.props.map;
    const { restaurants, gyms } = yelpData;

    const secretSauceObj = {
      yelpGyms: gyms.total,
      yelpRestaurants: restaurants.total,
      walkScore: walkData.walkscore,
      iqAirScore: iqAirData.data.current.pollution.aqius,
    };

    getHealthScore(secretSauceObj);
  };

  displayYelpScore = (restaurants, gyms) => {
    return (
      <div className="yelpsdatacontainer">
        <img
          src="http://assets.stickpng.com/images/5842f092a6515b1e0ad75b17.png"
          width="80"
        ></img>
        <div>{`Restaurants: ${restaurants.total}`}</div>
        <div>{`Gyms: ${gyms.total}`}</div>
      </div>
    );
  };

  displayWalkScore = (walkData) => {
    return (
      <img
        className="giveMeData"
        alt="WalkScore Date"
        src={`https://pp.walk.sc/badge/walk/score/${walkData.walkscore}.svg`}
      />
    );
  };

  displayIqAirScore = (iqAirData) => {
    return (
      <div className="iqAirScore">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/7/79/IQAir_logo.png"
          width="100"
        ></img>
        <div>{`${iqAirData.data.current.pollution.aqius}`}</div>
      </div>
    );
  };

  render() {
    const {
      yelp: { data: yelpData, isLoading: yelpLoading },
      walk: { data: walkData, isLoading: walkLoading },
      iqAir: { data: iqAirData, isLoading: iqAirLoading },
      healthScore,
      healthComputed,
      initialLoad,
    } = this.props.map;
    const { restaurants, gyms } = yelpData;

    return (
      <div className="latlongcontainer">
        <div className="healthyscorecontainer">
          <div className="healthyhoodscore">
            {!initialLoad &&
              healthComputed &&
              `Healthyhood Score: ${healthScore}`}
          </div>
          <div className="healthyscoredetailscontainer">
            <div className="yelpscoredetail">
              {yelpLoading && <WheelLoader />}
              {!initialLoad &&
                restaurants &&
                gyms &&
                this.displayYelpScore(restaurants, gyms)}
            </div>
            <div className="walkscoredetail">
              {walkLoading && <SphereLoader />}
              {!initialLoad &&
                walkData.walkscore &&
                this.displayWalkScore(walkData)}
            </div>
            <div className="iqairscoredetail">
              {iqAirLoading && <WheelLoader />}
              {!initialLoad &&
                iqAirData.data &&
                this.displayIqAirScore(iqAirData)}
            </div>
          </div>
        </div>

        <div className="mapcontrolcontainer">
          <GooglePlacesAutoComplete
            withSessionToken={true}
            onSelect={this.handleGoogleAutocompleteSelect}
            placeholder={'Please enter an address...'}
          />
          {!initialLoad && (
            <button className="gethealthbutton" onClick={this.callApis}>
              Get Health
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  map: state.map,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserLocation: (latLongObj) => dispatch(updateUserLocation(latLongObj)),
  getYelpData: (latLongObj) => dispatch(getYelpData(latLongObj)),
  getWalkData: (latLongObj) => dispatch(getWalkData(latLongObj)),
  getIqAirData: (latLongObj) => dispatch(getIqAirData(latLongObj)),
  getHealthScore: (secretSauceObj) => dispatch(getHealthScore(secretSauceObj)),
  toggleInitialLoad: () => dispatch(toggleInitialLoad()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LongLatTest);

// Old Was needed for testing in return statement
{
  /* <div className="formContainer">
<h1>Long Lat Test Form</h1>
<form onSubmit={this.handleSubmit}> Inherits this from Form component
  <h5>Coordinates</h5>
  <div className="row">
    <div className="col">
      {this.renderInput('lng', 'Enter Long:', 'text', '-118.470531')}
    </div>
    <div className="col">
      {this.renderInput('lat', 'Enter Lat:', 'text', '33.987854')}
    </div>
  </div>
  <div>
    {this.renderButton('Submit', 'btnClass')}
  </div>
</form>
</div> */
}
