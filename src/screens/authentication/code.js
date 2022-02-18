import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import X from 'assets/x.svg';
import {Button} from 'utils/Button';
import {moderateScale, scale, verticalScale} from 'utils/Normalize';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCode,
  login,
  setAuthError,
  setAuthStatus,
} from '../../redux/authReducer';
import {CodeNumberInput} from '../../components/inputs/codeNumbeerInput';

export const Code = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [first_number, setFirstNumber] = useState('');
  const [second_number, setSecondNumber] = useState('');
  const [third_number, setThirdNumber] = useState('');
  const [fourth_number, setFourthNumber] = useState('');

  const loading = useSelector(state => state?.common.loading);
  const {error, status} = useSelector(state => state?.auth);

  useEffect(() => {
    return () => {
      dispatch(setAuthStatus(null));
      dispatch(setAuthError(null));
    };
  },[])

  const phone = route?.params?.phone;
  const first_ref = useRef();
  const second_ref = useRef();
  const third_ref = useRef();
  const fourth_ref = useRef();

  const setNumberHandler = (id, setValue) => string => {
    if (string.trim() && !isNaN(string)) {
      setValue(string);
      dispatch(setAuthError(''));
      if (id === 2) second_ref.current?.focus();
      if (id === 3) third_ref.current?.focus();
      if (id === 4) fourth_ref.current?.focus();
      if (id === 5) onSubmitHandler(string);
    } else {
      if (id === 5 && string === '') third_ref.current?.focus();
      if (id === 4 && !string) second_ref.current?.focus();
      if (id === 3 && !string) first_ref.current?.focus();
      setValue('');
      dispatch(setAuthError(''));
    }
  };
  const repeatGetCode = async () => {
    await dispatch(getCode(phone));
  };
  const onSubmitHandler = async fourth => {
    const code = first_number + second_number + third_number + fourth;
    code.length === 4
      ? await dispatch(login(phone, code))
      : dispatch(setAuthError('Введите весь код'));
  };

  useEffect(() => {
    if (first_ref?.current && !first_number) {
      first_ref.current?.focus();
    }
  }, [first_ref?.current]);

  useEffect(() => {
    if (status === 'success') {
      navigation.navigate('Profile');
    }
    return () => {
      dispatch(setAuthStatus(null));
    };
  }, [status]);

  const is_button_disabled =
    loading ||
    !(first_number || second_number || third_number || fourth_number);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.keyboard_container}>
      <View style={styles.container}>
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
            style={styles.close_button}>
            <X width={13} height={13} fill="#45413E" />
          </TouchableOpacity>
        </Shadow>
        <Text style={styles.title}>Введите код из смс-сообщения</Text>
        <View style={styles.sub_title}>
          <CodeNumberInput
            innerRef={first_ref}
            error={error}
            number={first_number}
            onChange={setNumberHandler(2, setFirstNumber)}
          />
          <CodeNumberInput
            innerRef={second_ref}
            error={error}
            number={second_number}
            onChange={setNumberHandler(3, setSecondNumber)}
          />
          <CodeNumberInput
            innerRef={third_ref}
            error={error}
            number={third_number}
            onChange={setNumberHandler(4, setThirdNumber)}
          />
          <CodeNumberInput
            innerRef={fourth_ref}
            error={error}
            number={fourth_number}
            onChange={setNumberHandler(5, setFourthNumber)}
          />
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button
          text={'Далее'}
          onPress={() => onSubmitHandler(fourth_number)}
          disabled={is_button_disabled}
        />
        <TouchableOpacity style={{marginTop: 15}} onPress={repeatGetCode}>
          <Text style={styles.retry_sub_title}>Отправить код повторно</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  close_button: {
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
  keyboard_container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: moderateScale(26),
    fontWeight: '700',
    color: 'black',
    fontFamily: 'Inter-SemiBold',
  },
  sub_title: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 25,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    fontSize: moderateScale(14),
    marginTop: -10,
    marginBottom: 10,
  },
  retry_sub_title: {
    color: 'black',
    fontSize: moderateScale(14),
    fontFamily: 'Inter-Medium',
  },
});
