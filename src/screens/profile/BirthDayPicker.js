import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import ArrowLeft from 'assets/arrow_left.svg';
import ArrowRight from 'assets/arrow_right.svg';
import {moderateScale, scale} from 'utils/Normalize';
import moment from 'moment';
import {Shadow} from 'react-native-shadow-2';
import { Header } from 'utils/Header';

export const BirthDayPicker = ({CloseModal, SetSelectedDate}) => {
  return (
    <View>
    <Header onBack={CloseModal} title={"Выберите дату рождения"}/>
      <Calendar
        maxDate={new Date()}
        onDayPress={day =>
          SetSelectedDate(moment(day.dateString).format('YYYY-MM-DD'))
        }
        renderArrow={direction => (
          <Shadow
            startColor={'#00000008'}
            finalColor={'#00000001'}
            offset={[0, 8]}
            distance={20}>
            <View
              style={{
                width: scale(30),
                height: scale(30),
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
              }}>
              {direction === 'left' ? (
                <ArrowLeft fill="black" width={10} height={10} />
              ) : (
                <ArrowRight fill="black" width={10} height={10} />
              )}
            </View>
          </Shadow>
        )}
        theme={{
          backgroundColor: '#FCFCFC',
          calendarBackground: '#FCFCFC',
          todayTextColor: 'black',
        //   textDisabledColor: "black",
          //   dotColor: 'black',
          dayTextColor: 'black',
          //   textMonthFontWeight: 'bold',
          //   textDayHeaderFontWeight: 'bold',

          textMonthFontSize: 18,
          'stylesheet.calendar.header': {
            week: {
              borderColor: '#F2F2F2',
              borderBottomWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 12,
              marginTop: 5,
              paddingBottom: 10,
              fontSize: moderateScale(16),
            },
          },
        }}
      />
    </View>
  );
};
