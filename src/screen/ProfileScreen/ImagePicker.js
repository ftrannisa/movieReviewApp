import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Avatar} from '../../assets';
import {Image, Button, Icon} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Axios from 'axios';
import {API_USER} from '../API';
import ImagePicker from 'react-native-image-picker';

const ChangeImage = () => {
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState('');
  const [token, setToken] = useState('');
  const [filePath, setFilePath] = useState('');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getData();
  }, []);


  const ChooseFile = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setEdit(true);
        setAvatar({uri: `${response.uri}`});
        setFilePath(response);
      }
    });
  };

  const handleUpdateImage = () => {
    let dataFormImage = new FormData();
    dataFormImage.append('image', {
      name: filePath.fileName,
      type: filePath.type,
      uri: filePath.uri,
    });
    try {
      Axios.put(API_USER, dataFormImage, {
        headers: {
          Authorization: token,
          'Content-type': 'multipart/form-data',
        },
      }).then(res => {
        const status = res.data.status;
        if (status == 'success') {
          alert('Update Image Success');
          navigation.navigate('Profile');
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  let avatarImage;
  if (avatar !== null && edit == false) {
    avatarImage = {uri: avatar};
  } else if (edit == true) {
    avatarImage = avatar;
  } else {
    avatarImage = Avatar;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image source={avatarImage} style={styles.profileImage} />
      </View>
      <View style={styles.confirmationButton}>
        <Button
          title="Choose Image"
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={ChooseFile}
        />
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          title="Save"
          onPress={handleUpdateImage}
        />
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          title="Cancel"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default ChangeImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  profileImage: {
    width: 200,
    height: 200,
    maxHeight: 200,
    maxWidth: 200,
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginVertical: 100,
  },
  profileData: {
    marginHorizontal: 30,
  },
  profileDataText: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: 20,
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginVertical: 10,
    paddingBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'column',
    margin: 50,
  },
  button: {
    marginVertical: 15,
    borderRadius: 100,
    backgroundColor: '#FEA800',
    alignSelf: 'center',
    width: 150,
  },
  buttonTitle: {
    color: '#000',
  },
  confirmationButton: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});