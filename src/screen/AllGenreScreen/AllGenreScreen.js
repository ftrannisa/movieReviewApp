import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import AllGenre from '../../components/materials/AllGenre';
import {header} from '../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AllGenreScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.sectionAction}>
          <Ionicons name="arrow-back-outline" size={25} color="#fff" />
        </TouchableOpacity>
        <Image source={header} style={styles.header} />
      </View>
      <AllGenre style={styles.genreListButton} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    paddingVertical: 10,
  },
  header: {
    height: 50,
    width: 120,
    marginBottom: 10,
  },
  section: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    right: 80,
  },
  sectionAction: {
    alignItems: 'center',
    paddingLeft: 40,
  },
});
