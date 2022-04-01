import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import X from 'assets/x.svg';
import {Button} from 'utils/Button';
import {moderateScale, scale, verticalScale} from 'utils/Normalize';
import {useDispatch, useSelector} from 'react-redux';
import {getCode, setAuthError, setAuthStatus} from '../../redux/authReducer';
import {createEntryTC, setEntryStatus} from '../../redux/entryReducer';
import VerifyCode from "utils/code/verifyCode";

export const EntryCode = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [code, setCode] = useState("")

  const loading = useSelector(state => state?.common.loading);
  const {error} = useSelector(state => state?.auth);
  const entryStatus = useSelector(state => state?.entry.entryStatus);

  useEffect(() => {
    if (entryStatus === 'OK') {
      navigation.goBack();
      dispatch(setAuthError(null));
      dispatch(setEntryStatus(null));
    }
  }, [entryStatus]);

  useEffect(() => {
    return () => {
      setCode("")
      dispatch(setEntryStatus(null));
      dispatch(setAuthStatus(null));
      dispatch(setAuthError(null));
    }
  },[])

  const appointment = route?.params?.appointment;
  const data = route?.params?.data;
  const filialId = route?.params?.filialId;

  const onInputCompleted = async (e) => {
    await dispatch(
        createEntryTC(filialId, appointment, {...data, code: e}),
    )
  }
  const onInputChangeText = async (e) => {
    dispatch(setAuthError(''));
    setCode(e)
  }
  const repeatGetCode = async () => {
    await dispatch(getCode(data.phone));
  };

  const is_button_disabled =
      loading || code.length !== 4

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
            onPress={() => {
              dispatch(setAuthError(null));
              navigation.navigate('Entry')
            }}
            style={styles.close_button}>
            <X width={13} height={13} fill="#45413E" />
          </TouchableOpacity>
        </Shadow>
        <Text style={styles.title}>Введите код из смс-сообщения</Text>
        <View style={styles.sub_title}>
          <VerifyCode
              onInputChangeText={onInputChangeText}
              onInputCompleted={onInputCompleted}
              autoFocus
              containerBackgroundColor="transparent"
              verifyCodeLength={4}
              containerPaddingHorizontal={scale(25)}
              codeViewBorderColor={error ? "red" : "transparent"}
              codeViewBackgroundColor={"#E6E6E6"}
              focusedCodeViewBorderColor="#000000"
              coverColor={"#000000"}
              codeViewBorderRadius={15}
              codeFontSize={28}
              codeViewBorderWidth={1}
          />
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button
          text={'Далее'}
          onPress={() => onInputCompleted()}
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
