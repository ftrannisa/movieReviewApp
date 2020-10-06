// BELUM EDIT

import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const EditPassword = () => {
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const navigation = useNavigation();

  const onChangePassword = val => {
    setPassword(val);
  };

  const onChangeCPassword = val => {
    setCPassword(val);
  };

  // const handleChangePassword = async () => {
  //   if (password == cPassword) {
  //     try {
  //       const token = await AsyncStorage.getItem('userToken');
  //       Axios.put(
  //         API_PASSWORD,
  //         {
  //           password: password,
  //         },
  //         {
  //           headers: {
  //             Authorization: token,
  //           },
  //         },
  //       ).then(res => {
  //         const status = res.data.status;
  //         if (status == 'success') {
  //           navigation.navigate('Profile');
  //         } else {
  //           alert('Failed')
  //         }
  //       });
  //     } catch (error) {
  //       console.log(error, 'error');
  //     }
  //   } else {
  //     alert('Failed')
  //   }
  //   console.log(password);
  //   console.log(cPassword);
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.text}
          placeholder="New Password"
          placeholderTextColor="#fff"
          secureTextEntry={true}
          underlineColorAndroid="#fff"
          onChangeText={val => onChangePassword(val)}
        />
        <TextInput
          style={styles.text}
          placeholder="Confirm New Password"
          placeholderTextColor="#fff"
          secureTextEntry={true}
          underlineColorAndroid="#fff"
          onChangeText={val => onChangeCPassword(val)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Submit"
          buttonStyle={styles.button}
          onPress={handleChangePassword}
          titleStyle={styles.titleButton}
        />
        <Button
          title="Cancel"
          buttonStyle={styles.button}
          onPress={() => navigation.goBack()}
          titleStyle={styles.titleButton}
        />
      </View>
    </View>
  );
};

export default EditPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    backgroundColor: 'grey',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    textAlign: 'left',
  },
  inputContainer: {
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    margin: 20,
    paddingBottom: 10,
  },
  button: {
    borderRadius: 25,
    alignSelf: 'center',
    width: 150,
    margin: 10,
    backgroundColor: '#FEA800',
  },
  buttonContainer: {
    marginVertical: 10,
  },
  titleButton: {
    color: '#040303',
  },
});