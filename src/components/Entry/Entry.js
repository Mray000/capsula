import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {api} from 'utils/api';
import {moderateScale} from 'utils/Normalize';
import Cross from 'assets/cross.svg';
import ArrowRight from 'assets/arrow_right.svg';
import {Loader} from 'utils/Loader';
import {observer} from 'mobx-react-lite';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import {entry} from 'store/entry';
import SalesSwipper from 'utils/SalesSwipper';
import {Button} from 'utils/Button';
import {dimisions} from 'utils/demisions';
import moment from 'moment';
import {verticalScale} from 'utils/Normalize';
import {SplashVideo} from 'utils/SplashVideo';
import {BottomNavigator} from 'utils/BottomNavigator.js';
import {authentication} from 'store/authentication';
export const Entry = observer(({navigation}) => {
  const [sales, SetSales] = useState(null);
  const [is_load, SetIsLoad] = useState(false);
  const [bonus, SetBonus] = useState(0);

  useEffect(() => {
    if (authentication.is_login) {
      api.getUserCards().then(data => {
        if (data.length) SetBonus(data[0]?.bonus);
      });
    }
  }, [authentication.is_login]);

  useEffect(() => {
    api
      .getSales()
      .then(data => data.filter(el => el.image_group?.images?.basic?.path))
      .then(data =>
        data.map(el => ({
          image: el.image_group?.images?.basic?.path,
          title: el.booking_title,
          min_price: el.price_min,
          max_price: el.price_max,
        })),
      )
      .then(SetSales);

    setTimeout(() => {
      SetIsLoad(true);
    }, 6000);
  }, []);

  let form_elements = [
    {
      value: entry.filial?.address,
      is_active: true,
      title: 'Выберите филиал',
      header_title: 'филиал',
      navigate: 'Filials',
      onClear: () => entry.clearFilial(),
    },
    {
      value: entry.services.map(el => el?.title).join(', '),
      is_active: Boolean(entry.filial),
      title: 'Выберите услугу',
      header_title: 'услуга',
      navigate: 'ServicesList',
      onClear: () => entry.clearServices(),
    },
    {
      value: entry.stylist?.name || entry.stylist,
      is_active: Boolean(entry.filial),
      title: 'Выберите стилиста',
      header_title: 'стилист',
      navigate: 'StylistsList',
      onClear: () => entry.clearStylist(),
    },
    {
      value: entry.date_and_time
        ? moment(entry.date_and_time.date).format('DD MMMM') +
          ' в ' +
          entry.date_and_time.time
        : null,
      is_active: Boolean(entry.filial),
      title: 'Назначьте дату и время',
      header_title: 'дата и время',
      navigate: 'Calendar',
      onClear: () => entry.clearDateAndTime(),
    },
  ];

  if (!is_load || !sales) return <SplashVideo />;
  console.log('render');
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
        <SalesSwipper data={sales} />
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
              <FormElement {...el} navigation={navigation} />
            ))}
            {authentication.is_login ? (
              <View>
                <View
                  style={{
                    backgroundColor: '#EFEFEF',
                    borderWidth: 0,
                    borderColor: '#E8E8E8',

                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 10,
                    borderRadius: 15,
                    paddingHorizontal: 20,
                    height: dimisions.height / 12,
                  }}>
                  {console.log(entry.bonus, 'gfdgfdg')}
                  <TextInput
                    selectionColor={'black'}
                    style={{
                      color: 'black',
                      fontFamily: 'Inter-Medium',
                      fontSize: moderateScale(16),
                      padding: 0,
                      width: '90%',
                      height: '100%',
                    }}
                    placeholderTextColor="black"
                    value={0}
                    keyboardType="numeric"
                    placeholder="Укажите бонсусные баллы"
                  />

                  <ArrowRight fill={'black'} />
                </View>
                <Text
                  style={{
                    fontFamily: 'Inter-Regular',
                    color: '#B0B0B0',
                    fontSize: moderateScale(14),
                    marginTop: 10,
                  }}>
                  Накоплено {bonus} баллов
                </Text>
              </View>
            ) : null}
          </View>
          <Button
            disabled={true}
            height={dimisions.height / 12}
            text="Создать запись"
          />
        </View>
      </ScrollView>
      <BottomNavigator active="entry" navigation={navigation} />
    </>
  );
});

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
