import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'utils/Normalize';
import {Shadow} from 'react-native-shadow-2';
import X from 'assets/x.svg';
import NoInternet from 'assets/notInternet.svg';
import {Button} from 'utils/Button';
import {dimisions} from 'utils/demisions';
import {useNavigation} from '@react-navigation/core';
import NetInfo from '@react-native-community/netinfo';
import {clearAllCreateEntryFields, getSalesTC} from "../redux/entryReducer";

export const NoInternetModal = ({open}) => {
  const navigation = useNavigation();
  const [init, setInit] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    unsubscribe();
    setTimeout(() => {
      setInit(true);
    }, 4000);
  }, []);

  function unsubscribe() {
    NetInfo.fetch().then(state => {
      setTimeout(function () {
        if (state.isConnected) {
          navigation.navigate('Entry',{is_global: true});
        } else {
          setLoading(false);
        }
      }, 500);
    });
  }

  const onPressClose = () => {
    setLoading(true);
    unsubscribe();
  };

  if (!open || !init) {
    return null;
  }

  return (
    <Modal transparent={true} visible={open} onRequestClose={onPressClose}>
      <View style={styles.centered_view}>
        <Shadow
          containerViewStyle={{
            position: 'absolute',
            right: scale(10),
            top: verticalScale(10),
          }}>
          <TouchableOpacity onPress={onPressClose} style={styles.close_button}>
            <X width={13} height={13} fill="#45413E" />
          </TouchableOpacity>
        </Shadow>
        <View style={styles.modal_content}>
          <NoInternet />
          <Text style={{color: 'black'}}>Нет сети :(</Text>
        </View>
        <Button onPress={onPressClose} disabled={loading} text={'Ok'} />
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
