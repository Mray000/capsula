import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DotIcon from 'assets/dot.svg';
import {Shadow} from 'react-native-shadow-2';
import {moderateScale} from 'utils/Normalize';
import ArrowRight from 'assets/arrow_right.svg';
import {formatDateISOToString} from 'utils/dateUtils';

export const FeatureCard = ({navigation, entry}) => {
  const [onPress, setOnPress] = useState(false);
  return (
    <Shadow viewStyle={{width: '100%', marginBottom: 8}}>
      <TouchableOpacity
        onPressIn={() => setOnPress(true)}
        onPressOut={() => setOnPress(false)}
        activeOpacity={1}
        onPress={() =>
          navigation.navigate('EntryDetails', {
            entryId: entry?.id,
            company_id: entry?.company?.id,
          })
        }
        style={styles.container}>
        <View style={styles.card}>
          <View>
            <View style={styles.card_info_time}>
              <DotIcon fill={'black'} />
              <Text style={styles.card_info_time_text}>
                {formatDateISOToString(entry.datetime)}
              </Text>
            </View>
            <View style={styles.card_info_service}>
              <Text style={styles.card_service_text}>
                {entry?.services.map(i => i.title)}
              </Text>
              <ArrowRight fill={onPress ? 'black' : '#E8E8E8'} />
            </View>
          </View>
          <View style={styles.card_price}>
            <View style={styles.card_master}>
              <Image
                style={styles.master_image}
                source={{uri: entry?.staff.avatar}}
              />
              <Text style={styles.master_name}>{entry?.staff.name}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.card_price_count}>
            {entry?.services.reduce((acc, el) => acc + el.cost, 0)} ₽
          </Text>
      </TouchableOpacity>
    </Shadow>
  );
};

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
    marginBottom: 4,
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
    right: 10,
    bottom: 2,
    position: "absolute",
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
    fontSize: moderateScale(18),
  },
});
