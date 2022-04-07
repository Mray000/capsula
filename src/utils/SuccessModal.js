import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'utils/Normalize';
import {Shadow} from 'react-native-shadow-2';
import X from 'assets/x.svg';
import SuccessIcon from 'assets/checkmark.svg';
import {Button} from 'utils/Button';
import {dimisions} from 'utils/demisions';

export const SuccessModal = ({
  open,
  onPressClose,
  children,
  underButtonTitle,
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
          <SuccessIcon />
          {children}
        </View>
        {underButtonTitle && (
          <Text allowFontScaling={false} style={styles.under_button_text}>
            {underButtonTitle}
          </Text>
        )}
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
});
