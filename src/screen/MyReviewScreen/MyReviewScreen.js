import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {header} from '../../assets';

const MyReview = () => {
  return (
    <View style={styles.container}>
      <Image source={header} style={styles.header} />
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    paddingTop: 10,
  },
  header: {
    height: 50,
    width: 120,
    marginBottom: 10,
    alignSelf: 'center',
  },
});

export default MyReview;
