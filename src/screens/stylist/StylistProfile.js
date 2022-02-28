import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from 'utils/Header';
import {moderateScale, scale, verticalScale} from 'utils/Normalize';
import Star from 'assets/star.svg';
import moment from 'moment';
import 'moment/locale/ru';
import {dimisions} from 'utils/demisions';
import {BottomNavigator} from 'utils/BottomNavigator';
import RenderHtml from 'react-native-render-html';
import {useDispatch, useSelector} from 'react-redux';
import {getCommentsTC} from '../../redux/stylistReducer';
import {Loader} from 'utils/Loader';

moment.locale('ru');

export const StylistProfile = ({route, navigation}) => {
  const dispatch = useDispatch();
  const comments = useSelector(state => state?.stylists.comments);

  const [is_comments_active, SetIsCommentsActive] = useState(true);
  const {id, avatar_big, specialization, name, rating, company, information} =
    route.params.stylist;
  useEffect(() => {
    if (company && company?.id && id) {
      dispatch(getCommentsTC(company.id, id));
    }
  }, [company?.id, id]);

  if (!comments.length) return <Loader />;
  return (
    <>
      <View
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal:
            dimisions.width * 0.03 +
            (dimisions.width * 0.94 - dimisions.width * 0.94 * 0.97) / 2,
        }}>
        <Header
          title={'Сотрудник'}
          navigation={navigation}
          onBack={() => navigation.goBack()}
        />
        <View
          stickyHeaderIndices={[1]}
          style={{marginBottom: verticalScale(60)}}>
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
              height: verticalScale(35),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#EFEFEF',
              borderRadius: 10,
              padding: 5,
            }}>
            <View
              style={{
                backgroundColor: '#EFEFEF',
                width: '100%',
                flexDirection: 'row',
                borderRadius: 10,
                height: '100%',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => SetIsCommentsActive(true)}
                style={{
                  width: '50%',
                  backgroundColor: is_comments_active ? 'white' : '#EFEFEF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  height: '100%',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: is_comments_active ? 'black' : '#8F8F8F',
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
                  justifyContent: 'center',
                  borderRadius: 10,
                  height: '100%',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: !is_comments_active ? 'black' : '#8F8F8F',
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
              <FlatList
                style={{backgroundColor: '#FCFCFC', marginBottom: verticalScale(455 )}}
                data={comments}
                renderItem={({item}) => <Comment comment={item} key={item.id} />}
              />
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
        </View>
      </View>
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
