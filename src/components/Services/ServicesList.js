import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Header} from 'utils/Header';
import Loop from 'assets/loop.svg';

import {entry} from 'store/entry';
import {moderateScale, verticalScale} from 'utils/Normalize';
import {Category} from './Category';
import {api} from 'utils/api';
import {observer} from 'mobx-react-lite';
import Cross from 'assets/cross.svg';
import {dimisions} from 'utils/demisions';
import {Loader} from 'utils/Loader';
import {BottomNavigator} from 'utils/BottomNavigator';

export const ServicesList = observer(({navigation}) => {
  const [services_categorys, SetServicesCategorys] = useState(null);
  const [filter, SetFilter] = useState('');
  useEffect(() => {
    api
      .getServicesCategorys(
        entry.filial.id,
        entry.stylist?.id,
        entry.date_and_time,
      )
      .then(SetServicesCategorys);
  }, []);
  if (!services_categorys) return <Loader />;
  return (
    <>
      <ScrollView style={{flex: 1, paddingHorizontal: 10}}>
        <Header
          navigation={navigation}
          title="Услуги"
          to="Entry"
          child={
            entry.services.length ? (
              <TouchableOpacity
                style={{position: 'absolute', right: -0.0000000001}}
                onPress={() => navigation.navigate('Entry')}>
                <Text
                  style={{
                    fontFamily: 'Inter-SemiBold',
                    fontSize: moderateScale(13),
                    color: 'black',
                    fontWeight: '600',
                  }}>
                  Готово
                </Text>
              </TouchableOpacity>
            ) : null
          }
        />
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
              color: 'black',
            }}
            placeholder="Поиск по названию"
            placeholderTextColor={'#B3B3B3'}
          />
        </View>
        {entry.services.length ? (
          <View style={{marginTop: 10}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: moderateScale(13),
                  color: '#B0B0B0',
                }}>
                выбранные услуги
              </Text>
              <Text
                style={{
                  fontFamily: 'Inter-SemiBold',
                  fontSize: moderateScale(13),
                  color: 'black',

                  flexDirection: 'row',
                }}>
                {entry.services.length}(
                {entry.services.reduce((acc, el) => acc + el.price, 0)}) ₽
              </Text>
            </View>
            {entry.services.map(el => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  marginTop: 10,
                  borderRadius: 10,
                  height: dimisions.height / 12,
                  paddingHorizontal: 20,
                  shadowColor: '#C6C6C6',
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.51,
                  shadowRadius: 13.16,

                  elevation: 8,
                }}>
                <View style={{width: '95%'}}>
                  <Text
                    style={{
                      fontFamily: 'Inter-SemiBold',
                      fontSize: moderateScale(13),
                      color: 'black',
                    }}>
                    {el.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Inter-Medeium',
                      fontSize: moderateScale(13),
                      color: '#333333',
                    }}>
                    {el.price} ₽
                  </Text>
                </View>
                <TouchableOpacity onPress={() => entry.setServices(el)}>
                  <Cross fill={'#333333'} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}

        {services_categorys
          .filter(category =>
            category.title.toLowerCase().includes(filter.toLowerCase()),
          )
          .map(category => (
            <Category
              key={category.id}
              title={category.title}
              staffs={category.staffs}
            />
          ))}
      </ScrollView>
      <BottomNavigator active="entry" navigation={navigation} />
    </>
  );
});
