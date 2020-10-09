
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import YouTube from 'react-native-youtube';
import {header} from '../../assets';
import Axios from 'axios';


const YouTubeScreen = ({route}) => {
    const [video, setVideo] = useState('')

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const id = route.params.id
        try {
            const res = await Axios.get(
                `https://api.themoviedb.org/3/movie/${id}/videos?api_key=90bb3764c9321cec09a9d576cf929c61&language=en-US`
            )
            console.log('res', res)

            if (res !== null) {
                const dataVideo = res.data.results[0]
                setVideo(dataVideo.key)
            } else if (dataVideo == null) {
                alert("Movie has no trailer")
            } 
            else {
                console.log('error')
            }
        } catch (error) {
            console.log(error, 'error')
        }
    }

    const YTubeApi = 'AIzaSyDeQojP5P2dQkVzDwI_22E7GgMyjJXkCSs'
    const url = {video}

    return (
        <View style={{backgroundColor: 'black', flex: 1, padding: 10}}>
            <Image source={header} style={styles.header} />
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={styles.textSection}>Trailer</Text>
                <YouTube
                apiKey={YTubeApi}
                videoId={video} // The YouTube video ID
                play // control playback of video with true/false
                //fullscreen // control whether the video should play in fullscreen or inline
                loop // control whether the video should loop when ended
                // onReady={e => this.setState({ isReady: true })}
                // onChangeState={e => this.setState({ status: e.state })}
                // onChangeQuality={e => this.setState({ quality: e.quality })}
                // onError={e => this.setState({ error: e.error })}
                style={{alignSelf: 'stretch', height: 300 }}
             />
            </View>
        </View>
    )
}

export default YouTubeScreen

const styles = StyleSheet.create({
    header: {
        height: 50,
        width: 120,
        alignSelf: 'center',
      },
    textSection: {
        color: 'white',
        fontSize: 18,
        letterSpacing: 2,
        marginBottom: 5,
        fontFamily: 'Roboto',
        textAlign: 'center',
        marginTop: -20,
      },

})
