import React, { Component } from 'react';
import { connect } from 'react-redux';
import LongLatTest from './components/LongLatTest';

class App extends Component {
  render() {
    console.log(this.props.currentUser);
    return (
      <div>
        <h1>Hello STUMAT!!!</h1>
        <LongLatTest />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state,
});

export default connect(mapStateToProps)(App);
