import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Share} from 'react-native'
import {Card, Button, Icon, Image} from 'react-native-elements'
import {
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native-gesture-handler'
import Axios from 'axios'
import moment from 'moment'
import {useNavigation} from '@react-navigation/native'
// import AwesomeAlert from 'react-native-awesome-alerts';
// import Alert from '../Alert';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {colors} from '../../utils/color'

const CardItemDetail = (props) => {
    console.log('isi props details', props)
    const [data, setData] = useState({})
    //   const [alert, setAlert] = useState(false);
    const [genre, setGenre] = useState('')
    const navigation = useNavigation()
    const [id, setID] = useState('')

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

    console.log('data', data)
    return (
        <ScrollView>
            <View>
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
                                <Ionicons
                                    name="caret-forward-circle-outline"
                                    size={40}
                                    color={colors.default}
                                />
                            }
                            type="clear"
                            containerStyle={styles.imageButton}
                            // onPress={() =>
                            //   navigation.navigate('Video Player', {
                            //     video: video,
                            //   })}
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
                                    // onPress={() =>
                                    //   navigation.navigate('All Review', {
                                    //     id: data.id,
                                    //   })}
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
                        <Button
                            icon={
                                <Icon
                                    name="comment-text-outline"
                                    type="material-community"
                                    color="#040303"
                                    style={{marginRight: 10}}
                                />
                            }
                            title={data.vote_count}
                            type="clear"
                            titleStyle={styles.titleButton}
                            onPress={() =>
                                navigation.navigate('All Review', {
                                    id: data.id,
                                })
                            }
                        />
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
})
