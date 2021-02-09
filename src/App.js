import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Spinner, Button } from './components/common';
import LoginForm from './components/Loginform';

class App extends Component {

  state = { loggedIn: null };

  UNSAFE_componentWillMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyBTUaVJ6Q-lpcSnfZSUJfCOl_5m5T4Lwg8",
      authDomain: "new-authentication-1b9f9.firebaseapp.com",
      projectId: "new-authentication-1b9f9",
      storageBucket: "new-authentication-1b9f9.appspot.com",
      messagingSenderId: "146659276559",
      appId: "1:146659276559:web:53d50e446ea17acb32307a",
      measurementId: "G-J1SGF2LHTF"
    };

    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
        if(user) {
          this.setState({ loggedIn: true });
        } else {
          this.setState({ loggedIn: false });
        }
    });
  }

  renderContent () {
    switch (this.state.loggedIn) {
      case true:
        return (
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
        );
      case false:
        return <LoginForm/>;
      default:
        return <Spinner/>;
    }
  }
  render () {
    return (
      <View>
        <Header headerText='Authentication'/>
        {this.renderContent()}
      </View>
    );
  }
}

export default App;