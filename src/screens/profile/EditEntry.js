import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Header} from 'utils/Header';
import {dimisions} from 'utils/demisions';
import {moderateScale} from 'utils/Normalize';
import {Button} from 'utils/Button';
import ArrowRight from 'assets/arrow_right.svg';
import {SuccessModal} from 'utils/SuccessModal';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {formatDateAndTimeToISO} from 'utils/dateUtils';
import {
  setEntryStatus,
  setNewDateEntry,
} from '../../redux/entryReducer';
import {Loader} from 'utils/Loader';
import {editEntryTC} from "../../redux/profileReducer";

export const EditEntry = ({navigation}) => {
  const dispatch = useDispatch();
  const {entry, filialDetails, newDateEntry, entryStatus} = useSelector(
    state => state.entry,
  );
  const [successEditEntry, setSuccessEditEntry] = useState(false);

  useEffect(() => {
    dispatch(setNewDateEntry(null));
  }, []);

  useEffect(() => {
    if (entryStatus === 'OK') {
      setSuccessEditEntry(true);
      dispatch(setEntryStatus(null));
    }
  }, [entryStatus]);

  const closeModal = () => {
    setSuccessEditEntry(false);
    dispatch(setNewDateEntry(null));
    dispatch(setEntryStatus(null));
    navigation.navigate("EntryDetails", {
      entryId: entry?.id,
      company_id: filialDetails?.id
    })
  };

  const editEntry = () => {
    if (newDateEntry) {
      dispatch(
        editEntryTC(filialDetails.id,{
          ...entry,
          datetime: formatDateAndTimeToISO(
            newDateEntry?.date,
            newDateEntry?.time,
          ),
        }),
      );
    }
  };

  if (!entry.services) return <Loader />;

  return (
    <View style={styles.container}>
      <Header onBack={navigation.goBack} title={'Перенос записи'} />
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={{
            backgroundColor: newDateEntry ? '#FCFCFC' : '#EFEFEF',
            borderWidth: newDateEntry ? 1 : 0,
            borderColor: '#E8E8E8',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 10,
            borderRadius: 15,
            paddingHorizontal: 20,
            height: dimisions.height / 12,
          }}
          onPress={() =>
            navigation.navigate('Calendar', {
              to: 'EditEntry',
              filial_id: filialDetails.id,
              stylist_id: entry.staff.id,
              service_id: entry.services[0].id,
            })
          }>
          <Text
            style={{
              color: newDateEntry ? '#B0B0B0' : 'black',
              fontFamily: 'Inter-Medium',
              fontSize: moderateScale(16),
            }}>
            {newDateEntry
              ? moment(newDateEntry?.date).format('DD MMMM') +
                ' в ' +
                newDateEntry?.time
              : 'Укажите новую дату и время'}
          </Text>
          <ArrowRight fill={newDateEntry ? '#D6D6D6' : 'black'} />
        </TouchableOpacity>
        <DisabledTextField
          value={filialDetails?.address}
          headerTitle={'филиал'}
        />
        <DisabledTextField
          value={entry.services[0].title}
          headerTitle={'услуга'}
        />
        <DisabledTextField
          value={entry.staff.name}
          headerTitle={entry.staff.specialization}
        />
      </View>
      <Button
        disabled={!newDateEntry}
        onPress={editEntry}
        text={'Перенести запись'}
      />
      <SuccessModal
        onPressClose={closeModal}
        underButtonTitle={'Ваши записи находятся в разделе «Профиль»'}
        navigation={navigation}
        open={successEditEntry}>
        <Text style={styles.success_edit_entry_text}>
          Мы перенесли вашу запись
        </Text>
        <Text style={styles.success_edit_entry_sub_text}>
          Новое время вашей записи:
        </Text>
        <Text style={styles.success_edit_entry_date}>
          {moment(newDateEntry?.date).format('DD MMMM') +
            ' в ' +
            newDateEntry?.time}
        </Text>
        <Text style={styles.success_edit_entry_date}>
          по адресу: {filialDetails?.address}
        </Text>
      </SuccessModal>
    </View>
  );
};

const DisabledTextField = ({headerTitle, value}) => {
  return (
    <View style={styles.disabled_text_field}>
      <View style={{width: '90%'}}>
        <Text style={styles.disabled_text_field_header_text}>
          {headerTitle}
        </Text>
        <Text style={styles.disabled_text_field_value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 25,
    paddingHorizontal:
      dimisions.width * 0.03 +
      (dimisions.width * 0.94 - dimisions.width * 0.94 * 0.97) / 2,
  },
  disabled_text_field: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    height: dimisions.height / 12,
  },
  disabled_text_field_header_text: {
    color: '#BFBFBF',
    fontFamily: 'Inter-Regular',
    fontSize: moderateScale(12),
  },
  disabled_text_field_value: {
    color: 'black',
    fontFamily: 'Inter-Medium',
    fontSize: moderateScale(14),
  },
  success_edit_entry_text: {
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: moderateScale(28),
    color: 'black',
    lineHeight: 34,
    marginTop: 8,
    marginBottom: 24,
  },
  success_edit_entry_sub_text: {
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: moderateScale(16),
    color: '#808080',
    lineHeight: 20,
    marginBottom: 12,
  },
  success_edit_entry_date: {
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: moderateScale(18),
    color: 'black',
    lineHeight: 18,
    marginBottom: 8,
  },
});
