import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'utils/Normalize';
import {Shadow} from 'react-native-shadow-2';
import X from 'assets/x.svg';
import ErrorIcon from 'assets/error_icon.svg';
import {Button} from 'utils/Button';
import {dimisions} from 'utils/demisions';

export const ErrorModal = ({
  open,
  onPressClose,
  errorMessage,
  buttonText = 'Ок',
}) => {
  if (!open) {
    return null;
  }

  return (
    <Modal transparent={true} visible={open} onRequestClose={onPressClose}>
      <View style={styles.centered_view}>
        <Shadow
          containerViewStyle={{
            position: 'absolute',
            right: scale(10),
            height: 45,
            width: 45,
            top: verticalScale(40),
          }}>
          <TouchableOpacity onPress={onPressClose} style={styles.close_button}>
            <X width={13} height={13} fill="#45413E" />
          </TouchableOpacity>
        </Shadow>
        <View style={styles.modal_content}>
          <ErrorIcon fill={'black'} width={100} height={100} />
          <Text allowFontScaling={false} style={styles.bold_text}>
            {'Кажется, что-то пошло не так :('}
          </Text>
          {errorMessage ? (
            <Text allowFontScaling={false} style={styles.under_button_text}>
              {errorMessage}
            </Text>
          ) : (
            <Text allowFontScaling={false} style={styles.under_button_text}>
              Ошибка
            </Text>
          )}
        </View>

        <Button onPress={onPressClose} text={buttonText} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 25,
    paddingHorizontal:
      dimisions.width * 0.03 +
      (dimisions.width * 0.94 - dimisions.width * 0.94 * 0.97) / 2,
  },
  close_button: {
    backgroundColor: 'white',
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
  },
  modal_content: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  under_button_text: {
    fontSize: moderateScale(14),
    marginBottom: 20,
    color: '#B3B3B3',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  bold_text: {
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: moderateScale(28),
    color: 'black',
    lineHeight: 34,
    marginTop: 8,
    marginBottom: 24,
  },
});
