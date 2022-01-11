import React from 'react';
import {observer} from 'mobx-react-lite';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ScoreCard from 'assets/score_card.png';
import DotIcon from 'assets/star.svg';
import {Shadow} from 'react-native-shadow-2';
import {moderateScale} from 'utils/Normalize';
import ArrowRight from 'assets/arrow_right.svg';

export const FeatureCard = observer(({navigation, name}) => {
  return (
    <Shadow viewStyle={{width: '100%', marginBottom: 8}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Scores')}
        style={styles.container}>
        <View style={styles.card}>
          <View>
            <View style={styles.card_info_time}>
              <DotIcon fill={'black'} />
              <Text style={styles.card_info_time_text}>4 октября в 14:00 </Text>
            </View>
            <View style={styles.card_info_service}>
              <Text style={styles.card_service_text}>Ботокс для волос </Text>
              <ArrowRight fill={'black'} />
            </View>
          </View>
          <View style={styles.card_price}>
            <View style={styles.card_master}>
              <Image style={styles.master_image} source={ScoreCard} />
              <Text style={styles.master_name}>{name}</Text>
            </View>
            <Text style={styles.card_price_count}>580 ₽</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Shadow>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
  },
  card: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 15,
    backgroundColor: '#ffffff',
  },
  card_info_time: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  card_info_service: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  card_info_time_text: {
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
    fontSize: moderateScale(18),
    lineHeight: 20,
    marginBottom: 4,
    marginLeft: 8,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  card_service_text: {
    fontFamily: 'Inter-Regular',
    color: '#808080',
    fontSize: moderateScale(14),
    lineHeight: 20,
    marginBottom: 8,
  },
  card_master: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  master_image: {
    width: 44,
    height: 44,
    borderRadius: 44,
    marginRight: 8,
  },
  master_name: {
    fontFamily: 'Inter-Regular',
    color: '#000000',
    fontSize: moderateScale(16),
    lineHeight: 20,
  },
  card_price: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  card_price_count: {
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
    fontSize: moderateScale(18),
    lineHeight: 18,
  },
});
