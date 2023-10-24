import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Button, View } from 'react-native';
import InputView from './InputView';
import DisplayView from './DisplayView';

// Import necessary Firebase functions
import { initializeApp, getApps } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2eMMfToONxQWICk99vGdGAw2zrJUFTWo",
  authDomain: "inno2-7e420.firebaseapp.com",
  projectId: "inno2-7e420",
  storageBucket: "inno2-7e420.appspot.com",
  messagingSenderId: "34529192707",
  appId: "1:34529192707:web:a3ceae51882021affb5736",
  measurementId: "G-QX682WX4SK"
};

// Check if there are no apps initialized yet, then initialize Firebase
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
  console.log("Firebase On!");
}

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Go to Input View"
        onPress={() => navigation.navigate('Inputview')}
      />
      <Button
        title="Go to Display View"
        onPress={() => navigation.navigate('Displayview')}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Inputview" component={InputView} />
        <Stack.Screen name="Displayview" component={DisplayView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
