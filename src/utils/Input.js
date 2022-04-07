import React, {useState} from 'react';
import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Eye from 'assets/eye.svg';
import {moderateScale} from './Normalize';
import MaskInput from 'react-native-mask-input';
import TextInputMask from 'react-native-text-input-mask';
export const Input = ({
  value,
  flex,
  is_error,
  SetError,
  onChangeText,
  is_password,
  Icon,
  is_phone,
  ...props
}) => {
  const [is_focused, SetIsFocused] = useState(false);
  const [text_hidden, SetTextHidden] = useState(is_password);

  return (
    <View
      style={{
        height: Dimensions.get('window').height / 10,
        marginTop: 10,
        width: '100%',
        justifyContent: 'center',
      }}>
      {is_phone ? (
        <View
          style={{
            flexDirection: 'row',
            height: '100%',
            alignItems: 'center',
            // justifyContent: 'center',
          }}>
          <Text
            allowFontScaling={false}
            style={{
              color: 'black',
              position: 'absolute',
              fontSize: moderateScale(17),
              elevation: 100,
              zIndex: 10,
              left: 40,
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
            placeholderTextColor="black"
            style={{
              height: '100%',
              backgroundColor:
                is_error || is_focused || value ? 'white' : '#F2F2F2',
              borderRadius: 18,
              width: '100%',
              color: 'black',
              borderColor: is_error
                ? '#E82E2E'
                : is_focused || value
                ? 'black'
                : '#F2F2F2',
              borderWidth: 1,
              paddingLeft: 65,
              fontSize: moderateScale(17),
            }}
            value={value}
            onBlur={() => SetIsFocused(false)}
            onFocus={() => SetIsFocused(true)}
            onChangeText={(formatted_text, unformatted_text) => {
              onChangeText(unformatted_text);
              if (SetError) SetError(false);
            }}
            {...props}
          />
        </View>
      ) : (
        <TextInput
          selectionColor={'black'}
          secureTextEntry={text_hidden}
          placeholderTextColor="#A9A9A9"
          style={{
            height: '100%',
            backgroundColor:
              is_error || is_focused || value ? 'white' : '#F2F2F2',
            borderRadius: 18,
            alignSelf: 'stretch',
            width: '100%',
            color: 'black',
            borderColor: is_error
              ? '#E82E2E'
              : is_focused || value
              ? 'black'
              : '#F2F2F2',
            borderWidth: 1,
            paddingLeft: 40,
            fontSize: moderateScale(17),
          }}
          value={value}
          onBlur={() => SetIsFocused(false)}
          onFocus={() => SetIsFocused(true)}
          onChangeText={text => {
            onChangeText(text);
            if (SetError) SetError(false);
          }}
          {...props}
        />
      )}

      {Icon ? (
        <View style={{position: 'absolute', left: 10}}>
          <Icon
            width={20}
            height={20}
            fill={is_focused || value ? '#000000' : '#CCCCCC'}
            // fill="#CCCCCC"
          />
        </View>
      ) : null}
      {is_password ? (
        <TouchableOpacity
          onPress={() => SetTextHidden(!text_hidden)}
          style={{position: 'absolute', right: 10}}>
          <Eye width={30} height={30} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
