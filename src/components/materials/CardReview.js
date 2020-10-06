import React, {useState, useEffect} from 'react';
import {Card, Image, Icon} from 'react-native-elements';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import Axios from 'axios';

const CardReview = (props) => {
    console.log("props all review", props)
  const [data, setData] = useState([]);
  
  useEffect(() => {
    getData();
  });

  const getData = async () => {
    try {
      const res = await Axios.get(`https://api.themoviedb.org/3/movie/${props.id}/reviews?api_key=90bb3764c9321cec09a9d576cf929c61&language=en-US&page=1`);
      if (res !== null) {
        const dataMovie = res.data.results;
        setData(dataMovie);
        console.log("data item all review", data)
      } else {
        console.log('error');
             }
    } catch (error) {
      console.log(error, 'error');
     
    }
  };

  const renderItem = ({item, index}) => (
    <View>
    <Card containerStyle={styles.container}>
      <View>
        <Text style={styles.title} >{item.author}</Text>
        <Text style={styles.comment} >{item.content}</Text>
      </View>
    </Card>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

export default CardReview;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'justify',
    textAlignVertical: 'top',
    letterSpacing: -0.2,
    color: '#000',
    top: -3,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  comment: {
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'Roboto',
    fontSize: 13,
    textAlign: 'justify',
    letterSpacing: -0.2,
    color: '#040303',
  },
  container: {
    borderRadius: 20,
    margin: 10,
  },
});