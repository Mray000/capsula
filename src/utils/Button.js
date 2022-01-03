import React, {useState} from 'react';
import {Dimensions, Text, TouchableOpacity} from 'react-native';
import Next from 'assets/next.svg';
import {moderateScale} from './Normalize';

export const Button = ({
  disabled,
  text,
  flex,
  icon,
  absolute,
  height,
  width,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: disabled ? '#D3D3D3' : 'black',
        width: width || '100%',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: height || Dimensions.get('window').height / 10,
        // borderColor: colors.orange,
      }}
      {...props}
      disabled={disabled}>
      <Text
        style={{
          color: disabled ? '#9E9E9E' : 'white',
          fontSize: moderateScale(18),
        }}>
        {text}
      </Text>
      {icon ? (
        <Next
          width={23}
          height={23}
          style={{position: 'absolute', right: 20}}
        />
      ) : null}
    </TouchableOpacity>
  );
};
