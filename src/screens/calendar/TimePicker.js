import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ArrowLeft from 'assets/arrow_left.svg';
import ArrowRight from 'assets/arrow_right.svg';
import {moderateScale, scale} from 'utils/Normalize';
import {Shadow} from 'react-native-shadow-2';
import moment from 'moment';
import {GetBlocks} from '/utils/GetBlocks';
import {verticalScale} from 'utils/Normalize';
import {useDispatch} from 'react-redux';
import {setDateAndTime, setNewDateEntry} from '../../redux/entryReducer';

const getHour = time => Number(time.split(':')[0]);
export const TimePicker = ({
  seances,
  selected_date,
  SetSelectedDate,
  navigation,
  to,
}) => {
  const dispatch = useDispatch();
  let index = seances.findIndex(el => el.date === selected_date);
  let times = seances[index].times;

  let dayTitles = [
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
    'воскресенье',
  ];

  let day_parts = {
    утро: times.filter(el => getHour(el) >= 0 && getHour(el) < 12),
    день: times.filter(el => getHour(el) >= 12 && getHour(el) < 18),
    вечер: times.filter(el => getHour(el) >= 18 && getHour(el) <= 23),
  };
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={{
        flex: 1,
        marginBottom: verticalScale(70),
        paddingHorizontal: 10,
      }}>
      <View style={{paddingHorizontal: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            alignItems: 'center',
          }}>
          <Shadow
            startColor={'#00000008'}
            finalColor={'#00000001'}
            offset={[0, 8]}
            distance={20}>
            <TouchableOpacity
              disabled={!index}
              onPress={() => SetSelectedDate(seances[index - 1].date)}
              style={{
                width: scale(30),
                height: scale(30),
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
              }}>
              <ArrowLeft
                fill={!index ? '#CCCCCC' : 'black'}
                width={10}
                height={10}
              />
            </TouchableOpacity>
          </Shadow>
          <View>
            <Text
              style={{
                color: 'black',
                textTransform: 'capitalize',
                textAlign: 'center',
                fontSize: moderateScale(15),
                fontFamily: 'Inter-Medium',
              }}>
              {dayTitles[moment(selected_date).weekday()]}
            </Text>
            <Text
              style={{
                color: '#B0B0B0',
                fontFamily: 'Inter-Regular',
                textAlign: 'center',
              }}>
              {moment(selected_date).format('DD MMMM')}
            </Text>
          </View>
          <Shadow
            startColor={'#00000008'}
            finalColor={'#00000001'}
            offset={[0, 8]}
            distance={20}>
            <TouchableOpacity
              disabled={index === seances.length - 1}
              onPress={() => SetSelectedDate(seances[index + 1].date)}
              style={{
                width: scale(30),
                height: scale(30),
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
              }}>
              <ArrowRight
                fill={index === seances.length - 1 ? '#CCCCCC' : 'black'}
                width={10}
                height={10}
              />
            </TouchableOpacity>
          </Shadow>
        </View>
        {Object.keys(day_parts).map(part => {
          if (day_parts[part].length) {
            return (
              <View style={{marginTop: verticalScale(10)}}>
                <Text
                  style={{
                    fontFamily: 'Inter-Regular',
                    fontSize: moderateScale(14),
                    color: '#B0B0B0',
                  }}>
                  {part}
                </Text>
                {GetBlocks(day_parts[part], 3).map((block, index) => (
                  <View
                    key={index}
                    style={{flexDirection: 'row', marginTop: 5}}>
                    {block.map((el, i) => (
                      <TouchableOpacity
                        key={el}
                        style={{
                          borderColor: '#EBEBEB',
                          borderWidth: 1,
                          width: '30%',
                          marginLeft: i !== 0 ? '3%' : null,
                          borderRadius: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 5,
                        }}
                        onPress={() => {
                          to
                            ? dispatch(
                                setNewDateEntry({
                                  date: selected_date,
                                  time: el,
                                }),
                              )
                            : dispatch(setDateAndTime(selected_date, el));
                          navigation.navigate(to ?? 'Entry');
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: moderateScale(15),
                            fontFamily: 'Inter-Medium',
                          }}>
                          {el}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            );
          } else return null;
        })}
      </View>
    </ScrollView>
  );
};
