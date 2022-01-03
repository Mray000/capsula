import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {entry} from 'store/entry';
import {api} from 'utils/api';
import {BottomNavigator} from 'utils/BottomNavigator';
import {Header} from 'utils/Header.js';
import {Loader} from 'utils/Loader';
import {verticalScale} from 'utils/Normalize';
import {DatePicker} from './DatePicker';
import {TimePicker} from './TimePicker';

export const Calendar = ({navigation}) => {
  const [seances, SetSeances] = useState(null);
  const [selected_date, SetSelectedDate] = useState(null);
  useEffect(() => {
    api
      .getStylistBookableSeances(
        entry.filial.id,
        entry.stylist?.id,
        entry.services.map(el => el.id),
      )
      .then(SetSeances);
  }, []);

  console.log('rnder');
  if (!seances) return <Loader />;
  return (
    <>
      <ScrollView style={{marginBottom: verticalScale(60)}}>
        <Header
          navigation={navigation}
          to="Entry"
          title={selected_date ? 'Время' : 'Дата'}
          onBack={() =>
            selected_date ? SetSelectedDate(null) : navigation.navigate('Entry')
          }
        />
        {!selected_date ? (
          <DatePicker
            SetSelectedDate={SetSelectedDate}
            dates={seances.map(el => el.date)}
          />
        ) : (
          <TimePicker
            seances={seances}
            navigation={navigation}
            selected_date={selected_date}
            SetSelectedDate={SetSelectedDate}
          />
        )}
      </ScrollView>
      <BottomNavigator active={'entry'} navigation={navigation} />
    </>
  );
};
