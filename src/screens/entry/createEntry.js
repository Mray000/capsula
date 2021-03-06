import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'utils/Normalize';
import {Header} from 'utils/Header';
import {dimisions} from 'utils/demisions';
import {Button} from 'utils/Button';
import {InputWithLabel} from 'utils/InputWithLabel';
import {BottomNavigator} from 'utils/BottomNavigator';
import ArrowRight from 'assets/arrow_right.svg';
import {Shadow} from 'react-native-shadow-2';
import DotIcon from 'assets/dot.svg';
import moment from 'moment';
import MapView, {Marker} from 'react-native-maps';
import location from 'assets/location.png';
import {formatDateAndTimeToISO} from 'utils/dateUtils';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearAllCreateEntryFields,
  clearServices,
  createEntryTC,
  setDateAndTime,
  setEntryError,
  setEntryStatus,
  setFilial,
  setNewDateEntry,
  setStylist,
} from '../../redux/entryReducer';
import {getCode, setAuthError} from '../../redux/authReducer';
import {SuccessModal} from 'utils/SuccessModal';
import Checked from 'assets/checked.svg';
import {AGREEMENT_DOC} from '../../constants';
import {ErrorModal} from 'utils/ErrorModal';
import {CheckIsValidPhone, FormatPhone} from 'utils/Phone';

export const CreateEntry = ({navigation}) => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state?.profile.profile);
  const {isAuth, error} = useSelector(state => state?.auth);
  const loading = useSelector(state => state?.common.loading);

  const {filial, entryStatus, entryError, services, stylist, date_and_time} =
    useSelector(state => state?.entry);

  const [isDetails, setIsDetails] = useState(true);
  const [name, setName] = useState(profile?.name ?? '');
  const [phone, setPhone] = useState(profile?.phone?.slice(profile?.phone?.indexOf("7") +1) ?? '');
  const [email, setEmail] = useState(profile?.email ?? '');
  const [comment, setComment] = useState('');
  const [notificationValue, setNotificationValue] = useState(null);
  const [agreement, setAgreement] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  const [successCreateEntry, setSuccessCreateEntry] = useState(false);

  useEffect(() => {
    return () => {
      setSuccessCreateEntry(false);

      dispatch(setEntryStatus(null));
    };
  }, []);

  useEffect(() => {
    dispatch(setAuthError(''));
  }, [phone]);

  useEffect(() => {
    if (entryStatus === 'OK') {
      setSuccessCreateEntry(true);
    }
    return () => {
      dispatch(setAuthError(''));
    };
  }, [entryStatus]);

  const closeModal = () => {
    navigation.navigate('Entry');
    dispatch(clearAllCreateEntryFields());
    setSuccessCreateEntry(false);
  };
  const closeErrorModal = () => {
    dispatch(setEntryError(null));
    dispatch(setFilial(filial));
    dispatch(setNewDateEntry(null));
    dispatch(clearServices([]));
    dispatch(setStylist(null));
    dispatch(setDateAndTime(null));
    navigation.navigate('Entry');
  };
  const is_active = true;
  const [region, SetRegion] = useState({
    latitude: 59.9342802,
    longitude: 30.3350986,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const createEntryHandler = async () => {

    const appointment = {
      appointments: [
        {
          id: 1,
          services: services.map(i => i.id),
          staff_id: stylist.id,
          datetime: formatDateAndTimeToISO(
            date_and_time.date,
            date_and_time.time,
          ),
        },
      ],
    };
    const data = {
      phone: FormatPhone(phone),
      fullname: name,
      email: email,
      comment: comment,
      notify_by_sms: notificationValue ?? 0,
      appointments: [
        {
          id: 1,
          services: services.map(i => i.id),
          staff_id: stylist.id,
          datetime: formatDateAndTimeToISO(
            date_and_time.date,
            date_and_time.time,
          ),
        },
      ],
    };
    if (!CheckIsValidPhone(phone)) {
      return dispatch(setAuthError('?????????????? ???????????? ??????????'));
    }
    let format_phone = FormatPhone(phone);
    if (isAuth) {
      dispatch(createEntryTC(filial.id, appointment, data));
    } else {
      await dispatch(getCode(format_phone));
      if (!error || !entryError) {
        navigation.navigate('EntryCode', {
          filialId: filial.id,
          appointment,
          data,
        });
      }
    }
  };
  const setNotificationHandler = value => {
    setNotificationValue(value);
    setOpenNotification(false);
  };

  const getHourName = value => {
    switch (value) {
      case 1:
      case 21:
        return '??????';
      case 2:
      case 3:
      case 4:
      case 24:
        return '??????';
      default:
        return '??????????';
    }
  };

  const disableButton = !name || !phone || !agreement || loading;
  return (
    <>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={styles.main_scroll}>
        <Header onBack={navigation.goBack} />
        <View style={styles.container}>
          <View style={{marginBottom: 5}}>
            <View
              style={{
                height: verticalScale(35),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#EFEFEF',
                borderRadius: 10,
                padding: 5,
              }}>
              <View
                style={{
                  backgroundColor: '#EFEFEF',
                  width: '100%',
                  flexDirection: 'row',
                  borderRadius: 10,
                  height: '100%',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => setIsDetails(true)}
                  style={{
                    width: '50%',
                    backgroundColor: isDetails ? 'white' : '#EFEFEF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    height: '100%',
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      textAlign: 'center',
                      color: isDetails ? 'black' : '#8F8F8F',
                    }}>
                    ????????????
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setIsDetails(false)}
                  style={{
                    width: '50%',
                    backgroundColor: !isDetails ? 'white' : '#EFEFEF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    height: '100%',
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      textAlign: 'center',
                      color: !isDetails ? 'black' : '#8F8F8F',
                    }}>
                    ????????????
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.content}>
            {isDetails ? (
              <View>
                <InputWithLabel
                  label={'??????'}
                  onChange={setName}
                  placeholder={'??????'}
                  value={name}
                />
                <InputWithLabel
                  is_phone={true}
                  label={'??????????????'}
                  onChange={setPhone}
                  placeholder={'??????????????'}
                  value={phone}
                  keyboardType={
                    Platform.OS === 'android' ? 'numeric' : 'number-pad'
                  }
                />
                <InputWithLabel
                  label={'email'}
                  onChange={setEmail}
                  placeholder={'email'}
                  value={email}
                />
                <InputWithLabel
                  label={'???????????? ??????????????????'}
                  onChange={setComment}
                  placeholder={'???????????? ??????????????????'}
                  value={comment}
                  multiline={true}
                />

                <TouchableOpacity
                  style={{
                    backgroundColor: is_active ? '#EFEFEF' : '#FCFCFC',
                    borderWidth: is_active ? 0 : 1,
                    borderColor: '#E8E8E8',

                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderRadius: 15,
                    paddingHorizontal: 24,
                    height: dimisions.height / 11,
                    marginBottom: 16,
                  }}
                  onPress={() => setOpenNotification(true)}
                  disabled={!is_active}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: is_active ? 'black' : '#B0B0B0',
                      fontFamily: 'Inter-Medium',
                      fontSize: moderateScale(16),
                    }}>
                    {notificationValue !== null
                      ? notificationValue === 0
                        ? '???? ????????????????????'
                        : `???? ${notificationValue} ${getHourName(
                            notificationValue,
                          )} ???? ????????????`
                      : '??????????????????????'}
                  </Text>
                  <ArrowRight fill={is_active ? 'black' : '#D6D6D6'} />
                </TouchableOpacity>
                <Notifications
                  selectValue={setNotificationHandler}
                  open={openNotification}
                  onPressClose={() => setOpenNotification(false)}
                />
                <TouchableOpacity
                  onPress={() => setAgreement(!agreement)}
                  style={styles.confirm_agreement}>
                  <View
                    style={{
                      backgroundColor: agreement ? 'black' : 'white',
                      width: scale(20),
                      height: scale(20),
                      borderColor: agreement ? 'black' : '#CCCCCC',
                      borderWidth: 1,
                      borderRadius: 100,
                      marginRight: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {agreement ? <Checked /> : null}
                  </View>
                  <Text
                    allowFontScaling={false}
                    style={styles.confirm_agreement_text}>
                    ?????????????? ???????????? ??????????????????????????, ???? ???????????????????????? ??
                    <Text
                      allowFontScaling={false}
                      onPress={() => Linking.openURL(AGREEMENT_DOC)}
                      style={styles.confirm_agreement_text_link}>
                      {' '}
                      ?????????????????? ????????????????????
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{marginTop: 15}}>
                <Shadow viewStyle={{width: '100%', marginBottom: 16}}>
                  <TouchableOpacity style={styles.card_container}>
                    <View style={styles.card}>
                      <View>
                        <View style={styles.card_info_time}>
                          <DotIcon fill={'black'} />
                          <Text
                            allowFontScaling={false}
                            style={styles.card_info_time_text}>
                            {`${moment(date_and_time.date).format('DD MMMM')} ${
                              date_and_time.time
                            }`}
                          </Text>
                        </View>
                        <View style={styles.card_info_service}>
                          <Text
                            allowFontScaling={false}
                            style={styles.card_service_text}>
                            {services.map(i => i.title)}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.card_price}>
                        <View style={styles.card_master}>
                          <Image
                            style={styles.master_image}
                            source={{uri: stylist?.avatar}}
                          />
                          <Text
                            allowFontScaling={false}
                            style={styles.master_name}>
                            {stylist?.name}
                          </Text>
                        </View>
                      </View>
                      <Text
                        allowFontScaling={false}
                        style={styles.card_price_count}>
                        {services?.reduce(function (sum, elem) {
                          return sum + elem.price;
                        }, 0)}{' '}
                        ???
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Shadow>
                <View>
                  <Text allowFontScaling={false} style={styles.sub_title}>
                    ?????????? ??????????????
                  </Text>
                  <View style={styles.address_details}>
                    <Text allowFontScaling={false} style={styles.address_text}>
                      {filial?.address}
                    </Text>
                    <View style={styles.map_container}>
                      <MapView
                        region={region}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}>
                        <Marker
                          coordinate={{
                            latitude: filial?.coordinate_lat,
                            longitude: filial?.coordinate_lon,
                          }}
                          onPress={() => {
                            SetRegion({
                              latitude: filial?.coordinate_lat,
                              longitude: filial?.coordinate_lon,
                              latitudeDelta: 0.1,
                              longitudeDelta: 0.1,
                            });
                          }}>
                          <Image
                            source={location}
                            style={{height: 45, width: 45}}
                          />
                        </Marker>
                      </MapView>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>

          <SuccessModal
            onPressClose={closeModal}
            underButtonTitle={'???????? ???????????? ?????????????????? ?? ?????????????? ??????????????????'}
            open={successCreateEntry}>
            <Text
              allowFontScaling={false}
              style={styles.success_edit_entry_text}>
              ???? ?????????????? ???????? ????????????
            </Text>
            <Text
              allowFontScaling={false}
              style={styles.success_edit_entry_sub_text}>
              ?????????????? ??????
            </Text>
            <Text
              allowFontScaling={false}
              style={styles.success_edit_entry_date}>
              {moment(date_and_time?.date).format('DD MMMM') +
                ' ?? ' +
                date_and_time?.time}
            </Text>
            <Text
              allowFontScaling={false}
              style={styles.success_edit_entry_date}>
              ???? ????????????: {filial?.address}
            </Text>
          </SuccessModal>
          <ErrorModal
            onPressClose={closeErrorModal}
            open={!!entryError}
            errorMessage={entryError}
          />
          {error ? (
            <Text
              allowFontScaling={false}
              style={{
                fontSize: moderateScale(14),
                color: '#E82E2E',
                paddingVertical: 10,
                textAlign: 'center',
              }}>
              {error}
            </Text>
          ) : null}
          <Button
            disabled={disableButton}
            text={'????????????????????'}
            onPress={createEntryHandler}
          />
        </View>
      </ScrollView>
      <BottomNavigator navigation={navigation} active="entry" />
    </>
  );
};

export const Notifications = ({onPressClose, open, selectValue}) => {
  if (!open) return null;
  const notification = [
    {title: '???? ????????????????????', value: 0},
    {title: '???? 1 ?????? ???? ????????????', value: 1},
    {title: '???? 2 ???????? ???? ????????????', value: 2},
    {title: '???? 3 ???????? ???? ????????????', value: 3},
    {title: '???? 4 ???????? ???? ????????????', value: 4},
    {title: '???? 5 ?????????? ???? ????????????', value: 5},
    {title: '???? 6 ?????????? ???? ????????????', value: 6},
    {title: '???? 9 ?????????? ???? ????????????', value: 9},
    {title: '???? 12 ?????????? ???? ????????????', value: 12},
    {title: '???? 15 ?????????? ???? ????????????', value: 15},
    {title: '???? 18 ?????????? ???? ????????????', value: 18},
    {title: '???? 21 ?????? ???? ????????????', value: 21},
    {title: '???? 24 ???????? ???? ????????????', value: 24},
  ];
  return (
    <Modal transparent={true} visible={open} onRequestClose={onPressClose}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={styles.main_scroll}>
        <Header onBack={onPressClose} />
        {notification.map(item => (
          <TouchableOpacity
            onPress={() => selectValue(item.value)}
            style={styles.notification_item}>
            <Text allowFontScaling={false} style={styles.notification_text}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  main_scroll: {
    backgroundColor: '#FCFCFC',
    marginBottom: verticalScale(70),
  },
  container: {
    flex: 1,
    paddingHorizontal:
      dimisions.width * 0.03 +
      (dimisions.width * 0.94 - dimisions.width * 0.94 * 0.97) / 2,
  },
  content: {
    flex: 1,
  },
  confirm_agreement: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  confirm_agreement_text: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#BFBFBF',
    fontFamily: 'Inter-Regular',
    fontSize: moderateScale(14),
    lineHeight: 18,
  },
  confirm_agreement_text_link: {
    textDecorationLine: 'underline',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#BFBFBF',
    fontFamily: 'Inter-Regular',
    fontSize: moderateScale(14),
    lineHeight: 18,
    borderBottomColor: 'red',
    borderBottomWidth: 2,
  },
  card_container: {
    borderRadius: 15,
  },
  card: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 15,
    backgroundColor: '#ffffff',
  },
  card_info_time: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 4,
  },
  card_info_service: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  card_info_time_text: {
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
    fontSize: moderateScale(18),
    lineHeight: 20,
    marginLeft: 8,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  card_service_text: {
    fontFamily: 'Inter-Regular',
    color: '#808080',
    fontSize: moderateScale(14),
    lineHeight: 20,
    marginBottom: 8,
  },
  card_master: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  master_image: {
    width: 44,
    height: 44,
    borderRadius: 44,
    marginRight: 8,
  },
  master_name: {
    fontFamily: 'Inter-Regular',
    color: '#000000',
    fontSize: moderateScale(16),
    lineHeight: 20,
  },
  card_price: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  card_price_count: {
    right: 10,
    bottom: 2,
    position: 'absolute',
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
    fontSize: moderateScale(18),
  },
  sub_title: {
    fontFamily: 'Inter-Regular',
    color: '#B0B0B0',
    fontSize: moderateScale(14),
    marginBottom: 8,
  },
  address_details: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    marginBottom: 16,
  },
  address_text: {
    padding: 16,
    fontFamily: 'Inter-Regular',
    fontSize: moderateScale(16),
    color: '#333333',
    lineHeight: 18,
  },
  map_container: {
    height: 160,
    overflow: 'hidden',
    backgroundColor: 'grey',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  notification_item: {
    paddingHorizontal: 40,
    paddingVertical: 22,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  notification_text: {
    color: 'black',
    fontFamily: 'Inter-Regular',
    fontSize: moderateScale(14),
    lineHeight: 18,
  },
  close_button: {
    backgroundColor: 'white',
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
  },
  success_edit_entry_text: {
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: moderateScale(28),
    color: 'black',
    lineHeight: 34,
    marginTop: 8,
    marginBottom: 24,
  },
  success_edit_entry_sub_text: {
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: moderateScale(16),
    color: '#808080',
    marginBottom: 12,
  },
  success_edit_entry_date: {
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: moderateScale(18),
    color: 'black',
    marginBottom: 8,
  },
});
