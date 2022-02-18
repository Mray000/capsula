import React, {useState} from 'react';
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
import {Shadow} from 'react-native-shadow-2';
import {BottomNavigator} from 'utils/BottomNavigator';
import {ConfirmModal} from 'utils/ConfirmModal';
import {useDispatch, useSelector} from 'react-redux';
import {editProfileInfoTC} from '../../redux/profileReducer';
import {logout} from '../../redux/authReducer';
import {InputWithLabel} from 'utils/InputWithLabel';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { Appearance } from 'react-native';

export const Settings = ({navigation}) => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state?.profile.profile);

  const colorScheme = Appearance.getColorScheme();

  const [name, setName] = useState(profile.name ?? '');
  const [birthday, setBirthday] = useState(profile.birth_date ?? '');
  const [is_birthday_picker_open, SetIsBirthdayPickerOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const logoutHandler = async () => {
    await dispatch(logout());
    navigation.navigate('PreLogin');
  };

  const saveChanges = async () => {
    await dispatch(
      editProfileInfoTC(profile.id, {
        ...profile,
        name: name,
        birth_date: birthday,
      }),
    );
    navigation.navigate('Profile');
  };
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
              <TouchableOpacity onPress={saveChanges} style={styles.header}>
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
          <View style={styles.form_container}>
            <Shadow viewStyle={{width: '100%', marginBottom: 8}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FCFCFC',
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderRadius: 15,
                  paddingHorizontal: 20,

                  height: dimisions.height / 10,
                }}>
                <View style={{width: '90%', justifyContent: 'space-around'}}>
                  {name ? (
                    <Text
                      style={{
                        color: '#BFBFBF',
                        marginTop: 10,
                        fontFamily: 'Inter-Regular',
                        fontSize: moderateScale(14),
                      }}>
                      {'имя'}
                    </Text>
                  ) : null}
                  <TextInput
                    style={{
                      width: '100%',
                      color: 'black',
                      textAlignVertical: 'center',
                      fontFamily: 'Inter-Medium',
                      fontSize: moderateScale(16),
                    }}
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor={'#D9D9D9'}
                    underlineColorAndroid="transparent"
                    placeholder={'обязательно'}
                  />
                </View>
              </TouchableOpacity>
            </Shadow>
            <Shadow viewStyle={{width: '100%', marginBottom: 8}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FCFCFC',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderRadius: 15,
                  paddingHorizontal: 20,
                  height: dimisions.height / 10,
                }}>
                <TouchableOpacity
                  onPress={() => SetIsBirthdayPickerOpen(true)}
                  style={{width: '90%', justifyContent: 'space-around'}}>
                  <Text
                    style={{
                      color: '#BFBFBF',
                      marginTop: 10,
                      fontFamily: 'Inter-Regular',
                      fontSize: moderateScale(14),
                    }}>
                    дата рождения
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Inter-Medium',
                      fontSize: moderateScale(16),
                    }}>
                    {birthday}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </Shadow>
            <InputWithLabel
              editable={false}
              label={'почта'}
              value={profile.email}
            />
          </View>
          <View style={styles.logout_container}>
            <TouchableOpacity onPress={() => setShowLogoutConfirm(true)}>
              <Text style={styles.logout_text}>Выйти из аккаунта</Text>
              <ConfirmModal
                modalText={'Выйти из аккаунта'}
                modalSutText={'Вы уверены, что хотите выйти?'}
                cancelText={'Отмена'}
                confirmText={'Выйти'}
                open={showLogoutConfirm}
                onPressClose={() => setShowLogoutConfirm(false)}
                onPressConfirm={logoutHandler}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <DatePicker
        modal
        mode="date"
        title={"Дата рождения"}
        confirmText={"Сохранить"}
        cancelText={"Отмена"}
        open={is_birthday_picker_open}
        textColor={colorScheme === 'dark' ? "#ffffff" : "#000000"}
        date={moment().toDate()}
        maximumDate={moment().toDate()}
        onConfirm={date => {
          setBirthday(moment(date).format("YYYY-MM-DD"))
          SetIsBirthdayPickerOpen(false);
        }}
        onCancel={() => SetIsBirthdayPickerOpen(false)}
      />
      <BottomNavigator active="profile" navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  score_image: {
    position: 'relative',
    marginTop: 8,
    width: '100%',
    borderRadius: 15,
  },
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
    height: dimisions.height / 60,
    color: '#BFBFBF',
    backgroundColor: 'transparent',
    zIndex: -1,
    fontFamily: 'Inter-Regular',
    fontSize: moderateScale(14),
    lineHeight: 12,
    marginBottom: 0,
    paddingBottom: 0,
  },
  text_input: {
    height: dimisions.height / 20,
    width: '100%',
    color: 'black',
    fontFamily: 'Inter-Medium',
    fontSize: moderateScale(14),
  },
  logout_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  toggle_label: {
    color: '#000000',
    fontFamily: 'Inter-Regular',
    fontSize: moderateScale(16),
    lineHeight: 20,
  },
  logout_text: {
    fontSize: moderateScale(16),
    color: '#999999',
  },
});
