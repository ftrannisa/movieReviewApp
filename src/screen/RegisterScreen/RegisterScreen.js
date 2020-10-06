import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {ActionButton, Button} from '../../components';
import {logo} from '../../assets';
import {colors} from '../../utils/color';
import Axios from 'axios';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeName = (val) => {
    setName(val);
  };

  const onChangeEmail = (val) => {
    setEmail(val);
  };

  const onChangePassword = (val) => {
    setPassword(val);
  };

  const handleRegister = async () => {
    console.log(name);
    console.log(email);
    console.log(password);

    try {
      const res = await Axios.post(
        'https://be-kickin.herokuapp.com/api/v1/user/register',
        {
          name: name,
          email: email,
          password: password,
        },
      );
      console.log('tes');
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
        padding: 30,
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
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
        placeholder="Name"
        placeholderTextColor="#B4B4B0"
        onChangeText={onChangeName}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#B4B4B0"
        keyboardType="email-address"
        onChangeText={onChangeEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={onChangePassword}
        placeholderTextColor="#B4B4B0"
      />
      <Button title="Daftar" onPress={() => handleRegister()}></Button>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 11,
          marginTop: 22,
          color: 'white',
        }}
        onPress={() => handleGoTo('Login')}>
        Do you have an account? Login
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

export default Register;
