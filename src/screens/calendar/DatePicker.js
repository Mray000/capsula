import moment from 'moment';
import React from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {moderateScale, scale} from 'utils/Normalize';
import ArrowLeft from 'assets/arrow_left.svg';
import ArrowRight from 'assets/arrow_right.svg';
import {Shadow} from 'react-native-shadow-2';
import {View} from 'react-native';

LocaleConfig.locales['ru'] = {
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  monthNamesShort: [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ],
  dayNames: [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ],
  dayNamesShort: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
  today: 'Сегодня',
};
LocaleConfig.defaultLocale = 'ru';

export const DatePicker = ({dates, SetSelectedDate}) => {
  let markedDates = {
    [moment().format('YYYY-MM-DD')]: {marked: true},
  };
  dates.forEach(el => {
    markedDates[el] = {
      selected: true,
      selectedColor: '#F4F4F4',
      selectedTextColor: 'black',
      marked: moment().isSame(moment(el), 'day'),
      dotColor: 'black',
    };
  });

  if (!dates) return null;
  return (
    <Calendar
      firstDay={1}
      onDayPress={day =>
        dates.includes(day.dateString) ? SetSelectedDate(day.dateString) : null
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
        dotColor: 'black',
        dayTextColor: '#B0B0B0',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: 'bold',

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
      markedDates={markedDates}
    />
  );
};
