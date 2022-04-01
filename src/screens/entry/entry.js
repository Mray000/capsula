import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, verticalScale} from 'utils/Normalize';
import Cross from 'assets/cross.svg';
import ArrowRight from 'assets/arrow_right.svg';
import SalesSwipper from 'utils/SalesSwipper';
import {Button} from 'utils/Button';
import {dimisions} from 'utils/demisions';
import moment from 'moment';
import {SplashVideo} from 'utils/SplashVideo';
import {BottomNavigator} from 'utils/BottomNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearAllCreateEntryFields,
  clearServices,
  getSalesTC,
  setDateAndTime,
  setStylist,
} from '../../redux/entryReducer';

export const Entry = ({navigation}) => {
  const dispatch = useDispatch();
  const {filial, sales, services, stylist, date_and_time} = useSelector(
    state => state.entry,
  );
  const [is_load, SetIsLoad] = useState(false);
  useEffect(() => {
    dispatch(getSalesTC());
    setTimeout(() => {
      SetIsLoad(true);
    }, 6000);
    return () => {
      dispatch(clearAllCreateEntryFields())
    }
  }, []);

  const createEntry = () => {
    navigation.navigate('CreateEntry');
  };

  const form_elements = [
    {
      value: filial?.address,
      is_active: true,
      title: 'Выберите филиал',
      header_title: 'филиал',
      navigate: 'Filials',
      onClear: () => dispatch(clearAllCreateEntryFields()),
    },
    {
      value: services.map(el => el?.title).join(', '),
      is_active: Boolean(filial),
      title: 'Выберите услугу',
      header_title: 'услуга',
      navigate: 'ServicesList',
      onClear: () => dispatch(clearServices([])),
    },
    {
      value: stylist?.name || stylist,
      is_active: Boolean(filial),
      title: 'Выберите стилиста',
      header_title: 'стилист',
      navigate: 'StylistsList',
      onClear: () => dispatch(setStylist(null)),
    },
    {
      value: date_and_time?.date
        ? moment(date_and_time.date).format('DD MMMM') +
          ' в ' +
          date_and_time.time
        : null,
      is_active: Boolean(filial),
      title: 'Назначьте дату и время',
      header_title: 'дата и время',
      navigate: 'Calendar',
      onClear: () => dispatch(setDateAndTime(null)),
    },
  ];
  const disabled = !!form_elements.some(i => !i.value);
  if (!is_load || !sales) return <SplashVideo />;
  return (
    <>
      <ScrollView
        style={{backgroundColor: '#FCFCFC', marginBottom: verticalScale(60)}}>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal:
              dimisions.width * 0.03 +
              (dimisions.width * 0.94 - dimisions.width * 0.94 * 0.97) / 2,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: moderateScale(19),
              fontFamily: 'Inter-SemiBold',
              marginTop: 20,
            }}>
            Запись
          </Text>
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              color: '#B0B0B0',
              fontSize: moderateScale(14),
              marginTop: 10,
            }}>
            мы рекомендуем
          </Text>
        </View>
        <SalesSwipper navigation={navigation} data={sales.sort((a, b) => Number(b.min_price) - Number(a.min_price))} />
        <View
          style={{
            paddingHorizontal:
              dimisions.width * 0.03 +
              (dimisions.width * 0.94 - dimisions.width * 0.94 * 0.97) / 2,
            marginTop: 20,
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              color: '#B0B0B0',
              fontSize: moderateScale(14),
            }}>
            заполните данные для записи
          </Text>
          <View style={{marginBottom: 20}}>
            {form_elements.map(el => (
              <FormElement key={el.header_title} {...el} navigation={navigation} />
            ))}
          </View>
          <Button
            disabled={disabled}
            onPress={createEntry}
            height={dimisions.height / 12}
            text="Создать запись"
          />
        </View>
      </ScrollView>
      <BottomNavigator active="entry" navigation={navigation} />
    </>
  );
};

const FormElement = ({
  is_active,
  value,
  title,
  header_title,
  navigate,
  navigation,
  onClear,
}) => {
  if (!value) {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: is_active ? '#EFEFEF' : '#FCFCFC',
          borderWidth: is_active ? 0 : 1,
          borderColor: '#E8E8E8',

          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 10,
          borderRadius: 15,
          paddingHorizontal: 20,
          height: dimisions.height / 12,
        }}
        disabled={!is_active}
        onPress={() => navigation.navigate(navigate, {is_global: false})}>
        <Text
          style={{
            color: is_active ? 'black' : '#B0B0B0',
            fontFamily: 'Inter-Medium',
            fontSize: moderateScale(16),
          }}>
          {title}
        </Text>
        <ArrowRight fill={is_active ? 'black' : '#D6D6D6'} />
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 10,
          borderRadius: 15,
          height: dimisions.height / 12,
        }}>
        <View style={{width: '90%'}}>
          <Text
            style={{
              color: '#BFBFBF',
              fontFamily: 'Inter-Regular',
              fontSize: moderateScale(12),
            }}>
            {header_title}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              // width: '100%',
              color: 'black',
              fontFamily: 'Inter-Medium',
              fontSize: moderateScale(14),
            }}>
            {value}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onClear}
          style={{
            width: '10%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Cross fill="black" />
        </TouchableOpacity>
      </View>
    );
  }
};
