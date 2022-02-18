import React, {useState} from 'react';
import {Service} from './Service';
import ArrowUp from 'assets/arrow_up.svg';
import ArrowDown from 'assets/arrow_down.svg';
import {dimisions} from 'utils/demisions';
import {Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale} from 'utils/Normalize';
import {useSelector} from 'react-redux';

export const Category = ({
  title,
  staffs,
  addServiceToListHandler,
  addServiceHandler,
}) => {
  const [is_open, SetIsOpen] = useState(false);
  const {services} = useSelector(state => state.entry);

  return (
    <View style={{backgroundColor: 'transparent'}}>
      <TouchableOpacity
        style={{
          height: dimisions.height / 12,
          marginTop: 10,
          width: '100%',
          backgroundColor: is_open ? '#EFEFEF' : 'white',
          borderWidth: 1,
          borderColor: is_open ? '#EFEFEF' : '#E8E8E8',
          borderRadius: 10,
          flexDirection: 'row',
          paddingHorizontal: scale(15),
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onPress={() => SetIsOpen(!is_open)}>
        <Text
          style={{
            color: is_open ? 'black' : 'black',
            fontFamily: 'Inter-Medium',
            width: '80%',
            fontSize: moderateScale(15),
          }}>
          {title}
        </Text>

        {is_open ? (
          <ArrowUp width={13} height={13} fill={'#A7A7A7'} />
        ) : (
          <ArrowDown width={13} height={13} fill={'black'} />
        )}
      </TouchableOpacity>

      {is_open ? (
        <View style={{marginTop: 5}}>
          {staffs.map(item => (
            <Service
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
              comment={item.comment}
              price_min={item.price_min}
              price_max={item.price_max}
              is_active={services.find(el => el.id === item.id)}
              addServiceHandler={addServiceHandler}
              addServiceToListHandler={addServiceToListHandler}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
};
