import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, verticalScale} from 'utils/Normalize';
import {dimisions} from 'utils/demisions';
import {Header} from 'utils/Header';
import UserAvatarIcon from '../../assets/user_avatar.svg';
import {Shadow} from 'react-native-shadow-2';
import {BottomNavigator} from 'utils/BottomNavigator';
import ToggleSwitch from "toggle-switch-react-native";
import {ConfirmModal} from "utils/ConfirmModal";

export const Settings = observer(({navigation}) => {
  const [name, setName] = useState('Alexandra');
  const [surName, setSurname] = useState('');
  const [notification, setNotification] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const logoutHandler = () => {
    navigation.navigate("PreLogin")
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={styles.main_scroll}>
        <View style={styles.container}>
          <Header
            onBack={navigation.goBack}
            title={'Настройки'}
            child={
              <TouchableOpacity style={styles.header}>
                <Text
                  style={{
                    fontFamily: 'Inter-SemiBold',
                    fontSize: moderateScale(16),
                    color: 'black',
                    fontWeight: '600',
                  }}>
                  Готово
                </Text>
              </TouchableOpacity>
            }
          />
          <View style={styles.avatar_container}>
            <UserAvatarIcon />
          </View>
          <View style={styles.form_container}>
            <Shadow viewStyle={{width: '100%', marginBottom: 8}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FCFCFC',
                  borderWidth: 1,
                  borderColor: '#E8E8E8',
                  alignItems: 'flex-start',
                  flexDirection: 'column',
                  borderRadius: 15,
                  paddingHorizontal: 24,
                  paddingVertical: 11,
                  height: dimisions.height / 11,
                }}>
                <Text style={styles.text_label}>{'имя'}</Text>
                <TextInput
                  placeholderTextColor={'#D9D9D9'}
                  placeholder={'обязательно'}
                  value={name}
                  onChangeText={setName}
                  style={styles.text_input}
                />
              </TouchableOpacity>
            </Shadow>

            <Shadow viewStyle={{width: '100%', marginBottom: 8}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FCFCFC',
                  borderWidth: 1,
                  borderColor: '#E8E8E8',
                  alignItems: 'flex-start',
                  flexDirection: 'column',
                  borderRadius: 15,
                  paddingHorizontal: 24,
                  paddingVertical: 11,
                  height: dimisions.height / 11,
                }}>
                <Text style={styles.text_label}>{'фамилия'}</Text>
                <TextInput
                  placeholderTextColor={'#D9D9D9'}
                  placeholder={'не обязательно'}
                  value={surName}
                  onChangeText={setSurname}
                  style={styles.text_input}
                />
              </TouchableOpacity>
            </Shadow>

            <TouchableOpacity
              style={{
                backgroundColor: '#FCFCFC',
                borderWidth: 1,
                borderColor: '#E8E8E8',
                alignItems: 'flex-start',
                flexDirection: 'column',
                marginBottom: 24,
                borderRadius: 15,
                paddingHorizontal: 24,
                paddingVertical: 11,
                height: dimisions.height / 11,
              }}
              disabled={true}>
              <Text style={styles.text_label}>{'почта'}</Text>
              <TextInput
                placeholderTextColor={'#D9D9D9'}
                underlineColorAndroid="transparent"
                editable={false}
                value={'Alexandra@gmmail.com'}
                style={styles.text_input}
              />
            </TouchableOpacity>

            <Shadow viewStyle={{width: '100%', marginBottom: 8}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FCFCFC',
                  borderWidth: 1,
                  borderColor: '#E8E8E8',
                  justifyContent: "space-between",
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderRadius: 15,
                  paddingHorizontal: 24,
                  paddingVertical: 11,
                  height: dimisions.height / 11,
                }}>
                <Text style={styles.toggle_label}>{'Уведомдения'}</Text>
                <ToggleSwitch
                  isOn={notification}
                  onColor="black"
                  offColor="black"
                  size="large"
                  onToggle={() => setNotification(!notification)}
                />
              </TouchableOpacity>
            </Shadow>

          </View>
          <View style={styles.logout_container}>
            <TouchableOpacity onPress={() => setShowLogoutConfirm(true)}>
              <Text style={styles.logout_text}>Выйти из аккаунта</Text>
              <ConfirmModal
                modalText={"Выйти из аккаунта"}
                modalSutText={"Вы уверены, что хотите выйти?"}
                cancelText={"Отмена"}
                confirmText={"Выйти"}
                isOpen={showLogoutConfirm}
                onPressClose={() => setShowLogoutConfirm(false)}
                onPressConfirm={logoutHandler}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <BottomNavigator active="profile" navigation={navigation} />
    </>
  );
});

const styles = StyleSheet.create({
  main_scroll: {
    backgroundColor: '#FCFCFC',
    marginBottom: verticalScale(60),
  },
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal:
      dimisions.width * 0.03 +
      (dimisions.width * 0.94 - dimisions.width * 0.94 * 0.97) / 2,
  },
  header: {
    position: 'absolute',
    right: -0.0000000001,
  },
  avatar_container: {
    marginTop: 32,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form_container: {
    width: '100%',
  },
  text_label: {
    color: '#BFBFBF',
    fontFamily: 'Inter-Regular',
    fontSize: moderateScale(14),
    lineHeight: 12,
    marginBottom: 0,
    paddingBottom: 0,
  },
  text_input: {
    underlineColorAndroid: 'none',
    width: '100%',
    color: 'black',
    fontFamily: 'Inter-Medium',
    fontSize: moderateScale(14),
  },
  logout_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  toggle_label: {
    color: '#000000',
    fontFamily: 'Inter-Regular',
    fontSize: moderateScale(16),
    lineHeight: 20,
  },
  logout_text: {
    fontSize: moderateScale(16),
    color: "#999999",
  }
});
