import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import ScoreCard from 'assets/score_card.png';
import {moderateScale} from 'utils/Normalize';

export const HistoryCard = () => {
  return (
    <View style={styles.history_card}>
      <View style={styles.history_card_info}>
        <Text style={styles.history_card_time}>4 октября в 14:00 </Text>
        <Text style={styles.history_card_service}>Ботокс для волос</Text>
      </View>
      <View style={styles.history_card_price}>
        <View style={styles.history_card_master}>
          <Image style={styles.history_master_image} source={ScoreCard} />
          <Text style={styles.history_master_name}>Ирина Павлова</Text>
        </View>
        <Text style={styles.history_card_price_count}>580 ₽</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  history_card: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
    marginBottom: 8,
  },
  history_card_info: {},
  history_card_time: {
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
    fontSize: moderateScale(18),
    lineHeight: 20,
    marginBottom: 4,
  },
  history_card_service: {
    fontFamily: 'Inter-Regular',
    color: '#808080',
    fontSize: moderateScale(14),
    lineHeight: 20,
    marginBottom: 8,
  },
  history_card_master: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  history_master_image: {
    width: 44,
    height: 44,
    borderRadius: 44,
    marginRight: 8,
  },
  history_master_name: {
    fontFamily: 'Inter-Regular',
    color: '#000000',
    fontSize: moderateScale(16),
    lineHeight: 20,
  },
  history_card_price: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  history_card_price_count: {
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
    fontSize: moderateScale(18),
    lineHeight: 18,
  },
});