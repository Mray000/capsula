import React, {useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {BottomNavigator} from 'utils/BottomNavigator';
import {dimisions} from 'utils/demisions';
import {Header} from 'utils/Header';
import ScoreCard from 'assets/score_card_large.png';
import {moderateScale, verticalScale} from 'utils/Normalize';
import {useDispatch, useSelector} from 'react-redux';
import {getLoyalityCardsTC} from '../../redux/profileReducer';
import {Loader} from 'utils/Loader';

export const Scores = ({navigation}) => {
  const dispatch = useDispatch();
  const loyality_cards = useSelector(state => state?.profile.loyality_cards);
  const {user_id, phone} = useSelector(state => state?.auth);

  useEffect(() => {
    dispatch(getLoyalityCardsTC(user_id));
  }, [user_id]);

  if (!loyality_cards) return <Loader />;
  return (
    <>
      <View style={styles.container}>
        <Header onBack={navigation.goBack} title={'Мои баллы'} />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <>
            <Text allowFontScaling={false} style={styles.score_text}>
              Чтобы списать баллы, покажите свою карту администратору салона при
              посещении. Скидка будет применена при оплате визита. Правила
              списания баллов указаны ниже
            </Text>
            <View style={styles.score_card}>
              <Image style={styles.score_image} source={ScoreCard} />
              <Text allowFontScaling={false} style={styles.number_card}>
                {phone}
              </Text>
              <View style={styles.score_card_title_container}>
                <Text allowFontScaling={false} style={styles.score_card_title}>
                  накоплено:{' '}
                </Text>
                <Text allowFontScaling={false} style={styles.score_card_count}>
                  {loyality_cards?.balance ?? 0} ₽ баллов
                </Text>
              </View>
            </View>
            <Text allowFontScaling={false} style={styles.score_text}>
              Первое начисление бонусных баллов происходит в течение суток с
              момента авторизации. Если ваши бонусы не появились, позвоните на
              номер +7 812 566 63 01. Мы поможем вам
            </Text>
            <Text allowFontScaling={false} style={styles.score_text}>
              Начисление: С любой записи через приложение CAPSULA вам будет
              начислен кэшбек 5% со всех услуг и товаров после оплаты визита
            </Text>
            <Text allowFontScaling={false} style={styles.score_text}>
              Списание: Потратить бонусные баллы вы можете на услуги по
              категории любого специалиста. А именно на категории услуг:
              «Стрижка и укладка» и «Окрашивание и стрижка | По категории».
              Максимальная сумма списания составляет - 20% от вашего визита
            </Text>
          </>
        </ScrollView>
      </View>
      <BottomNavigator active="profile" navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal:
      dimisions.width * 0.03 +
      (dimisions.width * 0.94 - dimisions.width * 0.94 * 0.97) / 2,
    marginBottom: verticalScale(60),
  },
  score_text: {
    fontFamily: 'Inter-Regular',
    color: '#808080',
    fontSize: moderateScale(16),
    lineHeight: 26,
    marginBottom: 8,
  },
  score_card: {
    position: 'relative',
    marginBottom: 15,
  },
  score_image: {
    position: 'relative',
    marginTop: 8,
    width: '100%',
    borderRadius: 15,
  },
  number_card: {
    top: 24,
    left: 24,
    right: 20,
    fontFamily: 'Inter-SemiBold',
    fontSize: moderateScale(38),
    position: 'absolute',
    color: 'white',
  },
  score_card_title_container: {
    bottom: 24,
    left: 24,
    fontFamily: 'Inter-SemiBold',
    fontSize: moderateScale(38),
    position: 'absolute',
    color: 'white',
  },
  score_card_title: {
    fontSize: moderateScale(16),
    color: '#808080',
    marginBottom: 2,
  },
  score_card_count: {
    fontSize: moderateScale(24),
    color: 'white',
    lineHeight: 29,
  },
});
