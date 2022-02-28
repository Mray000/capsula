import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ArrowRight from 'assets/arrow_right.svg';
import ScoreCardImg from 'assets/score_card.png';
import {moderateScale} from 'utils/Normalize';
import {addSpaceToScore} from 'utils/stringUtils';

export const ScoreCard = ({navigation, id, card_number, count}) => {
  const [onPress, setOnPress] = useState(false);
  return (
    <TouchableOpacity
      onPressIn={() => setOnPress(true)}
      onPressOut={() => setOnPress(false)}
      activeOpacity={1}
      onPress={() => {
        navigation.navigate('Scores', {score_id: id});
      }}
      style={styles.scores_block}>
      <View style={styles.score_card}>
        <View style={styles.score_card_image_container}>
          <Image style={styles.score_image} source={ScoreCardImg} />
          <Text style={styles.score_card_number}>
            {addSpaceToScore(card_number)}
          </Text>
        </View>
        <View>
          <Text style={styles.score_title}>Баллов на счету:</Text>
          <Text style={styles.score_count}> {count} ₽</Text>
        </View>
      </View>
      <ArrowRight fill={onPress ? 'black' : '#E8E8E8'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  scores_block: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderStyle: 'solid',
    borderRadius: 15,
    padding: 16,
    marginBottom: 8,
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
  },
  score_title: {
    fontFamily: 'Inter-Regular',
    color: '#B0B0B0',
    fontSize: moderateScale(16),
    marginBottom: 8,
  },
  score_count: {
    fontFamily: 'Inter-SemiBold',
    color: 'black',
    fontSize: moderateScale(18),
  },
});
