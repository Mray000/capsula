import React, {useEffect, useRef, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Button} from 'utils/Button';
import {Loader} from 'utils/Loader';
import {FilialsMap} from './FilialsMap';
import BottomSheet from 'utils/BottomSheet';
import {moderateScale, verticalScale} from 'utils/Normalize';
import moment from 'moment';
import 'moment/locale/ru';
import {BottomNavigator} from 'utils/BottomNavigator';
import {Header} from 'utils/Header';
import selected_location from 'assets/selected_location.png';

import MapView, {Marker} from 'react-native-maps';
import {dimisions} from 'utils/demisions';
import {Shadow} from 'react-native-shadow-2';
import Loop from 'assets/loop.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {setFilial} from '../../redux/entryReducer';
import {
  getAllFilialsTC,
  getFilialsWithFilter,
  setAllFilials,
  showFilialDataTC,
} from '../../redux/filialsReducer';

moment.locale('ru');
export const Filials = ({navigation, route}) => {
  const dispatch = useDispatch();

  const is_global = route?.params?.is_global;
  const {allFilials, initialFilials} = useSelector(state => state?.filials);
  const services = useSelector(state => state?.entry?.services);
  const loading = useSelector(state => state?.common?.loading);
  const [selected_filial, SetSelectedFilial] = useState(null);
  const [is_map_active, SetIsMapActive] = useState(true);
  const [filter, SetFilter] = useState('');

  const bottomSheet = useRef(null);

  useEffect(() => {
    if (!is_global && services?.length) {
      dispatch(getFilialsWithFilter(services[0].id));
    }
    if (!initialFilials?.length) {
      dispatch(getAllFilialsTC());
    }
  }, [is_global, services?.length]);

  const ShowFilialData = async filial => {
    if (moment(filial.datetime).isAfter(moment())) {
      SetSelectedFilial(filial);
      bottomSheet?.current?.show();
    } else {
      const {stylists_length, datetime} = await dispatch(
        showFilialDataTC(filial),
      );
      dispatch(
        setAllFilials(last_filials => {
          return last_filials?.map(el => {
            if (el.id === filial.id) return filial;
            else return el;
          });
        }),
      );
      SetSelectedFilial({...filial, datetime, stylists_length});
      bottomSheet.current.show();
    }
  };

  const filials = is_global
    ? initialFilials
    : services?.length
    ? allFilials
    : initialFilials;
  if (!filials?.length || loading) return <Loader />;
  return (
    <>
      <KeyboardAwareScrollView
        stickyHeaderIndices={[3]}
        style={{backgroundColor: '#FCFCFC'}}>
        <Header title="Филиал" navigation={navigation} to="Entry" />
        <View style={{paddingHorizontal: 10, marginBottom: 5}}>
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
                onPress={() => SetIsMapActive(true)}
                style={{
                  width: '50%',
                  backgroundColor: is_map_active ? 'white' : '#EFEFEF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  height: '100%',
                }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    textAlign: 'center',
                    color: is_map_active ? 'black' : '#8F8F8F',
                  }}>
                  Карта
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => SetIsMapActive(false)}
                style={{
                  width: '50%',
                  backgroundColor: !is_map_active ? 'white' : '#EFEFEF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  height: '100%',
                }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    textAlign: 'center',
                    color: !is_map_active ? 'black' : '#8F8F8F',
                  }}>
                  Список
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {is_map_active ? (
          <View>
            <FilialsMap
              filials={filials}
              selected_filial={selected_filial}
              ShowFilialData={ShowFilialData}
            />
          </View>
        ) : (
          <View
            style={{
              paddingHorizontal: 10,
              width: '100%',
              paddingBottom: verticalScale(80),
            }}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#EFEFEF',
                marginTop: 10,
                width: '100%',
                alignSelf: 'center',
                height: verticalScale(40),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
              }}>
              <View
                style={{
                  width: '10%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Loop fill="#B3B3B3" />
              </View>
              <TextInput
                selectionColor={'black'}
                onChangeText={SetFilter}
                style={{
                  padding: 0,
                  width: '90%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'black',
                }}
                placeholder="Поиск филиала"
                placeholderTextColor={'#B3B3B3'}
              />
            </View>
            {filials
              ?.filter(filial => filial?.address.includes(filter))
              ?.map(filial => (
                <Shadow
                  key={filial.id}
                  startColor={'#00000006'}
                  finalColor={'#00000003'}
                  size={[500, 0]}
                  offset={[0, 25]}
                  radius={{bottomLeft: 50, bottomRight: 50}}
                  distance={11}
                  viewStyle={{width: '100%', height: '100%'}}
                  containerViewStyle={{
                    width: dimisions.width - 20,
                    height: dimisions.width * (7 / 12),
                    marginTop: 20,
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      dispatch(setFilial(filial));
                      navigation.navigate('Entry');
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        padding: 10,
                        height: '20%',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: 'black',
                          fontFamily: 'Inter-Medium',
                          fontSize: moderateScale(14),
                        }}>
                        {filial?.address}
                      </Text>
                    </View>
                    <MapView
                      region={{
                        latitude: filial?.coordinate_lat,
                        longitude: filial?.coordinate_lon,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                      }}
                      style={{
                        width: '100%',
                        height: '60%',
                      }}>
                      <Marker
                        tracksViewChanges={false}
                        coordinate={{
                          latitude: filial?.coordinate_lat,
                          longitude: filial?.coordinate_lon,
                        }}>
                        <Image
                          source={selected_location}
                          style={{height: 45, width: 45}}
                        />
                      </Marker>
                    </MapView>
                    <View
                      style={{
                        backgroundColor: 'white',
                        height: '20%',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: '#B3B3B3',
                          fontFamily: 'Inter-Regular',
                          fontSize: moderateScale(14),
                          paddingHorizontal: 10,
                        }}>
                        Есть запись:&nbsp;
                        <Text
                          allowFontScaling={false}
                          style={{
                            fontFamily: 'Inter-Medium',
                            fontSize: moderateScale(14),
                            color: 'black',
                          }}>
                          {moment(filial.datetime).format('D MMMM HH:mm')}
                        </Text>
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Shadow>
              ))}
          </View>
        )}
      </KeyboardAwareScrollView>
      {is_map_active ? (
        <BottomSheet
          height={verticalScale(210)}
          backgroundColor="null"
          sheetBackgroundColor="#FFFFFF"
          radius={30}
          hasDraggableIcon
          ref={bottomSheet}
          closeFunction={() => SetSelectedFilial(null)}>
          {selected_filial ? (
            <View
              style={{
                padding: 10,
                marginBottom: verticalScale(70),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    color: 'black',
                    width: '45%',
                    fontFamily: 'Inter-Medium',
                    fontSize: moderateScale(15),
                  }}>
                  {selected_filial?.address}
                </Text>

                <Button
                  height={moderateScale(45)}
                  text="Записаться"
                  width="40%"
                  onPress={() => {
                    dispatch(setFilial(selected_filial));
                    navigation.navigate('Entry');
                  }}
                />
              </View>
              <View
                style={{
                  marginBottom: verticalScale(5),
                }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    color: '#B3B3B3',
                    fontFamily: 'Inter-Regular',
                    fontSize: moderateScale(14),
                  }}>
                  Есть запись:
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: 'Inter-Medium',
                    fontSize: moderateScale(15),
                    color: 'black',
                  }}>
                  {moment(selected_filial?.datetime).format('D MMMM HH:mm')}
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: 'Inter-Regular',
                      fontSize: moderateScale(14),
                      color: '#B3B3B3',
                      textTransform: 'none',
                    }}>
                    &nbsp; {selected_filial?.stylists_length} активных стилистов
                  </Text>
                </Text>
              </View>
            </View>
          ) : null}
        </BottomSheet>
      ) : null}

      <BottomNavigator
        navigation={navigation}
        active={is_global ? 'filials' : 'entry'}
      />
    </>
  );
};
