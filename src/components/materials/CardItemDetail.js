import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Share, TextInput, Dimensions} from 'react-native'
import {Card, Button, Icon, Image} from 'react-native-elements'
import {
    TouchableWithoutFeedback,
    ScrollView,
    TouchableOpacity,
} from 'react-native-gesture-handler'
import Axios from 'axios'
import moment from 'moment'
import {useNavigation} from '@react-navigation/native'
import {colors} from '../../utils/color'
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';

const CardItemDetail = (props) => {
    console.log('isi props details', props)
    const [data, setData] = useState({})
    const [genre, setGenre] = useState('')
    const navigation = useNavigation()
    const [id, setID] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [starRate, setStarRate] = useState(0);
    const [title, setTitle] = useState('');
    const [review, setReview] = useState('');
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;
    const onStarRatingPress = rating => {
        setStarRate(rating);
    };
    const onTitleChange = val => {
        setTitle(val);
    };
    const onReviewChange = val => {
        setReview(val);
    };

    // const handleRatesubmit = async () => {
    //     try {
    //     //   const token = await AsyncStorage.getItem('userToken');
    //       const res = await Axios.post(
    //         `http://damp-dawn-67180.herokuapp.com/${id}`,
    //         {
    //           title: title,
    //           description: review,
    //           rating: starRate,
    //         },
    //         {
    //           headers: {
    //             Authorization: token,
    //           },
    //         },
    //       );
    //       if (res !== null) {
    //         alert('Rate Success');
    //         dispatch({type: SUCCESS});
    //         dispatch({type: COMMENT});
    //       } else {
    //         dispatch({type: FAILED});
    //       }
    //     } catch (error) {
    //       console.log(error, 'error');
    //       dispatch({type: FAILED});
    //     }
    //     console.log(title);
    //     console.log(review);
    //     console.log(starRate);
    //     console.log(id);
    //   };    

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const res = await Axios.get(
                `https://api.themoviedb.org/3/movie/${props.id}?api_key=90bb3764c9321cec09a9d576cf929c61`,
            )
            console.log('res', res)

            if (res !== null) {
                const dataMovie = res.data

                setData(dataMovie)
                setGenre(dataMovie.genres[0].name)
                console.log(genre)
            } else {
                console.log('error')
            }
        } catch (error) {
            console.log(error, 'error')
        }
    }

    const handleShare = async (url) => {
        try {
            const result = await Share.share(
                {
                    message: url,
                    title: 'Hey, check this movie',
                },
                {
                    dialogTitle: 'Share to...',
                },
            )
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('Shared activity')
                } else {
                    console.log('Link copied')
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Share canceled')
            }
        } catch (error) {
            console.log(error)
        }
    }

    // console.log('data carditemdetail', data)
    return (
        <ScrollView>
            <Modal
                animationIn= 'fadeIn'
                animationOut= 'fadeOut'
                isVisible={modalVisible}
                style={styles.modal}
                deviceHeight={deviceHeight}
                deviceWidth={deviceWidth}>
            <View style={styles.modalContainer}>
                <Text style={styles.titleModal}>How do you think about this movie?</Text>
                    <StarRating
                        disabled={false}
                        emptyStar={'ios-star-outline'}
                        fullStar={'ios-star'}
                        iconSet={'Ionicons'}
                        maxStars={10}
                        rating={starRate}
                        selectedStar={rating => onStarRatingPress(rating)}
                        fullStarColor={'rgba(255, 194, 0, 0.98)'}
                        containerStyle={styles.ratingContainerModal}
                    />
                    <Text style={styles.titleModal}>Your Rating: {starRate}</Text>
                    <TextInput
                        placeholder="Write a headline for your review here"
                        placeholderTextColor="#979797"
                        style={styles.inputTitleModal}
                        maxLength={40}
                        onChangeText={val => onTitleChange(val)}
                    />
                    <TextInput
                        placeholder="Write your review here"
                        placeholderTextColor="#979797"
                        style={styles.inputReviewModal}
                        maxLength={200}
                        onChangeText={val => onReviewChange(val)}
                        multiline={true}
                    />
                    <Button
                    title="Submit"
                    buttonStyle={styles.buttonModal}
                    />
                    <Button
                    title="Cancel"
                    buttonStyle={styles.buttonModal}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                    />
                </View>
            </Modal>
            <View >
                <Card containerStyle={styles.cardContainer}>
                    <View style={styles.imageContainer}>
                        <TouchableWithoutFeedback>
                            {data !== undefined && (
                                <Image
                                    source={{
                                        uri:
                                            `https://image.tmdb.org/t/p/w500` +
                                            data.poster_path,
                                    }}
                                    style={styles.image}
                                />
                            )}
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
                              navigation.navigate('Video Player', {
                                id: data.id,
                              })}
                        />
                    </View>
                    <View style={styles.titleDetailContainer}>
                        <Text style={styles.titleDetail}>{data.title}</Text>
                        <Text style={styles.titleGenre}>
                            {moment(data.release_date).format('YYYY')} | {genre}
                        </Text>
                    </View>
                    <View style={styles.commentContainer}>
                        <Image
                            source={{
                                uri:
                                    'https://image.tmdb.org/t/p/w500' +
                                    data.poster_path,
                            }}
                            style={styles.ImagePoster}
                        />
                        <View>
                            <View style={styles.ratingContainer}>
                                <View style={styles.reviewContainer}>
                                    <Icon
                                        type="material-community"
                                        name="star"
                                        size={20}
                                        color="#FED000"
                                        containerStyle={styles.ratingIcon}
                                    />
                                    <Text style={styles.ratingText}>
                                        {data.vote_average}/10
                                    </Text>
                                </View>
                                <Button
                                    title="Rate This"
                                    icon={
                                        <Icon
                                            type="material-community"
                                            name="star"
                                            size={20}
                                            color="#979797"
                                        />
                                    }
                                    onPress={() => setModalVisible(true)} 
                                    type="clear"
                                    buttonStyle={styles.buttonRating}
                                    containerStyle={
                                        styles.buttonRatingContainer
                                    }
                                    titleStyle={styles.buttonTitle}
                                />
                            </View>
                            <View style={styles.commentTextContainer}>
                                <Text style={styles.commentText}>
                                    {data.overview}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerButton}>
                        <TouchableOpacity
                            style={styles.allReviewContainer}
                            onPress={() =>
                                navigation.navigate('All Review', {
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
                                {data.vote_count}
                            </Text>
                        </TouchableOpacity>
                        <Button
                            icon={
                                <Icon
                                    name="share-variant"
                                    type="material-community"
                                    color="#040303"
                                />
                            }
                            type="clear"
                            onPress={() => handleShare(data.homepage)}
                        />
                    </View>
                </Card>
            </View>
            
        </ScrollView>
    )
}

export default CardItemDetail

const styles = StyleSheet.create({
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        paddingTop: 3,
    },
    cardContainer: {
        borderRadius: 20,
        margin: 5,
    },
    commentText: {
        marginTop: 10,
        marginBottom: 5,
        fontFamily: 'Roboto',
        fontSize: 13,
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
    allReviewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    image: {
        width: 350,
        height: 170,
    },
    imageButton: {
        position: 'absolute',
        alignSelf: 'center',
    },
    titleDetailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        marginTop: 15,
        borderBottomWidth: 1,
    },
    titleDetail: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 24,
        letterSpacing: -0.2,
        color: '#040303',
        maxWidth: 210,
    },
    titleGenre: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: -0.2,
        color: '#040303',
        alignSelf: 'center',
        maxWidth: 150,
    },
    ImagePoster: {
        width: 120,
        height: 180,
    },
    commentContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        paddingRight: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginLeft: 100,
    },
    buttonRating: {
        flexDirection: 'column',
    },
    buttonRatingContainer: {
        alignSelf: 'center',
    },
    reviewContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        marginRight: 15,
    },
    ratingIcon: {
        alignSelf: 'center',
    },
    ratingText: {
        alignSelf: 'center',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#040303',
        letterSpacing: -0.2,
    },
    buttonTitle: {
        fontFamily: 'Roboto',
        fontSize: 14,
        letterSpacing: -0.2,
        color: '#040303',
    },
    commentTextContainer: {
        marginHorizontal: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        width: 220,
    },
    containerModal: {
        flex: 1,
      },
      modal: {
        backgroundColor: 'black',
        borderRadius: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        maxHeight: 500,
        position: 'absolute',
      },
      modalContainer: {
        margin: 20,
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
      },
      titleModal: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: -0.2,
        color: 'white',
        textAlign: 'center',
        marginVertical: 10,
      },
      inputTitleModal: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        textAlign: 'justify',
      },
      inputReviewModal: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        maxHeight: 150,
        height: 101,
        textAlign: 'justify',
        textAlignVertical: 'top',
      },
      buttonModal: {
        borderRadius: 20,
        alignSelf: 'center',
        width: 150,
        margin: 8,
        backgroundColor: colors.default,
      },
      ratingContainerModal: {
        alignSelf: 'center',
      },
})
