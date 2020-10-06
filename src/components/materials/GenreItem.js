import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

export default function GenreItem({item, navigation}) {
  return (
    <View style={styles.cardView}>
      <TouchableOpacity
      onPress={() =>
        navigation.navigate('MovieByGenre', {
          genre: item.id,
          genreName: item.name,
        })
      }
      >
        <Image
          style={styles.image}
          source={{
            uri: item.image,
          }}
        />
        <View style={styles.overlay} />
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    marginHorizontal: 6,
  },
  image: {
    width: 200,
    height: height / 13,
    borderRadius: 20,
    alignSelf: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(219, 0, 0, 0.7)',
    borderRadius: 20,
  },
  text: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
    letterSpacing: 2,
    position: 'absolute',
    top: 18,
    alignSelf: 'center',
  },
});
