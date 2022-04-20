import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

class ProfileView extends React.Component {
  state = {
    firstname: ' ',
    lastname: ' ',
    Dcalories: '0',
    Dprotein: '0',
    Dcarbs: '0',
    Dfat: '0',
    Dactivity: '0',
  };


  handleFirstname = (text) => {
    this.setState({ firstname: text })
  }
  handleLastname = (text) => {
    this.setState({ lastname: text })
  }
  handleDcalories = (text) => {
    this.setState({ Dcalories: text })
  }
  handleDprotein = (text) => {
    this.setState({ Dprotein: text })
  }
  handleDcarbs = (text) => {
    this.setState({ Dcarbs: text })
  }
  handleDfat = (text) => {
    this.setState({ Dfat: text })
  }
  handleDactivity = (text) => {
    this.setState({ Dactivity: text })
  }
  update() {
    fetch('https://cs571.cs.wisc.edu/users/' + this.props.username, { method: 'PUT', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-access-token': this.props.token }, body: JSON.stringify({ firstName: this.state.firstname, lastName: this.state.lastname, goalDailyCalories: this.state.Dcalories, goalDailyProtein: this.state.Dprotein, goalDailyCarbohydrates: this.state.Dcarbs, goalDailyFat: this.state.Dfat, goalDailyActivity: this.state.Dactivity }) })
      .then(res => res.json())
      .then(res => {
        if (res.message === "User has been updated!") {
          alert(res.message);
        } else {
          alert(res.message);
        }
      });
  }

  componentDidMount() {
    fetch('https://cs571.cs.wisc.edu/users/' + this.props.username, { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-access-token': this.props.token } })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          alert(res.message);
        } else {
          this.setState({ Dcalories: JSON.stringify(res.goalDailyCalories)});
          this.setState({ Dprotein: JSON.stringify(res.goalDailyProtein)});
          this.setState({ Dcarbs: JSON.stringify(res.goalDailyCarbohydrates)});
          this.setState({ Dfat: JSON.stringify(res.goalDailyFat)});
          this.setState({ Dactivity: JSON.stringify(res.goalDailyActivity)});
          this.setState({ firstname: res.firstName});
          this.setState({ lastname: res.lastName});
        }
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>About Me</Text>
        <Text style={styles.title}>Let's get to know you! Specify your information below </Text>
        <Text style={styles.mid}>Personal Information</Text>
        <Text style={styles.text}>First Name</Text>
        <TextInput style={styles.input} value={this.state.firstname}  onChangeText={this.handleFirstname} />
        <Text style={styles.text}>Last Name</Text>
        <TextInput style={styles.input} value={this.state.lastname} onChangeText={this.handleLastname} />
        <Text style={styles.mid}>Fitness Goals</Text>
        <Text style={styles.text}>Daily Calories (kcal)</Text>
        <TextInput style={styles.input} value={this.state.Dcalories} onChangeText={this.handleDcalories} />
        <Text style={styles.text}>Daily Protein (grams)</Text>
        <TextInput style={styles.input} value={this.state.Dprotein} onChangeText={this.handleDprotein} />
        <Text style={styles.text}>Daily Carbs (grams)</Text>
        <TextInput style={styles.input} value={this.state.Dcarbs} autoFocus = {true}onChangeText={this.handleDcarbs} />
        <Text style={styles.text}>Daily Fat (grams)</Text>
        <TextInput style={styles.input} value={this.state.Dfat} onChangeText={this.handleDfat} />
        <Text style={styles.text}>Daily Activity (mins)</Text>
        <TextInput style={styles.input} value={this.state.Dactivity} onChangeText={this.handleDactivity} />
        <Button
          title="Save Profile"
          onPress={this.update.bind(this)}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginHorizontal: 30,
    marginVertical: 10,
  },
  title: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    height: 40,
    marginHorizontal: 80,
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  mid: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
    marginVertical: 10,
  }
});

export default ProfileView
