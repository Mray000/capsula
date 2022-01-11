import React from 'react';
import {observer} from 'mobx-react-lite';
import {Image, StyleSheet, Text, View} from 'react-native';
import {BottomNavigator} from 'utils/BottomNavigator';
import {dimisions} from 'utils/demisions';
import {Header} from 'utils/Header';
import ScoreCard from "../../assets/score_card_large.png"
import {moderateScale} from "utils/Normalize";

export const Scores = observer(({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <Header
          onBack={navigation.goBack}
          title={'Мои баллы'}
        />
        <Text style={styles.score_text}>
          Чтобы списать баллы, укажите их при
          создании записи в приложении. Скидка будет применена во время посещения.
        </Text>
        <Text style={styles.score_text}>
          Либо покажите карту клиента администратору салона при посещении.
        </Text>
        <View style={styles.score_card}>
          <Image style={styles.score_image} source={ScoreCard}/>
          <Text style={styles.number_card}>
            № 4505 8475
          </Text>
          <View style={styles.score_card_title_container}>
            <Text style={styles.score_card_title}>накоплено: </Text>
            <Text style={styles.score_card_count}>500 ₽ баллов</Text>
          </View>
        </View>
      </View>
      <BottomNavigator active="profile" navigation={navigation} />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal:
      dimisions.width * 0.03 +
      (dimisions.width * 0.94 - dimisions.width * 0.94 * 0.97) / 2,
  },
  score_text: {
    fontFamily: 'Inter-Regular',
    color: '#808080',
    fontSize: moderateScale(16),
    lineHeight: 26,
    marginBottom: 8,
  },
  score_card: {
    position: "relative"
  },
  score_image: {
    position: "relative",
    marginTop: 8,
    width: "100%",
    borderRadius: 15,
  },
  number_card: {
    top: 24,
    left: 24,
    fontFamily: 'Inter-SemiBold',
    fontSize: moderateScale(38),
    position: "absolute",
    color: "white"
  },
  score_card_title_container: {
    bottom: 24,
    left: 24,
    fontFamily: 'Inter-SemiBold',
    fontSize: moderateScale(38),
    position: "absolute",
    color: "white"
  },
  score_card_title: {
    fontSize: moderateScale(16),
    color: '#808080',
    marginBottom: 2,
  },
  score_card_count: {
    fontSize: moderateScale(24),
    color: "white",
    lineHeight: 29,
  },
});
