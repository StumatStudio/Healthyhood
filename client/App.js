import React, { Component } from 'react';
import { connect } from 'react-redux';
import LongLatTest from './components/experimental/LongLatTest';
import NewerMapContainer from './components/experimental/NewerMapContainer';
import MapContainer2 from './components/experimental/MapContainer2';
import NewMapContainer from './components/experimental/NewMapContainer';
import { usersRequest } from './store/entities/userEntity';

class App extends Component {

  handleClick = () => {
    console.log('inClick');
    this.props.usersRequest('This is the action payload');
  }

  render() {
    console.log(this.props.currentUser);
    console.log('loadFlag', this.props.currentUser.users.isLoading);
    return (
      <div>
        <h1>Hello STUMAT!!!</h1>
        <LongLatTest />
        <NewerMapContainer />
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state,
});

const mapDispatchToProps = dispatch => ({
  usersRequest: payload => dispatch(usersRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
