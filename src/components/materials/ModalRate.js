import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, Dimensions, KeyboardAvoidingView} from 'react-native';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import { colors } from '../../utils/color';


const ModalRate = () => {
  //   const [isModalVisible, setModalVisible] = useState(false);
  const [starRate, setStarRate] = useState(0);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  const onStarRatingPress = rating => {
    setStarRate(rating);
  };
  const onTitleChange = val => {
    setTitle(val);
  };
  const onReviewChange = val => {
    setReview(val);
  };

  return (
    
    <Modal
      isVisible={true}
      style={styles.modal}
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>How do you think about this movie?</Text>
        <StarRating
          disabled={false}
          emptyStar={'ios-star-outline'}
          fullStar={'ios-star'}
          iconSet={'Ionicons'}
          maxStars={10}
          rating={starRate}
          selectedStar={rating => onStarRatingPress(rating)}
          fullStarColor={'rgba(255, 194, 0, 0.98)'}
          containerStyle={styles.ratingContainer}
        />
        <Text style={styles.title}>Your Rating: {starRate}</Text>
        <TextInput
          placeholder="Write a headline for your review here"
          placeholderTextColor="#979797"
          style={styles.inputTitle}
          maxLength={40}
          onChangeText={val => onTitleChange(val)}
        />
        <TextInput
          placeholder="Write your review here"
          placeholderTextColor="#979797"
          style={styles.inputReview}
          maxLength={200}
          onChangeText={val => onReviewChange(val)}
          multiline={true}
        />
        <Button
          title="Submit"
          buttonStyle={styles.button}
        />
        <Button
          title="Cancel"
          buttonStyle={styles.button}
        />
      </View>
    </Modal>
  );
};

export default ModalRate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    backgroundColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    maxHeight: 500,
    position: 'absolute',
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: -0.2,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
  },
  modalContainer: {
    margin: 20,
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  inputTitle: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    textAlign: 'justify',
  },
  inputReview: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    maxHeight: 150,
    height: 101,
    textAlign: 'justify',
    textAlignVertical: 'top',
  },
  button: {
    borderRadius: 25,
    alignSelf: 'center',
    width: 150,
    margin: 10,
    backgroundColor: colors.default,
  },
  ratingContainer: {
    alignSelf: 'center',
  },
});