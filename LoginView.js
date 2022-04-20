import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import base64 from "base-64"; // Use this library to encode `username:password` to base64

class LoginView extends React.Component {
  // Use Basic access authentication (https://en.wikipedia.org/wiki/Basic_access_authentication) to authenticate the user.
  // React Native 1 lecture covered a good example of how to do this.
  
  state = {
    username: '',
    password: ''
 };

 handleUsername = (text) => {
  this.setState({ username: text })
}
handlePassword = (text) => {
  this.setState({ password: text })
}


  loginAU() {
    fetch('https://cs571.cs.wisc.edu/login', { method: 'GET', headers: { 'Authorization': 'Basic ' + base64.encode(this.state.username + ":" + this.state.password) } })
      .then(res => res.json()).then(res => {
        if (res.token) {
          this.props.navigation.navigate("Profile", {token: res.token, username: this.state.username}); }
        else {
          alert("Incorrect username or password! Please try again.");
        }
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Fitness Tracker</Text>
        <Text style={styles.title}>Welcome! Please login or signup to continue.</Text>
        <TextInput style={styles.input} placeholder="Username"  onChangeText = {this.handleUsername} />
        <TextInput style={styles.input} placeholder="Password"  onChangeText = {this.handlePassword} />

        {/* To navigate to another component, use this.props.navigation.navigate().
            See https://reactnavigation.org/docs/navigating for more details.
          */}
        <Button title="Login" color="red" onPress={this.loginAU.bind(this)} />
        <Button title="Signup" color="red" onPress={() => this.props.navigation.navigate("SignUp")} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  title: {
    textAlign: "center",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    height: 40,
    marginVertical: 10,
  },
  header: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
});

export default LoginView;
