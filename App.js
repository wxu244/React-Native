import 'react-native-gesture-handler';
import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import LoginView from "./LoginView";
import SignupView from "./SignupView";
import ProfileView from "./ProfileView";
import ExercisesView from "./ExercisesView";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';

// Review the navigators from React Native 2 lecture.
const Stack = createStackNavigator(); // Stack Navigator (https://reactnavigation.org/docs/stack-navigator)
const Tab = createBottomTabNavigator(); // Bottom Tabs Navigator (https://reactnavigation.org/docs/tab-based-navigation)
const Drawer = createDrawerNavigator(); // Drawer Navigator (https://reactnavigation.org/docs/drawer-navigator)

class App extends React.Component {
  constructor() {
    super();

    // Feel free to add more states here
    this.state = {
      accessToken: undefined,
    };
  }

  // Set the access token
  setAccessToken = (newAccessToken) => {
    this.setState({ accessToken: newAccessToken });
  };

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {/* We only want to show Login and Signup View when the user is not logged in.
              When the user is logged in, we want to show the Profile View and the Exercises View.
              
              How do we do this? See https://reactnavigation.org/docs/auth-flow
            */}
          <Stack.Screen name="Login">
            {/* This is how you pass props (e.g. setAccessToken) to another component */}
            {(props) => (
              <LoginView {...props} setAccessToken={this.setAccessToken} />
            )}
          </Stack.Screen>

          {/* If you do not need to pass props, you can pass a component as a `component` prop to Screens like below */}
          <Stack.Screen name="SignUp" component={SignupView} />

          {/* We can also nest another navigator (e.g. Bottom Tabs, Drawer, etc.) inside a stack navigator.
              See https://reactnavigation.org/docs/nesting-navigators on how to nest navigators.
            */}
          <Stack.Screen name="Profile" options={({ navigation, route }) => ({
          headerTitle: "dw",
                    headerRight: () => (
                      <Button
                        onPress={() => navigation.navigate("Login")}
                        title="Log Out"
                        color="blue"
                      />
                    )
        })}>
            {(props,route) => <Home {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
// headerTitle: "dw",
//           headerRight: () => (
//             <Button
//               onPress={() => navigation.navigate("SignUp")}
//               title="Log Out"
//               color="blue"
//             />
//           ),
function Home({route}) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="profile" children={props => <ProfileView  token = {route.params.token} username = {route.params.username} {...props} />} />
      <Tab.Screen name="tracker" children={props => <ExercisesView  token = {route.params.token} username = {route.params.username} {...props} />} />
    </Tab.Navigator>
  );
}
export default App;
