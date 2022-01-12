import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from 'utils/Header';
import ScoreCard from 'assets/score_card_large.png';
import StarIcon from 'assets/star.svg';
import {BottomNavigator} from 'utils/BottomNavigator';
import {dimisions} from 'utils/demisions';
import {moderateScale, verticalScale} from 'utils/Normalize';
import {Shadow} from 'react-native-shadow-2';
import ArrowRight from 'assets/arrow_right.svg';
import {ConfirmModal} from 'utils/ConfirmModal';
import MapView, {Marker} from 'react-native-maps';
import selected_location from 'assets/selected_location.png';
import {SuccessModal} from "utils/SuccessModal";

export const EntryDetails = observer(({navigation}) => {
  const [showConfirmRemoveEntry, setShowConfirmRemoveEntry] = useState(false);
  const [successRemoveEntry, setSuccessRemoveEntry] = useState(false);
  const [show, setShow] = useState(false);

  const showConfirm = () => {
    setShowConfirmRemoveEntry(!showConfirmRemoveEntry);
  };
  const removeEntryHandler = () => {
    setSuccessRemoveEntry(true)
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={styles.main_scroll}>
        <View style={styles.container}>
          <Header onBack={navigation.goBack} title={'24 ноября в 18:30'} />
          <View style={styles.entry_details}>
            <Text style={styles.entry_service}>
              Женская стрижка с укладкой{' '}
            </Text>
            <Text style={styles.entry_price}>400 ₽</Text>
          </View>

          <View>
            <Text style={styles.sub_title}>стилист 7 категории</Text>
            <Shadow viewStyle={{width: '100%', marginBottom: 16}}>
              <TouchableOpacity style={styles.stylist}>
                <View style={{flexDirection: 'row'}}>
                  <Image style={styles.stylist_image} source={ScoreCard} />
                  <View>
                    <View style={styles.stilist_raiting}>
                      <Text style={styles.stilist_raiting_text}>4,9</Text>
                      <StarIcon fill={'black'} />
                      <Text style={styles.stilist_reviews}>5 отзывов</Text>
                    </View>
                    <Text style={styles.stilist_name}>Анна Стрельникова</Text>
                  </View>
                </View>
                <ArrowRight fill={'black'} />
              </TouchableOpacity>
            </Shadow>
          </View>

          <View>
            <Text style={styles.sub_title}>адрес филиала</Text>
            <View style={styles.address_details}>
              <Text style={styles.address_text}>
                Василеостровская, 7 линия 34
              </Text>
              <View style={styles.map_container}>
                {/*<MapView*/}
                {/*  region={{*/}
                {/*    latitude: filial.coordinate_lat,*/}
                {/*    longitude: filial.coordinate_lon,*/}
                {/*    latitudeDelta: 0.1,*/}
                {/*    longitudeDelta: 0.1,*/}
                {/*  }}*/}
                {/*  style={{*/}
                {/*    width: '100%',*/}
                {/*    height: '60%',*/}
                {/*  }}>*/}
                {/*  <Marker*/}
                {/*    tracksViewChanges={false}*/}
                {/*    coordinate={{*/}
                {/*      latitude: filial.coordinate_lat,*/}
                {/*      longitude: filial.coordinate_lon,*/}
                {/*    }}>*/}
                {/*    <Image*/}
                {/*      source={selected_location}*/}
                {/*      style={{height: 45, width: 45}}*/}
                {/*    />*/}
                {/*  </Marker>*/}
                {/*</MapView>*/}
              </View>
            </View>
          </View>

          <View style={styles.buttons_container}>
            <TouchableOpacity onPress={()=> navigation.navigate("EditEntry")} style={styles.edit_entry}>
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
            <SuccessModal navigation={navigation} open={successRemoveEntry} >
                <Text style={styles.success_remove_entry_text}>Мы отменили вашу запись</Text>
                <Text style={styles.success_remove_entry_sub_text}>Создайте новую запись
                  в главном меню</Text>
            </SuccessModal>
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
    height: 160,
    backgroundColor: 'grey',
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
    textAlign: "center",
    fontFamily: 'Inter-SemiBold',
    fontSize: moderateScale(28),
    color: 'black',
    lineHeight: 34,
    marginVertical: 16,
  },
  success_remove_entry_sub_text: {
    width: 250,
    textAlign: "center",
    fontFamily: 'Inter-Regular',
    fontSize: moderateScale(16),
    color: '#808080',
    lineHeight: 20,
  }
});
