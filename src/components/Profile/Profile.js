import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {moderateScale, verticalScale} from 'utils/Normalize';
import {dimisions} from 'utils/demisions';
import {BottomNavigator} from 'utils/BottomNavigator';
import SettingsIcon from '../../assets/settings.svg';
import {EmptyScreen} from './EmptyProfile';
import {FeatureCard} from './cards/FeatureCard';
import {HistoryCard} from './cards/HistoryCard';
import {ScoreCard} from './cards/ScoreCard';
import {authentication} from "store/authentication";

export const Profile = observer(({navigation}) => {
  const [isEmpty, setIsEmpty] = useState(false);
  if (!authentication.is_login){
    navigation.navigate("Login")
  }
  return (
    <>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={styles.main_scroll}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.user_settings_icon}>
              <SettingsIcon
                onPress={() => navigation.navigate('Settings')}
                width={22}
                height={22}
              />
            </View>
            <Text style={styles.user_name}>Alexandra</Text>
          </View>
          {isEmpty && <EmptyScreen />}
          <View style={styles.content_container}>
            <Text style={styles.content_subtitle}>мои будущие записи</Text>
            <FeatureCard navigation={navigation} name={'Irina'} />
          </View>
          <View style={styles.content_container}>
            <Text style={styles.content_subtitle}>доступные баллы</Text>
            <ScoreCard navigation={navigation} />
          </View>
          <View style={styles.content_container}>
            <Text style={styles.content_subtitle}>история посещений</Text>
            <HistoryCard />
          </View>
        </View>
      </ScrollView>
      <BottomNavigator active="profile" navigation={navigation} />
    </>
  );
});

const styles = StyleSheet.create({
  main_scroll: {
    backgroundColor: '#FCFCFC',
    marginBottom: verticalScale(60),
  },
  container: {
    flex: 1,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal:
      dimisions.width * 0.03 +
      (dimisions.width * 0.94 - dimisions.width * 0.94 * 0.97) / 2,
  },
  header: {
    marginBottom: 15,
  },
  user_name: {
    fontFamily: 'Inter-SemiBold',
    color: 'black',
    fontSize: moderateScale(24),
    lineHeight: 29,
  },
  user_settings_icon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  content_container: {
    marginBottom: 16,
  },
  content_subtitle: {
    fontFamily: 'Inter-Regular',
    color: '#B0B0B0',
    fontSize: moderateScale(14),
    marginBottom: 8,
  },
});
