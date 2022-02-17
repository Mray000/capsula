import React, {useEffect, useState} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Header} from 'utils/Header';
import Loop from 'assets/loop.svg';
import {Loader} from 'utils/Loader';
import {Stylist} from './Stylist.js';
import {moderateScale, verticalScale} from 'utils/Normalize';
import {BottomNavigator} from 'utils/BottomNavigator';
import Lock from 'assets/lock.svg';
import {useDispatch, useSelector} from 'react-redux';
import {setStylist} from '../../redux/entryReducer';
import {getAllStylistsTC, getStylistsTC, setAllStylists} from '../../redux/stylistReducer';

export const StylistsList = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [filter, SetFilter] = useState('');
  const is_global = route.params.is_global;
  const {filial, services, date_and_time} = useSelector(state => state?.entry);
  const stylists = useSelector(state => state?.stylists.allStylists);

  useEffect(() => {
    if (is_global) {
      dispatch(getAllStylistsTC());
    } else {
      dispatch(
        getStylistsTC(
          filial,
          services.map(el => el.id),
          date_and_time,
        ),
      );
    }
    return () => {
      dispatch(setAllStylists([]))
    }
  }, [is_global]);

  if (!stylists.length) return <Loader />;
  return (
    <>
      <View
        style={{
          backgroundColor: '#FCFCFC',
          marginBottom: verticalScale(60),
        }}>
        <View style={{paddingHorizontal: 10}}>
          {is_global ? (
            <Text
              style={{
                fontSize: moderateScale(20),
                color: 'black',
                marginTop: 20,
                fontFamily: 'Inter-SemiBold',
              }}>
              Наши стилисты
            </Text>
          ) : (
            <Header navigation={navigation} title="Стилист" to="Entry" />
          )}

          <View
            style={{
              backgroundColor: '#EFEFEF',
              flexDirection: 'row',
              marginTop: 10,
              marginBottom: 10,
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
                width: '90%',
                padding: 0,
                color: 'black',
              }}
              placeholder="Поиск по имени"
              placeholderTextColor={'#B3B3B3'}
            />
          </View>
        </View>
        {!is_global ? (
          <View style={{paddingHorizontal: 10}}>
            <TouchableOpacity
              onPress={() => {
                dispatch(setStylist('Не имеет значения'));
                navigation.navigate('Entry');
              }}
              style={{
                flexDirection: 'row',
                padding: 7,
                backgroundColor: 'white',
                borderRadius: 5,
                alignSelf: 'flex-start',
                marginTop: 10,
              }}>
              <View style={{marginTop: 2}}>
                <Lock />
              </View>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: moderateScale(13),
                  fontFamily: 'Inter-Medium',
                  color: 'black',
                }}>
                Сотрудник не важен
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <FlatList
          keyExtractor={item => item.id}
          style={{backgroundColor: '#FCFCFC', paddingBottom: 20}}
          data={stylists
            .filter(stylist => stylist.name !== "Позвони мне")
            .sort((a, b) => Number(b.weight) - Number(a.weight))
            .filter(stylist =>
              stylist.name.toLowerCase().includes(filter.toLocaleLowerCase()),
            )
           }
          renderItem={({item}) => (
            <Stylist
              key={item.id}
              navigation={navigation}
              stylist={item}
              is_global={is_global}
            />
          )}
        />
      </View>
      <BottomNavigator
        active={!is_global ? 'entry' : 'stylists'}
        navigation={navigation}
      />
    </>
  );
};