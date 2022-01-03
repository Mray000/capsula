import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import location from 'assets/location.png';
import selected_location from 'assets/selected_location.png';
// import {dimisions} from 'utils/demisions';
import {verticalScale} from 'utils/Normalize';
import Loop from 'assets/loop.svg';
import {dimisions} from 'utils/demisions';
export const FilialsMap = ({filials, selected_filial, ShowFilialData}) => {
  const [search, SetSearch] = useState('');
  const [region, SetRegion] = useState({
    latitude: 59.9342802,
    longitude: 30.3350986,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  useEffect(() => {
    if (search) {
      let filial = filials.find(el => el.address.includes(search));
      if (filial) {
        SetRegion({
          latitude: filial.coordinate_lat,
          longitude: filial.coordinate_lon,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
        ShowFilialData(filial);
      }
    }
  }, [search]);
  return (
    <View style={{height: dimisions.height - verticalScale(85)}}>
      <MapView
        region={region}
        style={{
          width: '100%',
          height: '100%',
        }}>
        {filials.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.coordinate_lat,
              longitude: marker.coordinate_lon,
            }}
            onPress={() => {
              SetRegion({
                latitude: marker.coordinate_lat,
                longitude: marker.coordinate_lon,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              });
              ShowFilialData(marker);
            }}>
            <Image
              source={selected_filial == marker ? selected_location : location}
              style={{height: 45, width: 45}}
            />
          </Marker>
        ))}
      </MapView>
      <View style={{position: 'absolute', top: 10, paddingHorizontal: 10}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            width: '100%',
            alignSelf: 'center',
            height: verticalScale(40),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
          }}>
          <View
            style={{
              width: '10%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Loop fill="#B3B3B3" />
          </View>
          <TextInput
            selectionColor={'black'}
            onChangeText={SetSearch}
            style={{
              width: '90%',
              padding: 0,
              color: 'black',
            }}
            placeholder="Поиск филиала"
            placeholderTextColor={'#B3B3B3'}
          />
        </View>
      </View>
    </View>
  );
};
