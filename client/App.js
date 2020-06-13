import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    console.log(this.props.currentUser);
    return <h1>Hello STUMAT!!!</h1>;
  }
}

const mapStateToProps = state => ({
  currentUser: state,
});

export default connect(mapStateToProps)(App);
