import React, {useRef, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import MaskInput from 'react-native-mask-input';
import {moderateScale} from 'utils/Normalize';

export const InputWithLabel = ({
  value,
  onChange,
  placeholder,
  label,
  border = true,
  multiline = false,
  disabled = true,
  is_phone,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const ref = useRef();
  return (
    <TouchableOpacity
      disabled={!props.editable ?? false}
      onPress={() => {
        ref.current?.focus();
        setFocus(true);
      }}
      ref={ref}
      style={{
        backgroundColor: '#FCFCFC',
        borderWidth: border ? 1 : 0,
        borderColor: '#E8E8E8',
        flexWrap: multiline ? 'wrap' : null,
        justifyContent: multiline ? 'flex-start' : 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
        borderRadius: 15,
        paddingTop: multiline ? 10 : 0,
        paddingHorizontal: 20,
        height: multiline ? 150 : 64,
      }}>
      <View style={{width: '90%', justifyContent: 'space-around'}}>
        {(value || focus) && !is_phone ? (
          <Text
            allowFontScaling={false}
            style={{
              color: '#BFBFBF',
              fontFamily: 'Inter-Regular',
              fontSize: moderateScale(14),
            }}>
            {label}
          </Text>
        ) : null}
        {is_phone ? (
          <View
            style={{
              flexDirection: 'row',
              height: '100%',
              alignItems: 'center',
            }}>
            <Text
              allowFontScaling={false}
              style={{
                color: 'black',
                position: 'absolute',
                fontSize: moderateScale(17),
                elevation: 100,
                zIndex: 10,
              }}>
              +7
            </Text>

            <MaskInput
              mask={[
                '(',
                /\d/,
                /\d/,
                /\d/,
                ')',
                /\d/,
                /\d/,
                /\d/,
                '-',
                /\d/,
                /\d/,
                '-',
                /\d/,
                /\d/,
              ]}
              onBlur={() => setFocus(false)}
              onFocus={() => setFocus(true)}
              focus={focus}
              editable={disabled}
              selectionColor={'black'}
              style={{
                width: '100%',
                color: 'black',
                fontFamily: 'Inter-Medium',
                fontSize: moderateScale(16),
                alignItems: 'flex-end',
                padding: 0,
                paddingLeft: 25,
              }}
              onChangeText={(formatted_text, unformatted_text) => {
                onChange(unformatted_text);
              }}
              // placeholderTextColor={'#D9D9D9'}
              placeholderTextColor={'black'}
              value={value}
              underlineColorAndroid="transparent"
              // placeholder={focus ? '' : placeholder}
              multiline={multiline}
              {...props}
            />
          </View>
        ) : (
          <TextInput
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            focus={focus}
            editable={disabled}
            selectionColor={'black'}
            style={{
              width: '100%',
              color: 'black',
              fontFamily: 'Inter-Medium',
              fontSize: moderateScale(16),
              alignItems: 'flex-end',
              padding: 0,
            }}
            onChangeText={onChange}
            placeholderTextColor={'#D9D9D9'}
            value={value}
            underlineColorAndroid="transparent"
            placeholder={focus ? '' : placeholder}
            multiline={multiline}
            {...props}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
