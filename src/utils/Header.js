import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ArrowLeft from 'assets/arrow_left.svg';
import {moderateScale, verticalScale} from './Normalize';
export const Header = ({title, to, navigation, child, onBack}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        height: verticalScale('50'),
      }}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: 10,
          height: '100%',
          width: '10%',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
        onPress={() => (onBack ? onBack() : navigation.navigate(to))}>
        <ArrowLeft fill="black" />
      </TouchableOpacity>
      <Text
        allowFontScaling={false}
        style={{
          color: 'black',
          fontFamily: 'Inter-SemiBold',
          fontSize: moderateScale(15),
        }}>
        {title}
      </Text>
      {child}
    </View>
  );
};
