import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';
import Item from './GenreItem';

const {height, width} = Dimensions.get('window');

const genres = [
  {
    id: 28,
    name: 'Action',
    image: 'http://image.tmdb.org/t/p/w500/t93doi7EzoqLFckidrGGnukFPwd.jpg',
  },
  {
    id: 12,
    name: 'Adventure',
    image: 'http://image.tmdb.org/t/p/w500/a6cDxdwaQIFjSkXf7uskg78ZyTq.jpg',
  },
  {
    id: 16,
    name: 'Animation',
    image: 'http://image.tmdb.org/t/p/w500/hxt1WzpSqMMDVtjafAXAnMIb0o9.jpg',
  },
  {
    id: 35,
    name: 'Comedy',
    image: 'http://image.tmdb.org/t/p/w500/stmYfCUGd8Iy6kAMBr6AmWqx8Bq.jpg',
  },
  {
    id: 80,
    name: 'Crime',
    image: 'http://image.tmdb.org/t/p/w500/f5F4cRhQdUbyVbB5lTNCwUzD6BP.jpg',
  },
  {
    id: 99,
    name: 'Documentary',
    image: 'http://image.tmdb.org/t/p/w500/mlOXHODw3i8rND1wxmIgT6k5Qh5.jpg',
  },
  {
    id: 18,
    name: 'Drama',
    image: 'http://image.tmdb.org/t/p/w500/AdqOBPw4PdtzOcfEuQuZ8MNeTKb.jpg',
  },
  {
    id: 10751,
    name: 'Family',
    image: 'http://image.tmdb.org/t/p/w500/pNbmSYUtMd542OATplZIdtSWKyz.jpg',
  },
  {
    id: 14,
    name: 'Fantasy',
    image: 'http://image.tmdb.org/t/p/w500/xFxk4vnirOtUxpOEWgA1MCRfy6J.jpg',
  },
  {
    id: 36,
    name: 'History',
    image: 'http://image.tmdb.org/t/p/w500/cqa3sa4c4jevgnEJwq3CMF8UfTG.jpg',
  },
  {
    id: 27,
    name: 'Horror',
    image: 'http://image.tmdb.org/t/p/w500/uZMZyvarQuXLRqf3xdpdMqzdtjb.jpg',
  },
  {
    id: 10402,
    name: 'Music',
    image: 'http://image.tmdb.org/t/p/w500/21Q8bzu10YF9i4O5amBkJBombYo.jpg',
  },
  {
    id: 9648,
    name: 'Mystery',
    image: 'http://image.tmdb.org/t/p/w500/fKtYXUhX5fxMxzQfyUcQW9Shik6.jpg',
  },
  {
    id: 10749,
    name: 'Romance',
    image: 'http://image.tmdb.org/t/p/w500/v4yVTbbl8dE1UP2dWu5CLyaXOku.jpg',
  },
  {
    id: 878,
    name: 'Science Fiction',
    image: 'http://image.tmdb.org/t/p/w500/5myQbDzw3l8K9yofUXRJ4UTVgam.jpg',
  },
  {
    id: 10770,
    name: 'TV Movie',
    image: 'http://image.tmdb.org/t/p/w500/5myQbDzw3l8K9yofUXRJ4UTVgam.jpg',
  },
  {
    id: 53,
    name: 'Thriller',
    image: 'http://image.tmdb.org/t/p/w500/k2WyDw2NTUIWnuEs5gT7wgrCQg6.jpg',
  },
  {
    id: 10752,
    name: 'War',
    image: 'http://image.tmdb.org/t/p/w500/lyKDTdwdbxt2W6GXHATShrrpNyW.jpg',
  },
  {
    id: 37,
    name: 'Western',
    image: 'http://image.tmdb.org/t/p/w500/lvtEcdBmmrxzAQvRIYyDRQDeDJM.jpg',
  },
];
export default function Genre({navigation}) {
  return (
    <FlatList
      data={genres}
      keyExtractor={(item) => `${item.id}`}
      horizontal
      scrollEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => {
        return <Item item={item} navigation={navigation} />;
      }}
    />
  );
}
