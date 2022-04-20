import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

class SignupView extends React.Component {

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

  signupAU() {
    fetch('https://cs571.cs.wisc.edu/users', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ username: this.state.username, password: this.state.password, }) })
    .then(res => res.json()).then(res => {
      if(res.message==="Field password must be 5 characters or longer." || res.message==="Username already taken!" ){
        alert(res.message);
      }else{
        alert(res.message);
        this.props.navigation.navigate("Login");
        
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Fitness Tracker</Text>
        <Text style={styles.title}>New here? Let's get started! Please create an account below</Text>
        <TextInput style={styles.input} placeholder="Username" onChangeText = {this.handleUsername}/>
        <TextInput style={styles.input} placeholder="Password" onChangeText = {this.handlePassword}/>

        <Button title="CREATE ACCOUNT" color="red" onPress={this.signupAU.bind(this)} />
        <Button title="NEVERMIND!" color="red" onPress={() => this.props.navigation.navigate("Login")} />
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

export default SignupView;
