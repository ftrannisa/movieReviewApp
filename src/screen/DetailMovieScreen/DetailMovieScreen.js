import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
// import {SearchBar, Icon} from 'react-native-elements';
import CardItemDetail from '../../components/materials/CardItemDetail';
// import AwesomeAlert from 'react-native-awesome-alerts';
// import Alert from '../Alert';
import {header} from '../../assets';


const DetailMovie = (props) => {
  console.log("props details", props)
  return (
    <View style={styles.container}>
        <Image source={header} style={styles.header} />
        <CardItemDetail id={props.route.params.id} />
      {/* <Alert />  */}
    </View>
  );
};

export default DetailMovie;

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
  searchContainer: {
    backgroundColor: '#F6F7F7',
    borderRadius: 10,
  },
  searchBarContainer: {
    backgroundColor: '#040303',
    margin: 10,
  },
});