import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from 'utils/Header';
import Loop from 'assets/loop.svg';

import {moderateScale, verticalScale} from 'utils/Normalize';
import {Category} from './Category';
import Cross from 'assets/cross.svg';
import {dimisions} from 'utils/demisions';
import {Loader} from 'utils/Loader';
import {BottomNavigator} from 'utils/BottomNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllServicesTC,
  setAllCategories,
  setServices,
} from '../../redux/entryReducer';

export const ServicesList = ({navigation}) => {
  const dispatch = useDispatch();
  const [filter, SetFilter] = useState('');
  const {stylist, services, date_and_time, filial, allCategories} = useSelector(
    state => state?.entry,
  );

  useEffect(() => {
    dispatch(
      getAllServicesTC(filial?.id, stylist?.id, date_and_time, services),
    );
    return () => {
      dispatch(setAllCategories([]));
    };
  }, [services]);
  const addServiceHandler = async service => {
    navigation.goBack();
    dispatch(setServices(service));
  };
  const addServiceToListHandler = async service => {
    dispatch(setServices(service));
  };

  if (!allCategories.length) return <Loader />;
  return (
    <>
      <Header
        navigation={navigation}
        title="Услуги"
        to="Entry"
        child={
          services.length ? (
            <TouchableOpacity
              style={{position: 'absolute', right: -0.0000000001}}
              onPress={() => navigation.navigate('Entry')}>
              <Text
                allowFontScaling={false}
                style={{
                  paddingRight: 16,
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
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={{
          flex: 1,
          marginBottom: verticalScale(70),
          paddingHorizontal: 10,
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
              color: 'black',
            }}
            placeholder="Поиск по названию"
            placeholderTextColor={'#B3B3B3'}
          />
        </View>
        {services.length ? (
          <View style={{marginTop: 10}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: moderateScale(13),
                  color: '#B0B0B0',
                }}>
                выбранные услуги
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: 'Inter-SemiBold',
                  fontSize: moderateScale(13),
                  color: 'black',

                  flexDirection: 'row',
                }}>
                {services.length}(
                {services.reduce((acc, el) => acc + el.price, 0)}) ₽
              </Text>
            </View>
            {services.map(el => (
              <View
                key={el.id}
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
                    allowFontScaling={false}
                    style={{
                      fontFamily: 'Inter-SemiBold',
                      fontSize: moderateScale(13),
                      color: 'black',
                    }}>
                    {el.title}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: 'Inter-Medeium',
                      fontSize: moderateScale(13),
                      color: '#333333',
                    }}>
                    {el.price} ₽
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setServices(el));
                  }}>
                  <Cross fill={'#333333'} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}

        {allCategories
          .filter(category => category.staffs.length)
          .filter(category => category.title !== 'Позвони мне')
          .filter(category =>
            category.title.toLowerCase().includes(filter.toLowerCase()),
          )
          .map(category => (
            <Category
              addServiceHandler={addServiceHandler}
              addServiceToListHandler={addServiceToListHandler}
              key={category.id}
              title={category.title}
              staffs={category.staffs}
            />
          ))}
      </ScrollView>
      <BottomNavigator active="entry" navigation={navigation} />
    </>
  );
};
