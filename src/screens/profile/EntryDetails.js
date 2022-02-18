import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from 'utils/Header';
import MapView, {Marker} from 'react-native-maps';
import StarIcon from 'assets/star.svg';
import {BottomNavigator} from 'utils/BottomNavigator';
import {dimisions} from 'utils/demisions';
import {moderateScale, verticalScale} from 'utils/Normalize';
import {Shadow} from 'react-native-shadow-2';
import ArrowRight from 'assets/arrow_right.svg';
import {ConfirmModal} from 'utils/ConfirmModal';
import {SuccessModal} from 'utils/SuccessModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  getEntryTC,
  setEntryDetails,
  setEntryStatus,
} from '../../redux/entryReducer';
import {formatDateISOToString} from 'utils/dateUtils';
import {Loader} from 'utils/Loader';
import location from 'assets/location.png';
import {getCommentsTC} from '../../redux/stylistReducer';
import {removeEntryTC} from "../../redux/profileReducer";

export const EntryDetails = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {entryId, company_id} = route.params;
  const [showConfirmRemoveEntry, setShowConfirmRemoveEntry] = useState(false);
  const [successRemoveEntry, setSuccessRemoveEntry] = useState(false);
  const {entry, filialDetails, entryStatus} = useSelector(state => state.entry);
  const [onPress, setOnPress] = useState(false);

  const comments = useSelector(state => state.stylists.comments);

  useEffect(() => {
    if (entryId && company_id) {
      dispatch(getEntryTC(company_id, entryId));
    }
    if (entryStatus === 'OK') {

      dispatch(setEntryStatus(null));
    }
    return () => {
      dispatch(setEntryDetails({}));
    };
  }, [entryId, entryStatus]);
  useEffect(() => {
    if (entry && entry?.staff && entry?.company_id && entry?.staff?.id) {
      dispatch(getCommentsTC(entry?.company_id, entry?.staff?.id));
    }
  }, [entry?.company_id, entry?.staff?.id]);

  const showConfirm = () => {
    setShowConfirmRemoveEntry(!showConfirmRemoveEntry);
  };
  const removeEntryHandler = async () => {
    await dispatch(removeEntryTC(entryId));
    setSuccessRemoveEntry(true);
  };

  const closeModal = () => {
    setSuccessRemoveEntry(false);
    navigation.navigate('Profile');
  };

  if (!entry.services) return <Loader />;

  return (
    <>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={styles.main_scroll}>
        <View style={styles.container}>
          <Header
            onBack={navigation.goBack}
            title={formatDateISOToString(entry?.datetime)}
          />
          <View style={styles.entry_details}>
            <Text style={styles.entry_service}>
              {entry?.services?.map(i => i.title)}
            </Text>
            <Text style={styles.entry_price}>
              {entry?.services?.reduce(function (sum, elem) {
                return sum + elem.cost;
              }, 0)}{' '}
              ₽
            </Text>
          </View>

          <View>
            <Text style={styles.sub_title}>{entry?.staff?.specialization}</Text>
            <Shadow viewStyle={{width: '100%', marginBottom: 16}}>
              <TouchableOpacity
                onPressIn={() => setOnPress(true)}
                onPressOut={() => setOnPress(false)}
                activeOpacity={1}
                style={styles.stylist}
                onPress={() =>
                  navigation.navigate('StylistProfile', {
                    stylist: {
                      ...entry?.staff,
                      company: {id: entry?.company_id},
                    },
                  })
                }>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={styles.stylist_image}
                    source={{uri: entry?.staff?.avatar}}
                  />
                  <View>
                    <View style={styles.stilist_raiting}>
                      <Text style={styles.stilist_raiting_text}>
                        {entry?.staff?.rating}
                      </Text>
                      <StarIcon fill={'black'} />
                      <Text style={styles.stilist_reviews}>{comments.length ?? 0} отзывов</Text>
                    </View>
                    <Text style={styles.stilist_name}>
                      {entry?.staff?.name}
                    </Text>
                  </View>
                </View>
                <ArrowRight  fill={onPress ? 'black' : '#E8E8E8'} />
              </TouchableOpacity>
            </Shadow>
          </View>

          <View>
            <Text style={styles.sub_title}>адрес филиала</Text>
            <View style={styles.address_details}>
              <Text style={styles.address_text}>{filialDetails?.address}</Text>
              <View style={styles.map_container}>
                <MapView
                  region={{
                    latitude: 59.9342802,
                    longitude: 30.3350986,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    zIndex: 10,
                  }}>
                  <Marker
                    tracksViewChanges={false}
                    coordinate={{
                      latitude: filialDetails.coordinate_lat,
                      longitude: filialDetails.coordinate_lon,
                    }}>
                    <Image
                      source={location}
                      style={{
                        height: 45,
                        width: 45,
                      }}
                    />
                  </Marker>
                </MapView>
              </View>
            </View>
          </View>

          <View style={styles.buttons_container}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditEntry', {entry, filialDetails})
              }
              style={styles.edit_entry}>
              <Text style={styles.edit_entry_title}>Перенести запись</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={showConfirm} style={styles.remove_entry}>
              <Text style={styles.remove_entry_title}>Отменить запись</Text>
            </TouchableOpacity>
            <ConfirmModal
              cancelText={'Нет'}
              modalText={'Отменить запись'}
              onPressConfirm={removeEntryHandler}
              onPressClose={showConfirm}
              confirmText={'Да, отменить'}
              modalSutText={
                'Вы уверены, что хотите\n' + 'отменить свою запись?'
              }
              open={showConfirmRemoveEntry}
            />
            <SuccessModal onPressClose={closeModal} open={successRemoveEntry}>
              <Text style={styles.success_remove_entry_text}>
                Мы отменили вашу запись
              </Text>
              <Text style={styles.success_remove_entry_sub_text}>
                Создайте новую запись в главном меню
              </Text>
            </SuccessModal>
          </View>
        </View>
      </ScrollView>
      <BottomNavigator active="profile" navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  main_scroll: {
    backgroundColor: '#FCFCFC',
    marginBottom: verticalScale(40),
  },
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal:
      dimisions.width * 0.03 +
      (dimisions.width * 0.94 - dimisions.width * 0.94 * 0.97) / 2,
  },
  entry_details: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  entry_service: {
    fontFamily: 'Inter-SemiBold',
    fontSize: moderateScale(16),
    color: 'black',
    lineHeight: 18,
    marginBottom: 10,
  },
  entry_price: {
    fontFamily: 'Inter-Regular',
    fontSize: moderateScale(14),
    color: 'black',
    lineHeight: 20,
  },
  stilist_raiting: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  stilist_name: {
    fontFamily: 'Inter-Regular',
    fontSize: moderateScale(14),
    color: '#333333',
    lineHeight: 20,
  },
  stilist_raiting_text: {
    fontFamily: 'Inter-SemiBold',
    color: 'black',
    fontSize: moderateScale(16),
    marginRight: 4,
  },
  stilist_reviews: {
    fontFamily: 'Inter-Regular',
    color: '#BFBFBF',
    fontSize: moderateScale(13),
    lineHeight: 20,
    marginLeft: 6,
  },
  stylist: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 15,
  },
  stylist_image: {
    width: 44,
    height: 44,
    borderRadius: 44,
    marginRight: 8,
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
    zIndex: 100,
    height: 160,
    overflow: 'hidden',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  buttons_container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  edit_entry: {
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 23,
    borderColor: '#EBEBEB',
  },
  edit_entry_title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: moderateScale(16),
    color: 'black',
    lineHeight: 18,
  },
  remove_entry: {
    alignItems: 'center',
    paddingVertical: 25,
  },
  remove_entry_title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: moderateScale(16),
    color: '#999999',
    lineHeight: 18,
  },
  success_remove_entry_text: {
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: moderateScale(28),
    color: 'black',
    lineHeight: 34,
    marginVertical: 16,
  },
  success_remove_entry_sub_text: {
    width: 250,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: moderateScale(16),
    color: '#808080',
    lineHeight: 20,
  },
});
