import React from 'react';
import {Image, Text, View} from 'react-native';
import {logo} from '../../assets';
import {Button} from '../../components';
import {colors} from '../../utils/color';
import ActionButton from './ActionButton';

const WelcomeAuth = ({navigation}) => {
  const handleGoTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.wrapper.page}>
      <Image source={logo} style={styles.wrapper.img} />
      <ActionButton
        desc="If you have an accout, please login"
        title="LOGIN"
        onPress={() => handleGoTo('Login')}
      />
      <ActionButton
        desc="If you don't have an accout, please sign up"
        title="SIGN UP"
        onPress={() => handleGoTo('Register')}
      />
    </View>
  );
};

const styles = {
  wrapper: {
    page: {
      justifyContent: 'center',
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
    },
    img: {
      height: 150,
      width: 150,
      marginBottom: 30,
      alignSelf: 'center',
    },
  },
  text: {
    welcome: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 50,
    },
  },
};

export default WelcomeAuth;
