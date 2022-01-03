import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import ArrowDown from 'assets/arrow_down.svg';
import ArrowUp from 'assets/arrow_up.svg';
import {dimisions} from 'utils/demisions';
import {moderateScale} from 'utils/Normalize';
import Checked from 'assets/checked.svg';
import {scale} from 'utils/Normalize';

export const Service = React.memo(
  ({
    id,
    image,
    title,
    comment,
    price_min,
    price_max,
    is_active,
    SetIsActive,
  }) => {
    const [textShown, setTextShown] = useState(false); //To show ur remaining Text
    const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
    const toggleNumberOfLines = () => {
      setTextShown(!textShown);
    };
    console.log('render');
    // console.log(is_active, id);

    const onTextLayout = useCallback(e => {
      setLengthMore(e.nativeEvent.lines.length > 2); //to check the text is more than 4 lines or not
    }, []);
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

          elevation: 30,
          marginTop: 10,
        }}>
        <TouchableOpacity
          onPress={() => SetIsActive({id, title, price: price_min})}
          style={{
            width: '100%',
            borderRadius: 20,
            overflow: 'hidden',
          }}>
          <View style={{borderRadius: 10}}>
            {image ? (
              <Image
                style={{
                  width: dimisions.width - 20,
                  height: (dimisions.width - 20) * (7.5 / 18),
                }}
                source={{uri: image}}
              />
            ) : null}

            <View
              style={{
                backgroundColor: 'white',
                padding: 10,
                width: '100%',
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <View
                  style={{
                    backgroundColor: is_active ? 'black' : 'white',
                    width: scale(20),
                    height: scale(20),
                    borderColor: is_active ? 'black' : '#CCCCCC',
                    borderWidth: 1,
                    borderRadius: 100,
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {is_active ? <Checked /> : null}
                </View>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: moderateScale(13),
                    color: 'black',
                    fontFamily: 'Inter-Regular',
                    marginTop: 3,
                  }}>
                  {title}
                </Text>
              </View>
              {comment ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    onTextLayout={onTextLayout}
                    numberOfLines={textShown ? null : 2}
                    style={{
                      marginTop: 3,
                      fontSize: moderateScale(13),
                      color: '#999999',
                      fontFamily: 'Inter-Regular',
                      width: '90%',
                    }}>
                    {comment}
                  </Text>
                  {lengthMore ? (
                    <TouchableOpacity
                      onPress={toggleNumberOfLines}
                      style={{
                        width: '10%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {textShown ? (
                        <ArrowUp fill="#CCCCCC" width={13} height={13} />
                      ) : (
                        <ArrowDown fill="#CCCCCC" width={13} height={13} />
                      )}
                    </TouchableOpacity>
                  ) : null}
                </View>
              ) : null}

              <Text
                style={{
                  fontSize: moderateScale(14),
                  color: 'black',
                  fontWeight: '600',
                  marginTop: 3,
                }}>
                {price_max === price_min
                  ? `${price_min} ₽`
                  : `${price_min}-${price_max} ₽`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  },
);
