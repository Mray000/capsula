import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {moderateScale, verticalScale} from 'utils/Normalize';
import {dimisions} from 'utils/demisions';
import {BottomNavigator} from 'utils/BottomNavigator';
import SettingsIcon from 'assets/settings.svg';
import {EmptyScreen} from './EmptyProfile';
import {FeatureCard} from '../../components/profile/featureCard';
import {HistoryCard} from '../../components/profile/historyCard';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProfileIngo, setAllEntries} from '../../redux/profileReducer';
import {Loader} from 'utils/Loader';
import {afterNowDates, beforeNowDates} from 'utils/dateUtils';
import {Button} from 'utils/Button';
import {ScoreCard} from '../../components/profile/scoreCard';
import {useIsFocused} from '@react-navigation/core';
import {authMe} from '../../redux/authReducer';
import moment from 'moment';


export const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { id} = useSelector(state => state?.auth);
  const {profile, loyality_cards, allEntries} = useSelector(
    state => state?.profile,
  );

  const loading = useSelector(state => state?.common.loading);

  useEffect(() => {
    id ? dispatch(getAllProfileIngo(id)) : dispatch(authMe());
    return () => {
      dispatch(setAllEntries([]));
    };
  }, [id, isFocused]);

  if (loading || !isFocused) return <Loader />;
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
            <Text style={styles.user_name}>{profile.name}</Text>
          </View>
          {profile?.visits === 0 && !allEntries?.length ? (
            <EmptyScreen navigation={navigation} />
          ) : (
            <>
              <View style={styles.content_container}>
                {allEntries?.filter(i => beforeNowDates(i.datetime))?.length >
                0 ? (
                  <>
                    <Text style={styles.content_subtitle}>
                      мои будущие записи
                    </Text>
                    {allEntries
                      ?.filter(i => beforeNowDates(i.datetime))
                      .sort((a, b) => moment(b.datetime) - moment(a.datetime))
                      .map(i => (
                        <FeatureCard navigation={navigation} entry={i} />
                      ))}
                  </>
                ) : (
                  <Button
                    height={dimisions.height / 12}
                    onPress={() => navigation.navigate('Entry')}
                    text="Создать запись"
                  />
                )}
              </View>
              <View style={styles.content_container}>
                {loyality_cards && (
                  <>
                    <Text style={styles.content_subtitle}>доступные баллы</Text>
                    <ScoreCard
                      count={loyality_cards.balance}
                      card_number={loyality_cards.number}
                      id={loyality_cards.id}
                      navigation={navigation}
                    />
                  </>
                )}
              </View>
              {allEntries?.filter(i => afterNowDates(i.datetime)).length > 0 && (
                <View style={styles.content_container}>
                  <Text style={styles.content_subtitle}>история посещений</Text>
                  {allEntries
                    .sort((a, b) => moment(b.datetime) - moment(a.datetime))
                    .filter(i => afterNowDates(i.datetime))
                    .map(i => (
                      <HistoryCard entry={i} />
                    ))}
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
      <BottomNavigator active="profile" navigation={navigation} />
    </>
  );
};

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
