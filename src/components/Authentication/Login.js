import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {Input} from 'utils/Input.js';
import Phone from 'assets/phone.svg';
import {Button} from 'utils/Button.js';
import X from 'assets/x.svg';
import {CheckIsValidPhone, FormatPhone} from 'utils/Phone';
import {scale, verticalScale, moderateScale} from 'utils/Normalize';
// import {api} from 'utils/api';
import {authentication} from 'store/authentication';
import {observer} from 'mobx-react-lite';
import {api} from 'utils/api';

export const Login = observer(({navigation}) => {
  const [phone, SetPhone] = useState('');
  const [error, SetError] = useState('');
  const [is_load, SetIsLoad] = useState(false);
  const login = async () => {
    if (!CheckIsValidPhone(phone)) SetError('Введите верный номер');
    else {
      SetIsLoad(true);
      let format_phone = FormatPhone(phone);
      let error = await api.getCode(format_phone);
      if (error) SetError(error);
      else navigation.navigate('Code', {phone: format_phone});
      SetIsLoad(false);
    }
  };
  let is_button_disabled = is_load || error == 'Введите верный номер' || !phone;
  if (authentication.is_login)
    return (
      <View style={{padding: 20}}>
        <Text style={{fontSize: 18, color: 'black', fontWeight: '700'}}>
          Вы уже в системе
        </Text>
        <Button text={'Выйти'} onPress={() => authentication.logout()} />
      </View>
    );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : null}
      style={{flex: 1, padding: 20}}>
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
          onPress={() => navigation.navigate('Entry')}
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: moderateScale(28),
            fontWeight: '700',
            color: 'black',
            fontFamily: 'Inter-SemiBold',
          }}>
          Вход
        </Text>
        <Text
          style={{
            fontSize: moderateScale(14),
            color: 'gray',
            paddingLeft: 8,
            paddingRight: 8,
            marginTop: 8,
            marginBottom: 8,
            fontFamily: 'Inter-Regular',
            textAlign: 'center',
          }}>
          Введите свой номер телефона для авторизации в приложении
        </Text>

        <Input
          keyboardType={Platform.OS == 'android' ? 'numeric' : 'number-pad'}
          value={phone}
          onChangeText={text =>
            SetPhone(!isNaN(text.trim()) ? text.trim() : phone)
          }
          is_error={error}
          Icon={Phone}
          SetError={SetError}
          placeholder="Ваш телефон"
        />
        {error ? (
          <Text
            style={{
              fontSize: moderateScale(14),
              color: '#E82E2E',
              textAlign: 'right',
            }}>
            {error}
          </Text>
        ) : null}

        <Text
          style={{
            fontSize: moderateScale(14),
            paddingLeft: 30,
            paddingRight: 30,
            marginTop: 5,
            marginBottom: 20,
            color: 'gray',
            fontFamily: 'Inter-Regular',
            textAlign: 'center',
          }}>
          На указанный номер будет отправлено смс с кодом для входа
        </Text>
        <Button
          disabled={is_button_disabled}
          onPress={login}
          text="Получить код"
        />
      </View>
    </KeyboardAvoidingView>
  );
});
