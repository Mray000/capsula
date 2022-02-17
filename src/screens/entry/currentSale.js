import React, {useEffect} from 'react';
import {ScrollView, View, Text, Image} from 'react-native';
import {moderateScale, verticalScale} from 'utils/Normalize';
import {BottomNavigator} from 'utils/BottomNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearServices,
  getSalesByIdTC,
  setCurrentSaleInfo,
} from '../../redux/entryReducer';
import {Header} from 'utils/Header';
import {dimisions} from 'utils/demisions';
import {Loader} from 'utils/Loader';
import {Button} from 'utils/Button';

export const CurrentSale = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {sale_id} = route?.params;
  const {currentSaleInfo} = useSelector(state => state?.entry);

  useEffect(() => {
    dispatch(getSalesByIdTC(sale_id));
    return () => {
      dispatch(setCurrentSaleInfo({}));
    };
  }, [sale_id]);

  const createEntry = () => {
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
              source={{uri: currentSaleInfo.image_group.images.basic.path}}
            />
          </View>
          <View>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Inter-SemiBold',
                fontSize: moderateScale(18),
                marginTop: 10,
                marginBottom: 8,
              }}>
              {currentSaleInfo.booking_title}
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Inter-SemiBold',
                fontSize: moderateScale(18),
                lineHeight: 18,
                marginBottom: 8,
              }}>
              {currentSaleInfo.price_min === currentSaleInfo.price_max
                ? `${currentSaleInfo.price_min} ₽`
                : `${currentSaleInfo.price_min} - ${currentSaleInfo.price_max} ₽`}
            </Text>
            <Text
              style={{
                color: '#808080',
                fontFamily: 'Inter-Regular',
                fontSize: moderateScale(16),
                lineHeight: 26,
                marginBottom: 18,
              }}>
              {currentSaleInfo.comment}
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
