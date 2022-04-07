import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {moderateScale, verticalScale} from 'utils/Normalize';
import {BottomNavigator} from 'utils/BottomNavigator';
import {useDispatch} from 'react-redux';
import {clearServices, setFilial,} from '../../redux/entryReducer';
import {Header} from 'utils/Header';
import {dimisions} from 'utils/demisions';
import {Loader} from 'utils/Loader';
import {Button} from 'utils/Button';

export const CurrentSale = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {currentSaleInfo} = route?.params;

  const createEntry = () => {
    dispatch(setFilial(null));
    dispatch(
      clearServices([
        {
          id: currentSaleInfo.id,
          price: currentSaleInfo.price_min,
          title: currentSaleInfo.title,
        },
      ]),
      navigation.navigate('Entry'),
    );
  };

  if (!currentSaleInfo?.id) return <Loader />;

  return (
    <>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={{backgroundColor: '#FCFCFC', marginBottom: verticalScale(80)}}>
        <Header onBack={navigation.goBack} title={'Специальное предложение'} />

        <View
          style={{
            flex: 1,
            marginBottom: verticalScale(20),
            paddingVertical: 10,
            paddingHorizontal:
              dimisions.width * 0.03 +
              (dimisions.width * 0.94 - dimisions.width * 0.94 * 0.97) / 2,
          }}>
          <View
            style={{
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Image
              style={{
                height: 144,
                borderRadius: 15,
                width: dimisions.width - 20,
              }}
              source={{uri: currentSaleInfo?.image}}
            />
          </View>
          <View>
            <Text
              allowFontScaling={false}
              style={{
                color: 'black',
                fontFamily: 'Inter-SemiBold',
                fontSize: moderateScale(18),
                marginTop: 10,
                marginBottom: 8,
              }}>
              {currentSaleInfo?.title}
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                paddingVertical: 3,
                paddingHorizontal: 5,
                alignSelf: 'flex-start',
                borderWidth: 1,
                borderColor: '#EBEBEB',
                marginBottom: 8,
                borderRadius: 10,
                color: 'black',
                fontFamily: 'Inter-SemiBold',
                fontSize: moderateScale(18),
              }}>
              {currentSaleInfo?.min_price === currentSaleInfo?.max_price
                ? `${currentSaleInfo?.min_price} ₽`
                : `${currentSaleInfo?.min_price} - ${currentSaleInfo?.max_price} ₽`}
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                color: '#808080',
                fontFamily: 'Inter-Regular',
                fontSize: moderateScale(16),
                lineHeight: 26,
                marginBottom: 18,
              }}>
              {currentSaleInfo?.comment}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal:
              dimisions.width * 0.03 +
              (dimisions.width * 0.94 - dimisions.width * 0.94 * 0.97) / 2,
          }}>
          <Button
            onPress={createEntry}
            height={dimisions.height / 12}
            text="Записаться на услугу"
          />
        </View>
      </ScrollView>
      <BottomNavigator active="entry" navigation={navigation} />
    </>
  );
};
