import React, {useState, useEffect, useMemo} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {api} from 'utils/api';
import {Header} from 'utils/Header';
import {moderateScale, scale, verticalScale} from 'utils/Normalize';
import Star from 'assets/star.svg';
import moment from 'moment';
import 'moment/locale/ru';
import {dimisions} from 'utils/demisions';
import {Loader} from 'utils/Loader';
import {BottomNavigator} from 'utils/BottomNavigator';
import RenderHtml from 'react-native-render-html';
moment.locale('ru');
export const StylistProfile = ({route, navigation}) => {
  const [comments, SetComments] = useState(null);
  const [is_comments_active, SetIsCommentsActive] = useState(true);
  let {id, avatar_big, specialization, name, rating, company, information} =
    route.params.stylist;
  useEffect(() => {
    api.getComments(company.id, id).then(SetComments);
  }, []);
  if (!comments) return <Loader />;
  return (
    <>
      <ScrollView style={{marginBottom: verticalScale(60)}}>
        <View>
          <Header
            title={'Сотрудник'}
            navigation={navigation}
            onBack={() => navigation.goBack()}
          />
          <View style={{alignItems: 'center', paddingHorizontal: 20}}>
            <Image
              source={{uri: avatar_big}}
              style={{width: scale(80), height: scale(80), borderRadius: 100}}
            />
            <Text
              style={{
                fontSize: moderateScale(16),
                fontFamily: 'Inter-Medium',
                color: 'black',
                marginTop: 3,
              }}>
              {name}
            </Text>
            <Text
              style={{
                fontSize: moderateScale(14),
                fontFamily: 'Inter-Regular',
                color: '#B0B0B0',
                textAlign: 'center',
                width: '80%',
              }}>
              {specialization}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: moderateScale(16),
                  fontFamily: 'Inter-SemiBold',
                  color: 'black',
                  marginRight: 5,
                }}>
                {rating}
              </Text>
              <Star fill="black" />
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#EFEFEF',
              width: '90%',
              flexDirection: 'row',
              borderRadius: 15,
              alignSelf: 'center',
              padding: 5,
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => SetIsCommentsActive(true)}
              style={{
                width: '50%',
                backgroundColor: is_comments_active ? 'white' : '#EFEFEF',
                alignItems: 'center',
                borderRadius: 15,
                padding: 3,
              }}>
              <Text
                style={{
                  width: '50%',
                  textAlign: 'center',
                  color: is_comments_active ? 'black' : '#8F8F8F',
                  fontSize: moderateScale(14),
                  padding: 3,
                }}>
                Отзывы
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => SetIsCommentsActive(false)}
              style={{
                width: '50%',
                backgroundColor: !is_comments_active ? 'white' : '#EFEFEF',
                alignItems: 'center',
                borderRadius: 15,
                padding: 3,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: !is_comments_active ? 'black' : '#8F8F8F',
                  fontSize: moderateScale(14),
                  padding: 3,
                }}>
                Информация
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {is_comments_active ? (
          <View
            style={{
              marginTop: 10,
            }}>
            {comments.map(comment => (
              <Comment comment={comment} key={comment.id} />
            ))}
          </View>
        ) : (
          <View
            style={{
              marginTop: 10,
              paddingHorizontal: 20,
            }}>
            <RenderHtml
              contentWidth={dimisions.width}
              source={{html: information}}
              tagsStyles={{
                span: {color: '#7E7E7E', fontSize: moderateScale(14)},
                strong: {
                  fontFamily: 'Inter-SemiBold',
                  color: 'black',
                  fontStyle: 'normal',
                  fontSize: moderateScale(15),
                },
              }}
            />
          </View>
        )}
      </ScrollView>
      <BottomNavigator active={'stylists'} navigation={navigation} />
    </>
  );
};

const Comment = React.memo(({comment}) => {
  let {user_name, date, rating, text} = comment;
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: 'white',
        borderTopColor: '#EBEBEB',
        borderTopWidth: 1,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            color: '#B3B3B3',
            fontSize: moderateScale(13),
            fontFamily: 'Inter-Regular',
          }}>
          {user_name}
        </Text>
        <Text
          style={{
            color: '#B3B3B3',
            fontSize: moderateScale(13),
            fontFamily: 'Inter-Regular',
          }}>
          {moment(date).format('D MMM YYYY')}
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: 5}}>
        {[1, 2, 3, 4, 5].map(el => (
          <View style={{marginRight: 5}}>
            <Star fill={el <= Number(rating) ? 'black' : '#CCCCCC'} />
          </View>
        ))}
      </View>
      {text ? (
        <Text
          style={{
            color: 'black',
            fontSize: moderateScale(15),
            marginTop: 5,
            fontFamily: 'Inter-Regular',
          }}>
          {text}
        </Text>
      ) : null}
    </View>
  );
});
