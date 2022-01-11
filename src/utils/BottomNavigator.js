import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import map from 'assets/map.svg';
import star from 'assets/bottom_star.svg';
import entry from 'assets/entry.svg';
import info from 'assets/info.svg';
// import Crpss from "ass"
import person from 'assets/person.svg';
import {moderateScale, verticalScale} from './Normalize';
import {dimisions} from './demisions';
export const BottomNavigator = ({active, navigation}) => {
  let navigators = [
    {
      title: 'Филиалы',
      icon: map,
      to: 'Filials',
      is_active: active == 'filials',
    },
    {
      title: 'Стилисты',
      icon: star,
      to: 'StylistsList',
      is_active: active == 'stylists',
    },
    {
      title: 'Запись',
      icon: entry,
      to: 'Entry',
      is_active: active == 'entry',
    },

    {
      title: 'Инфо',
      icon: info,
      to: 'Info',
      is_active: active == 'info',
    },
    {
      title: 'Профиль',
      icon: person,
      to: 'Profile',
      is_active: active == 'profile',
    },
  ];
  return (
    <View style={styles.main}>
      {navigators.map(el => (
        <TouchableOpacity
            key={el.title}
          style={{
            width: '20%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate(el.to, {is_global: true})}>
          <el.icon
            fill={el.is_active ? 'black' : '#B3B3B3'}
            stroke_fill={el.is_active ? 'black' : '#B3B3B3'}
          />
          <Text
            style={{
              fontFamily: 'Inter-Medium',
              color: el.is_active ? 'black' : '#B3B3B3',
              fontSize: moderateScale(12),
            }}>
            {el.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    marginTop: 'auto',
    flex: 1,
    bottom: -1,
    backgroundColor: 'white',
    height: verticalScale(60),
    paddingTop: 10,
    paddingBottom: 10,
    borderTopColor: '#EFEFEF',
  },
  element: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
  },
  element_center: {
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftColor: '#EFEFEF',
    borderRightColor: '#EFEFEF',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    width: '33%',
    lineHeight: 10,
  },
});
