import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, TextInput, KeyboardAvoidingView} from 'react-native';
import {Avatar} from '../../assets/';
import {Image, Button, Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import { colors } from '../../utils/color';
import {header} from '../../assets';
import { ScrollView } from 'react-native-gesture-handler';


const Profile = () => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    nama: '',
    email: '',
  });
  const [avatar, setAvatar] = useState('');
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState('');
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error, 'error');
    }
  };



  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
      console.log("token profile", token)
      const res = await Axios.get(`http://damp-dawn-67180.herokuapp.com/user/id`, {
        headers: {
          access_token: token,
        },
      });
      console.log('res profile', res)
      if (res !== null) {
        const data = res.data.User_Data;
        setState({
          email: data.email,
        });
        setUsername(data.nama);
        setAvatar(data.profileImage);
      } else {
        console.log('error');
      }
    } catch (err) {
      console.log(err, 'error');
    }
  };

 
  const handleChangeUsername = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setUserToken(token);
    console.log("token username", token)
    // let dataForm = new FormData();
    // dataForm.append('nama', username);
    try {
      const res = await Axios.put(`http://damp-dawn-67180.herokuapp.com/user/edit`, {
        headers: {
          access_token: token,
        },
      });
      console.log("res profile changed", res)
      if (res !== null) {
        const data = res.data.User_Data;
        setUsername(data.nama);
        // setAvatar(data.profileImage);
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeUsername = val => {
    setUsername(val);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  let avatarImage;
  if (avatar !== null) {
    avatarImage = {uri: avatar};
  } else {
    avatarImage = Avatar;
  }
  let editBar;
  if (edit == true) {
    editBar = (
      <View style={styles.username} behavior="height">
        <TextInput
          style={styles.inputBox}
          placeholder="Username"
          placeholderTextColor="#B4B4B0"
          selectionColor="#B4B4B0"
          defaultValue={username}
          onChangeText={onChangeUsername}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Icon
            name="content-save"
            type="material-community"
            size={25}
            containerStyle={[styles.usernameIcon, {marginRight: 10}]}
            color="#fff"
            onPress={handleChangeUsername}
          />
          <Icon
            name="close-circle"
            type="material-community"
            size={25}
            containerStyle={styles.usernameIcon}
            color="#fff"
            onPress={handleEdit}
          />
        </View>
      </View>
    );
  } else {
    editBar = (
      <View style={styles.username}>
        <Text style={styles.profileDataTextName}>
          {username !== null ? username : 'Name'}
        </Text>
        <Icon
          name="circle-edit-outline"
          type="material-community"
          size={25}
          containerStyle={styles.usernameIcon}
          color="#fff"
          onPress={handleEdit}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image source={header} style={styles.header} />
      <ScrollView>
      <View style={styles.profileImageContainer}>
        <Image source={Avatar} style={styles.profileImage} />
        <Icon
          type="material-community"
          name="account-edit"
          size={25}
          color="#fff"
          containerStyle={styles.icon}
          // onPress={() => navigation.navigate('Edit Image')}
        />
      </View>
      <View style={styles.profileData}>
        <Text style={styles.title}>
          {username !== null ? username : 'Name'}
        </Text>
        {editBar}
        <Text style={styles.profileDataText}>
          {state.email !== null ? state.email : 'Email'}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          title="Logout"
          onPress={handleLogout}
        />
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 10,
  },
  header: {
    height: 50,
    width: 120,
    alignSelf: 'center',
    position: 'relative'
  },
  profileImage: {
    width: 100,
    height: 100,
    maxHeight: 250,
    maxWidth: 250,
    borderRadius: 100,
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginLeft: 10
  },
  profileData: {
    marginHorizontal: 30,
  },
  profileDataText: {
    color: '#F6F7F7',
    fontFamily: 'Roboto',
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F6F7F7',
    marginVertical: 10,
    paddingBottom: 5,
  },
  profileDataTextName: {
    color: '#F6F7F7',
    fontFamily: 'Roboto',
    fontSize: 20,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  username: {
    borderBottomWidth: 1,
    borderBottomColor: '#F6F7F7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingBottom: 5,
  },
  usernameIcon: {
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    margin: 50,
  },
  button: {
    backgroundColor: colors.default,
    borderRadius: 25,
    paddingVertical: 15,
    marginHorizontal: 10,
    marginBottom: 15,
    alignSelf: 'center',
    width: 180
  },
  buttonTitle: {
    color: 'white',
    fontSize: 12,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  title: {
    color: '#F6F7F7',
    fontFamily: 'Roboto',
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center',
    marginVertical: 10,
    top: -20,
  },
  icon: {
    alignSelf: 'flex-end',
    top: -20,
    left: -10,
    backgroundColor: colors.default,
    borderRadius: 50,
  },
  inputBox: {
    fontFamily: 'Roboto',
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    color: '#F6F7F7',
    padding: 0,
  },
});
