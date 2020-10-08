
import React from 'react';
import { View, Text } from 'react-native';
import YouTube from 'react-native-youtube';

const YTubeApi = 'AIzaSyDeQojP5P2dQkVzDwI_22E7GgMyjJXkCSs'


const YouTubeScreen = () => {
    return (
        <View>
            <Text>test video youtube</Text>
            <YouTube
                apiKey={YTubeApi}
                videoId="1d0Zf9sXlHk" // The YouTube video ID
                play // control playback of video with true/false
                //fullscreen // control whether the video should play in fullscreen or inline
                loop // control whether the video should loop when ended
                // onReady={e => this.setState({ isReady: true })}
                // onChangeState={e => this.setState({ status: e.state })}
                // onChangeQuality={e => this.setState({ quality: e.quality })}
                // onError={e => this.setState({ error: e.error })}
                style={{ alignSelf: 'stretch', height: 300 }}
            />
        </View>
    )
}

export default YouTubeScreen
