// import React, {useRef, useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
//   FlatList,
//   Animated,
//   TouchableOpacity,
//   ImageBackground,
//   Image,
// } from 'react-native';
// import Axios from 'axios';

// const {height, width} = Dimensions.get('window');

// export default function VideoPlayer({navigation}) {
//   const [video, setVideo] = useState([]);
//   const [data, setData] = useState([]);

//   const getVideo = async () => {
//     try {
//       const res = await Axios.get(
//         `https://api.themoviedb.org/3/movie/${props.id}/videos?api_key=90bb3764c9321cec09a9d576cf929c61&language=en-US`,
//       );
//       if (res !== null) {
//         const dataVideo = res.data;
//         setData(dataVideo)
//         setVideo(dataVideo.results[0].key)
//         console.log('masuk ga sih', dataVideo);
//       } else {
//         console.log('error');
//       }
//     } catch (error) {
//       console.log(error, 'error');
//     }
//   };

//   useEffect(() => {
//     getVideo();
//   }, []);

