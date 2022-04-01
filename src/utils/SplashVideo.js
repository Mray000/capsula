import React from 'react';
import {View} from 'react-native';

import Splash from 'assets/splash.mp4';
import Video from 'react-native-video';

export const SplashVideo = () => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
      <Video
        source={Splash}
        paused={false}
        resizeMode="contain"
        style={{
          alignSelf: 'center',
          width: '100%',
          aspectRatio: 1,
          backgroundColor: 'black',
          // height: '100%',
          // resizeMode: 'contain',
          // height: '100%',
        }}
      />
    </View>
  );
};
