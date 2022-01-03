import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import X from 'assets/x.svg';
import {api} from 'utils/api.js';
import {Button} from 'utils/Button.js';
import {authentication} from 'store/authentication';
import {moderateScale, scale, verticalScale} from 'utils/Normalize';
export const Code = ({navigation, route}) => {
  const [first_number, SetFirstNumber] = useState('');
  const [second_number, SetSecondNumber] = useState('');
  const [third_number, SetThirdNumber] = useState('');
  const [fourth_number, SetFourthNumber] = useState('');
  const [error, SetError] = useState('');
  const [is_load, SetIsLoad] = useState(false);
  let phone = route?.params?.phone;
  let first_ref = useRef();
  let second_ref = useRef();
  let third_ref = useRef();
  let fourth_ref = useRef();
  const SetNumber = (id, SetValue) => string => {
    if (string.trim() && !isNaN(string)) {
      SetValue(string);
      SetError('');
      if (id == 2) second_ref.current.focus();
      if (id == 3) third_ref.current.focus();
      if (id == 4) fourth_ref.current.focus();
      if (id == 5) Continue(string);
    } else {
      SetValue('');
      SetError('');
    }
  };
  const GetCode = async () => {
    let error = await api.getCode(phone);
    if (error) SetError(error);
  };
  const Continue = async fourth => {
    SetIsLoad(true);
    let code = first_number + second_number + third_number + fourth;
    if (code.length == 4) {
      let error = await authentication.login(phone, code);
      if (!error) navigation.navigate('Entry');
      else SetError(error);
    } else SetError('Введите весь код');

    SetIsLoad(false);
  };

  useEffect(() => {
    if (first_ref?.current && !first_number) first_ref.current.focus();
  }, [first_ref?.current]);
  let is_button_disabled =
    is_load ||
    !(first_number || second_number || third_number || fourth_number);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : null}
      style={{flex: 1, padding: 20}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Shadow
          startColor={'#00000008'}
          finalColor={'#00000001'}
          offset={[0, 8]}
          distance={20}
          containerViewStyle={{
            position: 'absolute',
            right: scale(10),
            top: verticalScale(10),
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              backgroundColor: 'white',
              width: 45,
              height: 45,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 17,
            }}>
            <X width={13} height={13} fill="#45413E" />
          </TouchableOpacity>
        </Shadow>
        <Text
          style={{
            fontSize: moderateScale(26),
            fontWeight: '700',
            color: 'black',
            fontFamily: 'Inter-SemiBold',
          }}>
          Введите код из смс-сообщения
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            marginTop: 25,
            marginBottom: 20,
          }}>
          <MiniInput
            innerRef={first_ref}
            error={error}
            number={first_number}
            SetNumber={SetNumber(2, SetFirstNumber)}
          />
          <MiniInput
            innerRef={second_ref}
            error={error}
            number={second_number}
            SetNumber={SetNumber(3, SetSecondNumber)}
          />
          <MiniInput
            innerRef={third_ref}
            error={error}
            number={third_number}
            SetNumber={SetNumber(4, SetThirdNumber)}
          />
          <MiniInput
            innerRef={fourth_ref}
            error={error}
            number={fourth_number}
            SetNumber={SetNumber(5, SetFourthNumber)}
          />
        </View>
        {error ? (
          <Text
            style={{
              color: 'red',
              fontSize: moderateScale(14),
              marginTop: -10,
              marginBottom: 10,
            }}>
            {error}
          </Text>
        ) : null}
        <Button
          text={'Далее'}
          onPress={() => Continue(fourth_number)}
          disabled={is_button_disabled}
        />
        <TouchableOpacity style={{marginTop: 15}} onPress={GetCode}>
          <Text
            style={{
              color: 'black',

              fontSize: moderateScale(14),
              fontFamily: 'Inter-Medium',
            }}>
            Отправить код повторно
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const MiniInput = ({innerRef, number, SetNumber, error}) => {
  const [is_focused, SetIsFocused] = useState();
  let width = Dimensions.get('window').width / 6;
  let height = Dimensions.get('window').width / 6;

  let is_focus = innerRef?.current?.isFocused();
  console.log(number, 'number');
  let box_shadow =
    number && !error
      ? {
          startColor: '#00000011',
          finalColor: '#00000001',
          offset: [0, 12],
          distance: 25,
        }
      : {
          startColor: '#0000',
          finalColor: '#0000',
          offset: [0, 0],
          distance: 0,
          corners: [],
          sides: [],
          size: 0,
        };
  let border_color = error ? 'red' : is_focus ? 'black' : 'white';
  let background_color = is_focus || number ? 'white' : '#F2F2F2';
  return (
    <View
      style={{
        width,
        height,
      }}>
      <Shadow
        {...box_shadow}
        viewStyle={{width: '100%', height: '100%'}}
        containerViewStyle={{
          width: '100%',
          height: '100%',
        }}>
        <TextInput
          selectionColor={'black'}
          onBlur={() => SetIsFocused(!is_focus)}
          onFocus={() => SetIsFocused(!is_focus)}
          ref={innerRef}
          value={number}
          onChangeText={SetNumber}
          keyboardType={Platform.OS == 'android' ? 'numeric' : 'number-pad'}
          style={{
            width,
            height,
            fontSize: moderateScale(width / 2),
            textAlignVertical: 'center',
            // fontWeight: '600',
            paddingTop: 0,
            paddingBottom: 0,
            textAlign: 'center',
            alignItems: 'center',
            backgroundColor: background_color,
            borderRadius: 20,
            borderColor: border_color,
            borderWidth: 1,
            color: 'black',
          }}
          maxLength={1}
        />
      </Shadow>
    </View>
  );
};
