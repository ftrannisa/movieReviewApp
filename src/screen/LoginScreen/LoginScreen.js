import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Button, Input} from '../../components';
import {logo} from '../../assets';
import {colors} from '../../utils/color';
import Axios from 'axios';

const DEVICE = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onChangeEmail = (val) => {
    setEmail(val);
  };

  const onChangePassword = (val) => {
    setPassword(val);
  };

  const handleLogin = async () => {
    try {
      const res = await Axios.post(
        'https://be-kickin.herokuapp.com/api/v1/user/login',
        {
          email: email,
          password: password,
        },
      );

      navigation.navigate('Tab');
    } catch (error) {
      console.log(error);
      alert('Login failed. Please check again your credentials.');
    }
  };

  const handleGoTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
        padding: 30,
      }}>
      <Image
        source={logo}
        style={{
          height: 150,
          width: 150,
          marginBottom: 30,
          alignSelf: 'center',
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        placeholderTextColor="#B4B4B0"
        onChangeText={onChangeEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={onChangePassword}
        placeholderTextColor="#B4B4B0"
      />
      {/* <Button title="Login" onPress={() => handleLogin()} /> */}
      <Button title="Login" onPress={() => handleGoTo('Tab')} />

      <Text
        style={{
          textAlign: 'center',
          fontSize: 11,
          marginTop: 15,
          color: 'white',
        }}
        onPress={() => handleGoTo('Register')}>
        Don't have an account? Sign up
        <Text style={{fontWeight: 'bold'}}> here </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: 'white',
    borderRadius: 25,
    marginBottom: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 14,
    color: 'white',
  },
});

export default LoginScreen;
