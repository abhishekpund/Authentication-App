import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import firebase from 'firebase';
import { Button , Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;

        // When user presses button.
        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword( email, password )
        .then(this.onLoginSuccess.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword( email, password )
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this));
        });
    }

    onLoginSuccess () {
        this.setState({ email: '', password: '', error: '', loading: false });
    }

    onLoginFail () {
        this.setState({ error: 'Authentication Failed.', loading: false });
    }

    renderButton () {
        if (this.state.loading) {
            return <Spinner size='small'/>;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Log in
            </Button>
        );
    }

    render () {
        return (
            <Card>
                <CardSection>
                    <Input
                        label='Email:'
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })}
                        placeholder='user@email.com'
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label='Password:'
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })}
                        placeholder='password'
                        secureTextEntry={true}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                   {this.state.error} 
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    errorTextStyle: {
        fontSize: 18,
        color: 'red',
        alignSelf: 'center'
    }
});

export default LoginForm;