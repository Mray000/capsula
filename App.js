import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from './src/components/Authentication/Login.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authentication} from './src/store/authentication.js';
import {Code} from './src/components/Authentication/Code.js';
import {Filials} from './src/components/Filials/Filials.js';
import {Entry} from './src/components/Entry/Entry.js';
import {ServicesList} from './src/components/Services/ServicesList.js';
import {StylistsList} from './src/components/Stylists/StylistsList.js';
import {Calendar} from './src/components/Calendar/Calendar.js';
import {StylistProfile} from 'components/Stylists/StylistProfile.js';
import {Info} from "./src/components/Info/Info";

const Stack = createNativeStackNavigator();
const App = () => {
  const [is_load, setIsLoad] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
    (async () => {
      let token = await AsyncStorage.getItem('token');
      let phone = await AsyncStorage.getItem('phone');
      if (token) {
        authentication.setToken(token);
        authentication.setPhone(phone);
        authentication.setIsLogin(true);
      }
      setIsLoad(true);
    })();
  }, []);

  if (!is_load) return null;
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {backgroundColor: '#FCFCFC'},
          }}
          initialRouteName="Entry">
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Code" component={Code} />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen name="Entry" component={Entry} />
            <Stack.Screen name="Filials" component={Filials} />
            <Stack.Screen name="ServicesList" component={ServicesList} />
            <Stack.Screen name="StylistsList" component={StylistsList} />
            <Stack.Screen name="StylistProfile" component={StylistProfile} />
            <Stack.Screen name="Calendar" component={Calendar} />
            <Stack.Screen name="Info" component={Info} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
