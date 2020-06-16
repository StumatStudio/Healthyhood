import React, { Component } from 'react';
import { connect } from 'react-redux';
import LongLatTest from './components/LongLatTest';
import MapContainer from './components/MapContainer';

class App extends Component {
  render() {
    console.log(this.props.currentUser);
    return (
      <div>
        <h1>Hello STUMAT!!!</h1>
        <LongLatTest />
        <MapContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state,
});

export default connect(mapStateToProps)(App);
