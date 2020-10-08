import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  SplashScreen,
  WelcomeAuthScreen,
  LoginScreen,
  RegisterScreen,
  AllGenreScreen,
  MovieByGenreScreen,
  DetailMovieScreen,
  SearchScreen,
  AllReviewScreen,
  // MyReviewScreen
} from '../screen';
import MyTabs from '../router/MyTabs';

const Stack = createStackNavigator();

export default AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WelcomeAuth"
          component={WelcomeAuthScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Tab"
          component={MyTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AllGenreScreen"
          component={AllGenreScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MovieByGenre"
          component={MovieByGenreScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Details Screen"
          component={DetailMovieScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Search Screen"
          component={SearchScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="All Review"
          component={AllReviewScreen}
          options={{
            title: 'All Review',
            headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#fff',
          }}
        />
        {/* <Stack.Screen
          name="My Review"
          component={MyReviewScreen}
          options={{
            headerShown: false,
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
