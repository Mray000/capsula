import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from './src/screens/authentication/login.js';
import {Code} from './src/screens/authentication/code.js';
import {Filials} from './src/screens/filials/Filials.js';
import {Entry} from './src/screens/entry/entry.js';
import {ServicesList} from './src/screens/servises/ServicesList.js';
import {StylistsList} from './src/screens/stylist/StylistsList.js';
import {Calendar} from './src/screens/calendar/Calendar.js';
import {StylistProfile} from 'screens/stylist/StylistProfile.js';
import {Info} from './src/screens/information/Info';
import {Profile} from './src/screens/profile/Profile';
import {Settings} from './src/screens/profile/Settings';
import {PreLogin} from './src/screens/profile/PreLogin';
import {Scores} from './src/screens/profile/Scores';
import {EntryDetails} from './src/screens/profile/EntryDetails';
import {EditEntry} from './src/screens/profile/EditEntry';
import {CreateEntry} from './src/screens/entry/createEntry';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from './src/redux/store';
import {authMe} from './src/redux/authReducer';
import {getProfileInfoTC} from './src/redux/profileReducer';
import {EntryCode} from './src/screens/entry/entryCode';
import {CurrentSale} from './src/screens/entry/currentSale';
import {NoInternetModal} from 'utils/NoInternetModal';
import {useNetInfo} from '@react-native-community/netinfo';
import {getAllFilialsTC} from './src/redux/filialsReducer';

const Stack = createNativeStackNavigator();
const App = () => {
  const dispatch = useDispatch();
  const netInfo = useNetInfo();
  const {id} = useSelector(state => state?.auth);
  const {app_color} = useSelector(state => state?.common);
  useEffect(() => {
    if (id) dispatch(getProfileInfoTC(id));
  }, [id]);

  useEffect(() => {
    SplashScreen.hide();
    dispatch(authMe());
    dispatch(getAllFilialsTC());
  }, []);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: app_color}}>
        <StatusBar
          backgroundColor={app_color}
          barStyle={app_color == 'black' ? 'light-content' : 'dark-content'}
        />
        <NavigationContainer>
          <NoInternetModal
            open={netInfo.details ? !netInfo?.isInternetReachable : false}
          />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: {backgroundColor: '#FCFCFC'},
            }}
            initialRouteName="Entry">
            <Stack.Group>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Code" component={Code} />
              <Stack.Screen name="PreLogin" component={PreLogin} />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen name="Entry" component={Entry} />
              <Stack.Screen name="CreateEntry" component={CreateEntry} />
              <Stack.Screen name="CurrentSale" component={CurrentSale} />
              <Stack.Screen name="EntryCode" component={EntryCode} />

              <Stack.Screen name="Filials" component={Filials} />

              <Stack.Screen name="ServicesList" component={ServicesList} />
              <Stack.Screen name="StylistsList" component={StylistsList} />
              <Stack.Screen name="StylistProfile" component={StylistProfile} />

              <Stack.Screen name="Calendar" component={Calendar} />

              <Stack.Screen name="Info" component={Info} />

              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="Scores" component={Scores} />
              <Stack.Screen name="EntryDetails" component={EntryDetails} />
              <Stack.Screen name="EditEntry" component={EditEntry} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

export default App;

export const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
