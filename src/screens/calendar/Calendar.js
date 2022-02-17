import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {BottomNavigator} from 'utils/BottomNavigator';
import {Header} from 'utils/Header';
import {Loader} from 'utils/Loader';
import {verticalScale} from 'utils/Normalize';
import {DatePicker} from './DatePicker';
import {TimePicker} from './TimePicker';
import {useDispatch, useSelector} from 'react-redux';
import {getStylistBookableSeancesTC} from "../../redux/stylistReducer";

export const Calendar = ({navigation, route}) => {

  const dispatch = useDispatch()

  const {filial_id, stylist_id, service_id, to} = route.params
  const [selected_date, SetSelectedDate] = useState(null);

  const {filial, services, stylist} = useSelector(
    state => state.entry,
  );
  const seances = useSelector(
    state => state.stylists.seances,
  );
  console.log(filial?.id)
  useEffect(() => {
    dispatch(getStylistBookableSeancesTC(
      filial_id ?? filial.id,
      stylist_id ?? stylist?.id,
      service_id ?? services.map(el => el.id),
    ))
  }, []);


  if (!seances.length) return <Loader />;
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
            to={to}
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
