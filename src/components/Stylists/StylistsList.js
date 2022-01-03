import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  Image,
} from 'react-native';
import {Header} from 'utils/Header';
import Loop from 'assets/loop.svg';
import {Loader} from 'utils/Loader';
import {api} from 'utils/api';
import {entry} from 'store/entry';
import {Stylist} from './Stylist.js';
import {verticalScale, moderateScale} from 'utils/Normalize.js';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BottomNavigator} from 'utils/BottomNavigator.js';
import Lock from 'assets/lock.svg';
export const StylistsList = ({navigation, route}) => {
  const [stylists, SetStylists] = useState(null);
  const [filter, SetFilter] = useState('');
  let is_global = route.params.is_global;
  useEffect(() => {
    if (is_global) {
      SetStylists(null);
      api.getAllStylists().then(SetStylists);
    } else {
      api
        .getStylists(
          entry.filial,
          entry.services.map(el => el.id),
          entry.date_and_time,
        )
        .then(SetStylists);
    }
  }, [is_global]);
  if (!stylists) return <Loader />;
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
                entry.setStylist('Не имеет значения');
                navigation.navigate('Entry');
              }}
              style={{
                flexDirection: 'row',
                padding: 7,
                // backgroundColor: '#DDF3E1',
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
            .filter(stylist =>
              stylist.name.toLowerCase().includes(filter.toLocaleLowerCase()),
            )
            .sort((a, b) => Number(b.rating) - Number(a.rating))}
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
