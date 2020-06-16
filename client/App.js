import React, { Component } from 'react';
import { connect } from 'react-redux';
import LongLatTest from './components/LongLatTest';
import NewerMapContainer from './components/NewerMapContainer';
import MapContainer2 from './components/MapContainer2';
import NewMapContainer from './components/NewMapContainer';

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
