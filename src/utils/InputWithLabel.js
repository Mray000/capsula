import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {dimisions} from 'utils/demisions';
import {moderateScale} from 'utils/Normalize';

export const InputWithLabel = ({
  value,
  onChange,
  placeholder,
  label,
  border = true,
  multiline = false,
  disabled = true,
  ...props
}) => {
  const [focus, setFocus] = useState(false)
  return (
    <TouchableOpacity
      onPress={() => setFocus(true)}
      style={{
        backgroundColor: '#FCFCFC',
        borderWidth: border ? 1 : 0,
        borderColor: '#E8E8E8',

        flexWrap: 'wrap',
        justifyContent: multiline ? 'flex-start' : 'space-between',
        alignItems: multiline ? 'flex-start' : 'center',
        flexDirection: 'row',
        marginBottom: 10,
        borderRadius: 15,
        paddingVertical: multiline ? dimisions.height / 100 : dimisions.height / 60  ,
        paddingHorizontal: 20,
        height: multiline ? dimisions.height / 6 : dimisions.height / 10,
      }}>
      <View style={{width: '90%', justifyContent: 'space-around'}}>
        {( value || focus) ? (
          <Text
            style={{
              color: '#BFBFBF',
              marginTop: 0,
              fontFamily: 'Inter-Regular',
              fontSize: moderateScale(14),
            }}>
            {label}
          </Text>
        ) : null}
        <TextInput
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          editable={disabled}
          selectionColor={'black'}
          style={{
            width: '100%',
            color: 'black',
            fontFamily: 'Inter-Medium',
            fontSize: moderateScale(16),
            alignItems: 'flex-end',
          }}
          onChangeText={onChange}
          placeholderTextColor={'#D9D9D9'}
          value={value}
          underlineColorAndroid="transparent"
          placeholder={focus ? "" : placeholder}
          multiline={multiline}
          {...props}
        />
      </View>
    </TouchableOpacity>
  );
};
