import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'utils/Normalize';
import {
  formatDateISOToString,
  formatDateWithYearISOToString,
} from 'utils/dateUtils';

export const HistoryCard = ({entry}) => {
  return (
    <View style={styles.history_card}>
      <View style={styles.history_card_info}>
        <Text allowFontScaling={false} style={styles.history_card_time}>
          {formatDateWithYearISOToString(entry.datetime)}
        </Text>
        <Text allowFontScaling={false} style={styles.history_card_service}>
          {entry?.services.map(i => i.title).join(', ')}
        </Text>
      </View>
      <View style={styles.history_card_price}>
        <View style={styles.history_card_master}>
          <Image
            style={styles.history_master_image}
            source={{uri: entry?.staff.avatar}}
          />
          <Text allowFontScaling={false} style={styles.history_master_name}>
            {entry?.staff.name}
          </Text>
        </View>
      </View>
      <Text allowFontScaling={false} style={styles.history_card_price_count}>
        {entry?.services.reduce((acc, el) => acc + el.cost, 0)} ₽
      </Text>
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
    right: 10,
    bottom: 2,
    position: 'absolute',
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
    fontSize: moderateScale(18),
  },
});
