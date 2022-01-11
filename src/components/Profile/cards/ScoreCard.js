import React from 'react';
import {observer} from 'mobx-react-lite';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ArrowRight from 'assets/arrow_right.svg';
import ScoreCardImg from 'assets/score_card.png';
import {moderateScale} from 'utils/Normalize';

export const ScoreCard = observer(({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Scores')}
      style={styles.scores_block}>
      <View style={styles.score_card}>
        <View style={styles.score_card_image_container}>
          <Image style={styles.score_image} source={ScoreCardImg} />
          <Text style={styles.score_card_number}>1234 1234</Text>
        </View>
        <View>
          <Text style={styles.score_title}>Баллов на счету:</Text>
          <Text style={styles.score_count}>- 500</Text>
        </View>
      </View>
      <ArrowRight fill={'black'} />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  scores_block: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#BFBFBF',
    borderStyle: 'solid',
    borderRadius: 15,
    padding: 16,
  },
  score_card: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  score_card_image_container: {
    position: 'relative',
  },
  score_image: {
    marginRight: 10,
    borderRadius: 8,
  },
  score_card_number: {
    bottom: 3,
    left: 6,
    position: 'absolute',
    fontSize: moderateScale(10),
    color: 'white',
    lineHeight: 18,
  },
  score_title: {
    fontFamily: 'Inter-Regular',
    color: '#B0B0B0',
    fontSize: moderateScale(16),
    lineHeight: 20,
    marginBottom: 8,
  },
  score_count: {
    fontFamily: 'Inter-SemiBold',
    color: 'black',
    fontSize: moderateScale(18),
    lineHeight: 18,
  },
});
