import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CardReview from '../../components/materials/CardReview';

const Review = (props) => {
    console.log("props all review", props)
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.cardReview}>
          <CardReview id={props.route.params.id} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 20,
  },
  buttonStyle: {
    borderRadius: 100,
  },
  button: {
    borderRadius: 100,
    width: 135,
  },
  titleReview: {
    alignItems: 'center',
    margin: 10,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
  },
  cardReview: {
    alignItems: 'center',
    flexDirection: 'column',
    margin: 10,
  },
});