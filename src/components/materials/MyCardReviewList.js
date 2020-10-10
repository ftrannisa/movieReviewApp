// import React, {useState, useEffect} from 'react';
// import {Card, Image, Icon, Button} from 'react-native-elements';
// import {View, StyleSheet, Text} from 'react-native';
// import Avatar from '../assets/avatar.png';
// import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
// import Axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';
// import moment from 'moment';
// import {API_IMAGE, API_MOVIE} from '../API';
// import {useNavigation} from '@react-navigation/native';
// import { colors } from '../../utils/color';

// const MyCardReviewList = () => {
//   const [review, setReview] = useState([]);
//   const [useToken, setUserToken] = useState('');
//   const navigation = useNavigation();
//   useEffect(() => {
//     getData();
//   });
//   const getData = async () => {
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       setUserToken(token);
//       const res = await Axios.get(
//         'https://movie-review-apps-mp-team-g.herokuapp.com/api/v1/user/review',
//         {
//           headers: {
//             Authorization: token,
//           },
//         },
//       );

//       if (res !== null) {
//         const data = res.data.data.responsePayload;
//         setReview(data);
//       } else {
//         console.log('error');
//       }
//     } catch (error) {
//       console.log(error, 'error');
//     }
//   };

//   const commentEdit = id => {
//     dispatch({type: DETAIL, payload: id});
//   };

//   const handleDelete = async id => {
//     try {
//       const res = await Axios.delete(
//         `https://movie-review-apps-mp-team-g.herokuapp.com/api/v1/dmovies/${id}/review`,
//         {
//           headers: {
//             Authorization: useToken,
//           },
//         },
//       );

//       if (res !== null) {
//         const status = res.data.status;
//         if (status == 'success') {
//           alert('Delete Success');
//         } else {
//           alert('Delete failed')
//         }
//       }
//     } catch (error) {
//       console.log(error, 'error');
//     }
//   };

//   const detail = id => {
//     dispatch({type: DETAIL, payload: id});
//     navigation.navigate('Home Details');
//   };

//   const renderItem = ({item, index}) => (
//     <Card containerStyle={styles.container}>
//       <View style={styles.titleReview}>
//         <View style={styles.titleLeft}>
//           <TouchableWithoutFeedback onPress={() => detail(item.movieId)}>
//             <Image
//               source={{uri: `${API_IMAGE}${item.detailMovie.poster_path}`}}
//               style={styles.titleImage}
//             />
//           </TouchableWithoutFeedback>
//         </View>
//         <View style={styles.titleRight}>
//           <TouchableWithoutFeedback onPress={() => detail(item.movieId)}>
//             <Text style={styles.title}>
//               {item.detailMovie.title} (
//               {moment(item.detailMovie.release_date).format('YYYY')})
//             </Text>
//           </TouchableWithoutFeedback>
//           <Text style={styles.userCredit}>
//             Reviewed {moment(item.createdAt).format('LL')}
//           </Text>
//           <View style={styles.ratting}>
//             <Icon
//               type="material-community"
//               name="star"
//               size={20}
//               color="rgba(255, 194, 0, 0.98)"
//               containerStyle={styles.ratingIcon}
//             />
//             <Text style={styles.ratingText}>{item.rating}/10</Text>
//           </View>
//           <View style={styles.buttonContainer}>
//             <Button
//               type="clear"
//               icon={
//                 <Icon
//                   type="material-community"
//                   name="pencil-circle"
//                   size={30}
//                   color={colors.default}
//                 />
//               }
//               buttonStyle={styles.button}
//               onPress={() => commentEdit(item.movieId)}
//             />
//             <Button
//               type="clear"
//               icon={
//                 <Icon
//                   type="material-community"
//                   name="delete-circle"
//                   size={30}
//                   color={colors.default}
//                 />
//               }
//               buttonStyle={styles.button}
//               onPress={() => handleDelete(item.movieId)}
//             />
//           </View>
//         </View>
//       </View>
//       <View style={styles.commentContainer}>
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.comment}>{item.description}</Text>
//       </View>
//     </Card>
//   );

//   return (
//     <View>
//       <FlatList
//         data={review}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//       />
//     </View>
//   );
// };

// export default MyCardReviewList;

// const styles = StyleSheet.create({
//   titleReview: {
//     flexDirection: 'row',
//   },
//   creditContainer: {
//     flexDirection: 'row',
//     marginHorizontal: 5,
//   },
//   titleContainer: {
//     flexDirection: 'row',
//   },
//   ratting: {
//     flexDirection: 'row',
//     marginVertical: 10,
//   },
//   titleImage: {
//     width: 80,
//     height: 120,
//   },
//   title: {
//     fontFamily: 'Roboto',
//     fontWeight: 'bold',
//     fontSize: 18,
//     textAlign: 'justify',
//     textAlignVertical: 'top',
//     letterSpacing: -0.2,
//     color: '#000',
//   },
//   ratingText: {
//     textAlign: 'justify',
//     marginHorizontal: 5,
//     alignSelf: 'center',
//   },
//   userCredit: {
//     fontFamily: 'Roboto',
//     fontSize: 14.5,
//     textAlign: 'justify',
//     letterSpacing: -0.2,
//     color: '#000',
//   },
//   commentContainer: {
//     marginVertical: 10,
//   },
//   comment: {
//     fontFamily: 'Roboto',
//     fontSize: 12,
//     textAlign: 'justify',
//     letterSpacing: -0.2,
//     color: '#000',
//     marginTop: 7,
//   },
//   container: {
//     width: 325,
//     borderRadius: 20,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//   },
//   titleRight: {
//     marginHorizontal: 15,
//     marginBottom: 10,
//   },
//   button: {
//     alignSelf: 'flex-start',
//   },
// });