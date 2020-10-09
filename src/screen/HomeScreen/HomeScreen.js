import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import {SearchBar, Button, Icon} from 'react-native-elements';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {header} from '../../assets';
import Axios from 'axios';
import {colors} from '../../utils/color';
import {useNavigation} from '@react-navigation/native';
import Genre from '../../components/materials/GenreHome';
import TopRatedMovies from '../../components/materials/TopRatedMovies';
import PopularMovies from '../../components/materials/PopularMovies';


const {height, width} = Dimensions.get('window');
console.disableYellowBox = true;

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const handleGoTo = (screen) => {
    navigation.navigate(screen);
  };

  const onChangeSearch = (val) => {
    setSearchQuery(val);
  };

  const handleSearch = (title) => {
    navigation.navigate("Search Screen", {
      val: title,
    });
  };

  return (
    <View style={styles.container}>
      <Image source={header} style={styles.header} />
      <ScrollView>
        <SearchBar
          placeholder="Search movies"
          inputContainerStyle={styles.inputContainer}
          containerStyle={styles.searchBarContainer}
          value={searchQuery}
          onChangeText={onChangeSearch}
          onSubmitEditing={() => handleSearch(searchQuery)}
          navigation={navigation}
        />
        <View style={styles.section}>
          <Text style={styles.textSection}>Genre</Text>
          <TouchableOpacity
            onPress={() => handleGoTo('AllGenreScreen')}
            style={styles.sectionAction}>
            <Icon type="material-community"
                                name="arrow-right"
                                size={25}
                                color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.genreListContainer}>
          <Genre navigation={navigation} />
        </View>
        <View style={styles.titleSection}>
          <Text style={styles.textSection}>Top Rated Movies</Text>
        </View>
        <TopRatedMovies navigation={navigation} />

        <View style={styles.titleSection}>
          <Text style={styles.textSection}>Popular Movies</Text>
        </View>
        <PopularMovies navigation={navigation} />
        <View style={styles.endSection}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  header: {
    height: 50,
    width: 120,
    marginBottom: 10,
    alignSelf: 'center',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  searchBarContainer: {
    backgroundColor: 'black',
    paddingVertical: 10,
  },
  textSection: {
    color: 'white',
    fontSize: 18,
    letterSpacing: 2,
    marginLeft: 5,
    marginTop: 10,
    fontFamily: 'Roboto',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingBottom: 8,
  },
  sectionAction: {
    paddingRight: 10,
  },
  titleSection: {
    paddingVertical: 20,
  },
  endSection: {
    paddingBottom: 30,
  },
  genreListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  genreListButton: {
    backgroundColor: colors.default,
    marginHorizontal: 6,
    paddingRight: 7,
    borderRadius: 20,
  },
  genreListButtonTitle: {
    color: 'white',
    paddingHorizontal: 8,
  },
});

export default Home;
