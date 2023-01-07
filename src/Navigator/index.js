import React, {useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Auth Stack
import Login from '../Auth/Login';
import Register from '../Auth/Register';

// Main Stack
import Home from '../Screens/Home';

let AuthStack = createStackNavigator();
let MainStack = createStackNavigator();

const navigationOption = () => {
  return {
    headerShown: false,
    headerBackTitleVisible: false,
  };
};

const Navigator = () => {
  const scheme = useColorScheme();

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);

    if (user) {
      const currentUser = JSON.stringify(user?._user);
      AsyncStorage.setItem('currentUser', currentUser).then(() => {});
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      {!user ? (
        <AuthStack.Navigator screenOptions={navigationOption()}>
          <AuthStack.Screen name="login" component={Login} />
          <AuthStack.Screen name="register" component={Register} />
        </AuthStack.Navigator>
      ) : (
        <MainStack.Navigator screenOptions={navigationOption()}>
          <AuthStack.Screen name="home" component={Home} />
        </MainStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
