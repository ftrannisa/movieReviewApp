import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SearchBar, Icon, Card, Image, Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Axios from 'axios';
import {
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { colors } from '../../utils/color';

const SearchScreen = ({route, navigation}) => {
console.log("route adalah", route)
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState({});

  const onChangeSearch = val => {
    setSearchQuery(val);
  };
  
  useEffect(() => {
    getData();
  }, []);

  const getData = async (val) => {
      console.log("val adalah", val)
    try {
      const res = await Axios.get(`https://api.themoviedb.org/3/search/movie?query=${route.params.val}&api_key=90bb3764c9321cec09a9d576cf929c61`);

      if (res !== null) {
        const dataMovie = res.data.results;
        setData(dataMovie);
        console.log("search bar masuk ga", dataMovie)
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };


  const renderItem = ({item, index}) => (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <TouchableWithoutFeedback onPress={() => detail(item.id)}>
          <Image
            source={{uri: `https://image.tmdb.org/t/p/w500` + item.poster_path}}
            style={styles.image}
          />
        </TouchableWithoutFeedback>
        <Button
          icon={
            <Icon
              type="material-community"
              name="play-circle-outline"
              size={40}
              color={colors.default}
            />
          }
          type="clear"
          containerStyle={styles.imageButton}
          onPress={() =>
            navigation.navigate('Details Screen', {
              id: item.id,
            })}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Text style={styles.commentText}>{item.overview}</Text>
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.allReviewContainer}
          onPress={() =>
            navigation.navigate('Details Screen', {
                id: data.id,
            })
         }>
          <Icon
              name="comment-text-outline"
              type="material-community"
              color="#040303"
              style={{marginRight: 10}}
            />
            <Text style={styles.titleButton}>
             {item.vote_count}
            </Text>
        </TouchableOpacity>
        <Button
          icon={
            <Icon
              name="share-variant"
              type="material-community"
              color="#040303"
              onPress={() =>
                navigation.navigate('Details Screen', {
                  id: item.id,
                })}
            />
          }
          type="clear"
        />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titleSearch}>Results for {route.params.val}</Text>
      <ScrollView>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040303',
  },
  searchContainer: {
    backgroundColor: '#F6F7F7',
    borderRadius: 10,
  },
  searchBarContainer: {
    backgroundColor: '#040303',
    margin: 10,
  },
  titleGenre: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: -0.2,
    color: '#F6F7F7',
  },
  genreDetail: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: -0.2,
    color: '#F6F7F7',
    alignSelf: 'flex-end',
  },
  genreListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  genreListButton: {
    backgroundColor: '#F6F7F7',
    marginHorizontal: 5,
    borderRadius: 6,
  },
  genreListButtonTitle: {
    color: '#040303',
  },
  genreListButtonContainer: {
    marginRight: 5,
  },
  genreListTitle: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: -0.2,
    marginHorizontal: 20,
    marginVertical: 5,
    color: '#F6F7F7',
    textAlign: 'justify',
    alignSelf: 'center',
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 3,
  },
  cardContainer: {
    borderRadius: 20,
  },
  commentText: {
    marginVertical: 15,
    fontFamily: 'Roboto',
    fontSize: 14,
    textAlign: 'justify',
    letterSpacing: -0.2,
    color: '#040303',
  },
  cardButton: {
    marginHorizontal: 10,
  },
  titleButton: {
    fontFamily: 'Roboto',
    fontSize: 14,
    letterSpacing: -0.2,
    color: '#040303',
  },
  imageContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    width: 350,
    height: 170,
  },
  imageButton: {
    position: 'absolute',
    alignSelf: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    marginTop: 5,
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 20,
    letterSpacing: -0.2,
    color: '#040303',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleSearch: {
    fontFamily: 'Roboto',
    fontSize: 20,
    letterSpacing: -0.2,
    color: '#F6F7F7',
    textAlign: 'center',
    margin: 20,
  },
  allReviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});