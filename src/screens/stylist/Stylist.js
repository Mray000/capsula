import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Star from 'assets/star.svg';
import {moderateScale, scale, verticalScale} from 'utils/Normalize';
import {Shadow} from 'react-native-shadow-2';
import {GetBlocks} from 'utils/GetBlocks';
import {useDispatch, useSelector} from 'react-redux';
import {formatDate} from 'utils/dateUtils';
import {setDateAndTime, setFilial, setStylist} from '../../redux/entryReducer';
import {stylistsAPI} from '../../api/stylists';

export const Stylist = ({stylist, navigation, is_global}) => {
  const dispatch = useDispatch();

  const {services, date_and_time} = useSelector(state => state.entry);

  let {
    id,
    avatar,
    specialization,
    name,
    rating,
    comments_count,
    date,
    times,
    company,
  } = stylist;
  const [is_load, SetIsLoad] = useState(true);
  useEffect(() => {
    if(is_load)
      stylistsAPI
        .getStylistData(
          stylist?.company?.id,
          id,
          services.map(el => el.id),
        )
        .then(data => {
          stylist.date = data.data.seance_date;
          stylist.times = data.data.seances;
          SetIsLoad(false);
        });
  }, [is_load]);

  return (
    <View
      style={{
        shadowColor: '#C6C6C6',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        paddingHorizontal: 10,

        elevation: 10,
        marginBottom: verticalScale(10),
        borderRadius: 20,
      }}>
      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 20,
          overflow: 'hidden',
        }}>
        <TouchableOpacity
          onPress={() => {
            if (is_global) {
              dispatch(setFilial(company));
            }
            dispatch(setStylist(stylist));
            navigation.navigate('Entry');
          }}
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              width: '70%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{width: '20%'}}
              onPress={() => navigation.navigate('StylistProfile', {stylist})}>
              <Image
                source={{uri: avatar}}
                style={{width: '90%', aspectRatio: 1, borderRadius: 100}}
              />
            </TouchableOpacity>
            <View style={{width: '78%'}}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: moderateScale(12),
                  color: '#B3B3B3',
                  width: '100%',
                }}>
                {specialization}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: moderateScale(13),
                  color: 'black',
                }}>
                {name}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '30%',
              alignItems: 'flex-end',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-SemiBold',
                  marginRight: 3,
                  color: 'black',
                  fontSize: moderateScale(14),
                }}>
                {rating}
              </Text>
              <Star fill="black" />
            </View>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: moderateScale(12),
                color: '#BFBFBF',
              }}>
              {comments_count} отзывов
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('StylistProfile', {stylist})}>
              <Shadow
                startColor={'#00000008'}
                finalColor={'#00000001'}
                offSet={[0, 10]}
                distance={10}>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: scale(20),
                    height: scale(20),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 17,
                  }}>
                  <Text style={{color: 'black', fontWeight: '700'}}>i</Text>
                </View>
              </Shadow>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {is_global || !date_and_time ? (
          !is_load ? (
            times?.length ? (
              <View>
                <Text
                  style={{
                    fontFamily: 'Inter-Regular',
                    fontSize: moderateScale(12),
                    color: '#BFBFBF',
                  }}>
                  доступна запись {formatDate(date)}:
                </Text>
                <View style={{marginTop: 5}}>
                  {GetBlocks(times, 5).map((block, index) => (
                    <View key={index} style={{flexDirection: 'row'}}>
                      {block.map((el, i) => (
                        <TouchableOpacity
                          key={i}
                          style={{
                            borderColor: '#EBEBEB',
                            borderWidth: 1,
                            width: '18%',
                            marginLeft: i !== 0 ? '2%' : null,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 5,
                          }}
                          onPress={() => {
                            if (is_global) {
                              dispatch(setFilial(company));
                            }
                            dispatch(setStylist(stylist));
                            dispatch(setDateAndTime(date, el.time));
                            navigation.navigate('Entry');
                          }}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: moderateScale(14),
                              fontFamily: 'Inter-Medium',
                            }}>
                            {el.time}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            ) : null
          ) : (
            <ActivityIndicator size="small" color={'black'} />
          )
        ) : null}
      </View>
    </View>
  );
};
