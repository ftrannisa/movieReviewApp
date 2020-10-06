import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Share} from 'react-native';
import {Button, Card, Image} from 'react-native-elements';
import {
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../utils/color';


const MovieByGenre = (props) => {
  console.log("aa", props)
  const [data, setData] = useState([]);
  const [genre, setGenre] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    console.log("", genre)
    try {
      const res = await Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=90bb3764c9321cec09a9d576cf929c61&sort_by=popularity.desc&page=1&with_genres=${props.route.params.genre}`);
      if (res !== null) {
        const dataMovie = res.data.results;
        setData(dataMovie);
        console.log('tes', dataMovie)
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };


  const renderItem = ({item, index}) => (
    console.log("render item movie by", item),
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <TouchableWithoutFeedback 
        onPress={() =>
          navigation.navigate('Details Screen', {
            id: item.id,
          })}
        >
          <Image
            source={{uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path,}}
            style={styles.image}
          />
        </TouchableWithoutFeedback>
        <Button
          icon={
            <Ionicons name="caret-forward-circle-outline" size={40} color={colors.default} />
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
        <Button
          icon={
            <Ionicons name="chatbubbles-outline" color="#040303" style={{marginRight: 10}}/>
          }
          title={item.vote_count}
          type="clear"
          titleStyle={styles.titleButton}
          onPress={() =>
            navigation.navigate('Details Screen', {
              id: item.id,
            })}
            // harusnya ini All Review guyssss
        />
        <Button
          icon={
            <Ionicons name="share-social-outline"color="#040303" size={20}  />
        }  
        type="clear"
        onPress={() =>
          navigation.navigate('Details Screen', {
            id: item.id,
          })}
        />
      </View>
    </Card>
  );


  return (
    <View style={styles.container}>
      <View style={styles.genreListContainer}>
      </View>
      <View style={{paddingBottom: 20}}>
        <Text style={styles.genreListTitle}> Top {props.route.params.genreName} Movies</Text>
      </View>
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

export default MovieByGenre;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040303',
  },
  genreListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  genreListTitle: {
  color: 'white',
  textAlign: 'center',
  fontSize: 18,
  fontFamily: 'Roboto'
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 3,
  },
  cardContainer: {
    borderRadius: 20,
    paddingBottom: 10,
  },
  commentText: {
    marginVertical: 15,
    fontFamily: 'Roboto',
    fontSize: 14,
    textAlign: 'justify',
    letterSpacing: -0.2,
    color: '#040303',
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
    letterSpacing: 1,
    color: '#040303',
    textAlign: 'center',
    fontWeight: 'bold'
  },
});