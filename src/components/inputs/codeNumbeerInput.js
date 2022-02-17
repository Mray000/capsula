import React, {useState} from 'react';
import {Dimensions, Platform, StyleSheet, TextInput, View} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {moderateScale} from 'utils/Normalize';

export const CodeNumberInput = ({innerRef, number, onChange, error}) => {
  const [is_focused, SetIsFocused] = useState();
  const width = Dimensions.get('window').width / 6;
  const height = Dimensions.get('window').width / 6;

  const is_focus = innerRef?.current?.isFocused();
  const box_shadow =
    number && !error ? styles.box_shadow_1 : styles.box_shadow_2;
  const border_color = error ? 'red' : is_focus ? 'black' : 'white';
  const background_color = is_focus || number ? 'white' : '#F2F2F2';
  return (
    <View
      style={{
        width,
        height,
      }}>
      <Shadow
        {...box_shadow}
        viewStyle={styles.shadow_container}
        containerViewStyle={styles.shadow_container}>
        <TextInput
          selectionColor={'black'}
          onBlur={() => SetIsFocused(!is_focus)}
          onFocus={() => SetIsFocused(!is_focus)}
          ref={innerRef}
          value={number}
          onChangeText={onChange}
          keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
          style={[
            styles.input,
            {
              width,
              height,
              borderColor: border_color,
              fontSize: moderateScale(width / 2),
              backgroundColor: background_color,
            },
          ]}
          maxLength={1}
        />
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow_container: {
    width: '100%',
    height: '100%',
  },
  input: {
    textAlignVertical: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    color: 'black',
  },
  box_shadow_1: {
    startColor: '#00000011',
    finalColor: '#00000001',
    offset: [0, 12],
    distance: 25,
  },
  box_shadow_2: {
    startColor: '#0000',
    finalColor: '#0000',
    offset: [0, 0],
    distance: 0,
    corners: [],
    sides: [],
    size: 0,
  },
});
