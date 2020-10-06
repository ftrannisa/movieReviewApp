import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Animated,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import CarouselList from 'react-native-anchor-carousel';
import Axios from 'axios';

const {height, width} = Dimensions.get('window');

export default function PopularMovies({navigation}) {
  const [popular, setPopular] = useState([]);
  const topRatedRef = useRef(null);

  const getPopular = async () => {
    try {
      const res = await Axios.get(
        'https://api.themoviedb.org/3/movie/popular?api_key=90bb3764c9321cec09a9d576cf929c61&language=en-US&page=1',
      );
      if (res !== null) {
        const dataPopular = res.data.results;
        setPopular(dataPopular);
        console.log('masuk ga sih', dataPopular);
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    getPopular();
  }, []);

  const link = 'https://image.tmdb.org/t/p/w500';

  const RenderItem = ({item, navigation}) => {
    return (
      <View style={styles.cardView}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Details Screen', {
              id: item.id,
            })}
        >
          <Image style={styles.image} source={{uri: link + item.poster_path}} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CarouselList
        style={styles.carousel}
        data={popular}
        renderItem={({item}) => {
          return <RenderItem item={item} navigation={navigation} />;
        }}
        itemWidth={200}
        inActiveOpacity={0.2}
        containerWidth={width - 25}
        ref={topRatedRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
  },
  container: {
    height: height / 2.7,
  },
  carousel: {
    flex: 1,
  },
  image: {
    width: 200,
    height: height / 2.7,
    borderRadius: 20,
    alignSelf: 'center',
  },
  text: {
    color: '#fff',
    position: 'absolute',
    bottom: 10,
    left: 5,
  },
});
