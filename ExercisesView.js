import React from "react";
import { AppRegistry, TouchableOpacity, Image, Animated, ScrollView, Modal, Pressable, StyleSheet, Text, View, Button, TextInput } from "react-native";
import ListItemSwipeable from "react-native-elements/dist/list/ListItemSwipeable";

class ExercisesView extends React.Component {
  constructor() {
    super();

    this.state = {
      valueArray: [],
      disabled: false,
      modalVisible: false,
      modalVisible2: false,
      ExerciseName: '',
      ExerciseD: '',
      ExerciseC: '',
      ren: false,
      id:0,
    }
    this.index = 0;
    this.animatedValue = new Animated.Value(0);
  }


  setName = (text) => {
    this.setState({ ExerciseName: text })
  }
  setDuration = (text) => {
    this.setState({ ExerciseD: text })
  }
  setCalory = (text) => {
    this.setState({ ExerciseC: text })
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  setModalVisible2 = (visible, number) => {
    this.setState({ modalVisible2: visible });
    this.setState({id: number});
  }


  Add() {
    var date = new Date();
    fetch('https://cs571.cs.wisc.edu/activities/', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-access-token': this.props.token }, body: JSON.stringify({ name: this.state.ExerciseName, duration: this.state.ExerciseD, calories: this.state.ExerciseC, date: date }) })
      .then(res => res.json()).then(res => {
        if (res.message === "Activity created!") {
          alert(res.message);
          this.setState({ modalVisible: false });
          this.addMore();
          this.retrieve();
        } else {
          alert(res.message);
        }
      });
  }

  addMore = () => {
    this.animatedValue.setValue(0);
    let newlyAddedValue = { index: this.index }
    this.setState({ disabled: true, valueArray: [...this.state.valueArray, newlyAddedValue] }, () => {
      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }
      ).start(() => {
        this.index = this.index + 2;
        this.setState({ disabled: false });
      });
    });
  }
  async retrieve() {
    await fetch('https://cs571.cs.wisc.edu/activities/', { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-access-token': this.props.token } })
      .then(res => res.json()).then(res => {
        for (var i = 0; i < res.activities.length; i++) {
          this.state.valueArray[i] = res.activities[i];
        }
        this.setState({ ren: true });
      });

  }
  edit() {
    
    var date = new Date();
    fetch('https://cs571.cs.wisc.edu/activities/'  +this.state.id , { method: 'PUT', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-access-token': this.props.token }, body: JSON.stringify({ name: this.state.ExerciseName, duration: this.state.ExerciseD, calories: this.state.ExerciseC, date: date }) })
    .then(res => res.json()).then(res => {
      if (res.message === "Activity updated!") {
        alert(res.message);
        this.setState({ modalVisible2: false });
        for (var i = 0; i < this.state.valueArray.length; i++) {
          if (this.state.id == this.state.valueArray[i].id) {
            this.state.valueArray[i].name = this.state.ExerciseName;
             this.state.valueArray[i].duration = this.state.ExerciseD;
             this.state.valueArray[i].calories = this.state.ExerciseC;
          }
        }
        this.forceUpdate();
      } else {
        alert(res.message);
      }
    });
  }
  delete(item) {
    fetch('https://cs571.cs.wisc.edu/activities/' + item.id, { method: 'DELETE', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-access-token': this.props.token } })
      .then(res => res.json()).then(res => {
        alert(res.message);
      });
    for (var i = 0; i < this.state.valueArray.length; i++) {
      if (item.id == this.state.valueArray[i].id) {
        this.state.valueArray.splice(i, 1)
      }
    }
    this.forceUpdate();
  }
  componentDidMount() {
    this.retrieve();
  }
  render() {
    const { modalVisible } = this.state;
    const { modalVisible2 } = this.state;
    const animationValue = this.animatedValue.interpolate(
      {
        inputRange: [0, 1],
        outputRange: [-59, 0]
      });
    let newArray = this.state.valueArray.map((item, key) => {
      if ((key) == this.index) {
        return (
          <Animated.View key={key} style={[styles.viewHolder, { opacity: this.animatedValue, transform: [{ translateY: animationValue }] }]}>
            <Text style={styles.headerText}>Row {item.index}</Text>
          </Animated.View>
        );
      }
      else {
        return (

          <View key={key} style={styles.viewHolder}>
            <Text style={styles.headerText}> {item.name}</Text>
            <Text style={styles.headerText}> Date: {item.date}</Text>
            <Text style={styles.headerText}> Calories Burnt: {item.calories}</Text>
            <Text style={styles.headerText}> Duration: {item.duration} minutes</Text>
            <Button
              title="Edit"
              onPress={() => this.setModalVisible2(!modalVisible2, item.id)}
            />
            <Button
              title="Delete"
              onPress={() => { this.delete(item) }}
            />
          </View>
        );
      }

    });


    return (
      <View style={styles.container}>
        <Text style={styles.header}>Exercises</Text>
        <Text style={styles.title}>Let's get to work!</Text>
        <Text style={styles.title}>Record your exercises below</Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.mid}>Exercise Details</Text>

              <Text style={styles.text}>Exercise Name</Text>
              <TextInput style={styles.input} placeholder="Username" onChangeText={this.setName} />

              <Text style={styles.text}>Duration (minutes)</Text>
              <TextInput style={styles.input} placeholder="Username" onChangeText={this.setDuration} />

              <Text style={styles.text}>Calories Burnt</Text>
              <TextInput style={styles.input} placeholder="Username" onChangeText={this.setCalory} />
              <Text style={styles.mid}>Looks good! Ready to save your work?</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={this.Add.bind(this)}
              >
                <Text style={styles.textStyle}>Save Exercise</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Never Mind!</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible2(!modalVisible2);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.mid}>Exercise Details</Text>

              <Text style={styles.text}>Exercise Name</Text>
              <TextInput style={styles.input} placeholder="something" onChangeText={this.setName} />

              <Text style={styles.text}>Duration (minutes)</Text>
              <TextInput style={styles.input} placeholder="something" onChangeText={this.setDuration} />

              <Text style={styles.text}>Calories Burnt</Text>
              <TextInput style={styles.input} placeholder="something" onChangeText={this.setCalory} />
              <Text style={styles.mid}>Looks good! Ready to save your work?</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={this.edit.bind(this)}
              >
                <Text style={styles.textStyle}>Save Exercise</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible2(!modalVisible2)}
              >
                <Text style={styles.textStyle}>Never Mind!</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Add Exercises</Text>
        </Pressable>

        <ScrollView>
          <View style={{ marginVertical: 100, padding: 40}}>
            {
              newArray
            }
          </View>
        </ScrollView>

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
    marginVertical: 5,
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
    fontSize: 50,
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
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  viewHolder: {
    height: 255,
    backgroundColor: '#ff4081',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4
  },
  headerText: {
    color: 'white',
    fontSize: 25
  },
  buttonDesign: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    resizeMode: 'contain',
    width: '100%',
  }
});
export default ExercisesView;
