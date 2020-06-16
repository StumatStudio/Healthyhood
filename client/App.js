import React, { Component } from 'react';
import { connect } from 'react-redux';
import LongLatTest from './components/experimental/LongLatTest';
import NewerMapContainer from './components/experimental/NewerMapContainer';
import MapContainer2 from './components/experimental/MapContainer2';
import NewMapContainer from './components/experimental/NewMapContainer';

class App extends Component {
  render() {
    console.log(this.props.currentUser);
    return (
      <div>
        <h1>Hello STUMAT!!!</h1>
        {/* <LongLatTest /> */}
        <NewerMapContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state,
});

export default connect(mapStateToProps)(App);
