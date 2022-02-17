import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {Input} from 'utils/Input';
import Phone from 'assets/phone.svg';
import {Button} from 'utils/Button';
import X from 'assets/x.svg';
import {CheckIsValidPhone, FormatPhone} from 'utils/Phone';
import {moderateScale, scale, verticalScale} from 'utils/Normalize';
import {useDispatch, useSelector} from 'react-redux';
import {getCode, setAuthError, setAuthStatus} from '../../redux/authReducer';

export const Login = ({navigation}) => {
  const dispatch = useDispatch();

  const {error, status} = useSelector(state => state?.auth);
  const loading = useSelector(state => state?.common.loading);

  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (status === 'success') {
      navigation.navigate('Code', {phone: phone});
    }
    return () => {
      dispatch(setAuthStatus(null));
    };
  }, [status]);
  const loginHandler = async () => {
    if (!CheckIsValidPhone(phone)) {
      dispatch(setAuthError('Введите верный номер'));
    } else {
      const format_phone = FormatPhone(phone);
      await dispatch(getCode(format_phone));
    }
  };

  const is_button_disabled =
    loading || error === 'Введите верный номер' || !phone;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
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
          style={styles.close_button_container}>
          <X width={13} height={13} fill="#45413E" />
        </TouchableOpacity>
      </Shadow>
      <View style={styles.container}>
        <Text style={styles.title}>Вход</Text>
        <Text style={styles.sub_title}>
          Введите свой номер телефона для авторизации в приложении
        </Text>

        <Input
          keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
          value={phone}
          onChangeText={text =>
            setPhone(!isNaN(text.trim()) ? text.trim() : phone)
          }
          is_error={error}
          Icon={Phone}
          SetError={() => dispatch(setAuthError(''))}
          placeholder="Ваш телефон"
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text
          style={[
            styles.sub_title,
            {
              paddingLeft: 30,
              paddingRight: 30,
              marginTop: 5,
              marginBottom: 20,
            },
          ]}>
          На указанный номер будет отправлено смс с кодом для входа
        </Text>
        <Button
          disabled={is_button_disabled}
          onPress={loginHandler}
          text="Получить код"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  close_button_container: {
    backgroundColor: 'white',
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: moderateScale(28),
    fontWeight: '700',
    color: 'black',
    fontFamily: 'Inter-SemiBold',
  },
  sub_title: {
    fontSize: moderateScale(14),
    color: 'gray',
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 8,
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  error: {
    fontSize: moderateScale(14),
    color: '#E82E2E',
    textAlign: 'right',
  },
});
