import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, verticalScale} from 'utils/Normalize';
import {observer} from 'mobx-react-lite';
import {dimisions} from 'utils/demisions';
import {BottomNavigator} from 'utils/BottomNavigator.js';
import {Linking} from 'react-native';
import vk from '../../assets/social_media/vk.svg';
import inst from '../../assets/social_media/instagram.svg';
import tiktok from '../../assets/social_media/tiktok.svg';
import fb from '../../assets/social_media/facebook.svg';
import ok from '../../assets/social_media/ok.svg';
import Phone from '../../assets/phone.svg';
import Location from '../../assets/address_location.svg';
import Time from '../../assets/time.svg';
import Dot from '../../assets/dot.svg';
import Star from '../../assets/star.svg';
import {Shadow} from 'react-native-shadow-2';
import {api} from "utils/api";
import {Loader} from "utils/Loader";

export const Info = observer(({navigation}) => {

  const [filials, SetFilials] = useState();

  useEffect(() => {
    api.getFilials().then(SetFilials);
  }, []);

  const social_media_links = [
    {
      icon: vk,
      link: 'https://vk.com/capsula_byosipov',
    },
    {
      icon: inst,
      link: 'https://instagram.com/capsula_byosipov?utm_medium=copy_link',
    },
    {
      icon: tiktok,
      link: 'https://vm.tiktok.com/ZSekDh9Uj',
    },
    {
      icon: fb,
      link: 'https://m.facebook.com/capsulabyosipov',
    },
    {
      icon: ok,
      link: 'https://ok.ru/group/68419278143547',
    },
  ];
  const addresses = filials?.map(i => i.address)

  const our_work = [
    {icon: Dot, title: 'Окрашивания'},
    {icon: Dot, title: 'Стрижки любой сложности'},
    {icon: Dot, title: 'Уникальные уходовые процедуры'},
  ];
  const cooperate_with = [
    {icon: Dot, title: 'NEVA Fashion Week'},
    {icon: Dot, title: 'Radio Record'},
    {icon: Dot, title: 'ROOF FEST'},
    {icon: Dot, title: 'И другими мероприятиями северной столицы.'},
  ];
  const champions = [
    {icon: Star, title: 'Russian Hairdressing Awards'},
    {icon: Star, title: 'Wella Trend Vision'},
    {icon: Star, title: 'American Crew ALL-STAR Challenge'},
    {icon: Star, title: 'LondaStyle MAXIMUM'},
    {icon: Star, title: 'Звезда Estel и Estel Video Awards'},
  ];
  const winners = [
    {icon: Star, title: 'NEVA FASHION AWARDS'},
    {
      icon: Star,
      title: 'TimeOut в номинации стрижки (Самая крупная премия СПБ) ',
    },
  ];
  const phone_number = '+7 812 407-35-15';
  if (!filials) return <Loader />;
  return (
    <>
      <ScrollView style={styles.main}>
        <View style={styles.container}>
          <Text style={styles.main_title}>Инфо</Text>
          <Text style={styles.sub_title}>наши контакты</Text>
          <View style={{marginBottom: 12}}>
            <Shadow viewStyle={{width: '100%'}}>
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${phone_number}`)}
                style={styles.phone_container}>
                <Phone fill={'#CCCCCC'} style={styles.phone_icon} />
                <Text style={styles.phone_title}>{phone_number}</Text>
              </TouchableOpacity>
            </Shadow>
          </View>
          <View style={{flexDirection: 'row'}}>
            {social_media_links.map(i => (
              <View style={{marginRight: 8}}>
                <Shadow key={i.link}>
                  <TouchableOpacity
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 42,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => Linking.openURL(i.link)}>
                    <i.icon fill="black" />
                  </TouchableOpacity>
                </Shadow>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.sub_title}>наши адреса</Text>
          <View style={styles.addresses}>
            {addresses.map(address => (
              <View style={styles.address}>
                <Location fill={'#CCCCCC'} width={24} height={24} />
                <Text style={styles.address_title}>{address}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.sub_title}>время работы</Text>
          <View style={styles.time_container}>
            <Time  fill={'#CCCCCC'} width={16} height={16} />
            <Text style={styles.time_title}>10:00-22:00</Text>
          </View>
          <View style={styles.last_time_container}>
            <Text style={styles.last_time_subtitle}>
              Крайняя запись на стрижку -{' '}
            </Text>
            <Text style={styles.last_time_title}>21:00</Text>
          </View>
          <View style={styles.last_time_container}>
            <Text style={styles.last_time_subtitle}>
              Крайняя запись на окрашивание -{' '}
            </Text>
            <Text style={styles.last_time_title}>18:00 - 19:00</Text>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.sub_title}>о нас</Text>
          <Text style={styles.about_title}>CAPSULA by Osipov</Text>
          <View style={styles.about_container}>
            <Text style={styles.about_text}>
              Наслаждайся своим стилем! Мы — сеть имидж-студий по созданию
              цельных образов в Санкт-Петербурге.
            </Text>
            <Text style={styles.about_text}>
              В составе сети 200+ сотрудников, включая ТОП-стилистов высокого
              класса и международных тренеров.
            </Text>
            <Text style={styles.about_text}>
              CAPSULA by Osipov — самая масштабная фабрика по созданию
              креативных образов.
            </Text>
          </View>
          <View style={styles.about_container}>
            <Text style={styles.about_subtitle}>Мы делаем:</Text>
            {our_work.map(i => (
              <View style={styles.about_list}>
                <View style={{alignItems: 'center'}}>
                  <i.icon width={7} height={7} fill="black" />
                </View>
                <Text style={styles.about_list_title}>{i.title}</Text>
              </View>
            ))}
          </View>
          <View style={styles.about_container}>
            <Text style={styles.about_text}>
              CAPSULA by Osipov гарантирует качество и профессионализм. Мы
              работаем с клиентом любого пола и возраста.
            </Text>
          </View>
          <View style={styles.about_container}>
            <Text style={styles.about_subtitle}>
              Наши стилисты — международные чемпионы популярных конкурсов:
            </Text>
            {champions.map(i => (
              <View style={styles.about_list}>
                <i.icon width={18} height={18} fill="black" />
                <Text style={styles.about_list_title}>{i.title}</Text>
              </View>
            ))}
          </View>
          <View style={styles.about_container}>
            <Text style={styles.about_subtitle}>
              Чемпионы Книги рекордов России и Рекорда Гиннесса по окрашиваниям
            </Text>
          </View>
          <View style={styles.about_container}>
            <Text style={styles.about_subtitle}>Победители:</Text>
            {winners.map(i => (
              <View style={styles.about_list}>
                <i.icon width={18} height={18} fill="black" />
                <Text style={styles.about_list_title}>{i.title}</Text>
              </View>
            ))}
          </View>
          <View style={styles.about_container}>
            <Text style={styles.about_subtitle}>Мы сотрудничаем с:</Text>
            {cooperate_with.map(i => (
              <View style={styles.about_list}>
                <i.icon width={7} height={7} fill="black" />
                <Text style={styles.about_list_title}>{i.title}</Text>
              </View>
            ))}
          </View>
          <View style={styles.about_container}>
            <Text style={styles.about_subtitle}>
              CAPSULA by Osipov — это новая сущность, которая родилась из
              узнаваемого бренда.
            </Text>
          </View>
        </View>
      </ScrollView>
      <BottomNavigator active="info" navigation={navigation} />
    </>
  );
});

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FCFCFC',
    marginBottom: verticalScale(60),
  },
  main_title: {
    color: 'black',
    fontSize: moderateScale(19),
    fontFamily: 'Inter-SemiBold',
    marginTop: 20,
    marginBottom: 15,
  },
  sub_title: {
    fontFamily: 'Inter-Regular',
    color: '#B0B0B0',
    fontSize: moderateScale(14),
    marginBottom: 8,
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal:
      dimisions.width * 0.03 +
      (dimisions.width * 0.94 - dimisions.width * 0.94 * 0.97) / 2,
  },
  phone_container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    borderRadius: 15,
  },
  phone_icon: {
    marginRight: 31,
    fill: '#B0B0B0',
  },
  phone_title: {
    color: 'black',
    fontSize: moderateScale(19),
    fontFamily: 'Inter-SemiBold',
    textDecorationLine: 'underline',
    lineHeight: 29,
  },

  addresses: {},
  address: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  address_title: {
    marginLeft: 7,
    color: '#333333',
    fontSize: moderateScale(16),
    fontFamily: 'Inter-Regular',
  },
  time_container: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 15,
    marginBottom: 8,
  },
  time_title: {
    color: 'black',
    fontSize: moderateScale(18),
    fontFamily: 'Inter-SemiBold',
    marginLeft: 12,
  },
  last_time_container: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  last_time_title: {
    color: 'black',
    fontSize: moderateScale(14),
    fontFamily: 'Inter-SemiBold',
  },
  last_time_subtitle: {
    color: '#808080',
    fontSize: moderateScale(14),
    fontFamily: 'Inter-Regular',
  },
  about_container: {
    marginBottom: 20,
  },
  about_title: {
    color: 'black',
    fontSize: moderateScale(19),
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  about_subtitle: {
    color: 'black',
    fontSize: moderateScale(18),
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  about_text: {
    color: '#808080',
    fontSize: moderateScale(16),
    fontFamily: 'Inter-Regular',
    lineHeight: 26,
    marginBottom: 8,
  },
  about_list: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  about_list_title: {
    color: '#808080',
    fontSize: moderateScale(16),
    fontFamily: 'Inter-Regular',
    textAlignVertical: 'center',
    marginLeft: 7,
  },
});
