import React, {Component, createRef} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Platform,
  UIManager,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {dimisions} from './demisions';
import {moderateScale, scale} from './Normalize';

export default class SalesSwipper extends Component {
  slider = createRef();

  static defaultProps = {
    data: [],
    imageKey: 'image',
    local: false,
    width: Math.round(dimisions.width),
    separatorWidth: 0,
    loop: true,
    indicator: true,
    indicatorStyle: {},
    indicatorContainerStyle: {},
    indicatorActiveColor: '#3498db',
    indicatorInActiveColor: '#bdc3c7',
    indicatorActiveWidth: 6,
    animation: true,
    autoscroll: false,
    onPress: i => console.log(i),
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      data: this.props.data,
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    if (this.props.autoscroll) {
      this.startAutoPlay();
    }
  }

  componentWillUnmount() {
    if (this.props.autoscroll) {
      this.stopAutoPlay();
    }
  }

  render() {
    const itemWidth = Dimensions.get('window').width * 0.94;
    const separatorWidth = 0;
    const totalItemWidth = itemWidth + separatorWidth;

    return (
      <View
        style={{
          height: itemWidth * (6.5 / 10.5),
          marginTop: 10,
          // justifyContent: 'center',
          // marginLeft: -10,
        }}>
        <Shadow
          startColor="#00000012"
          finalColor="#00000001"
          offset={[0, 0]}
          distance={20}
          containerViewStyle={{
            width: '100%',
            height: '90%',
          }}
          viewStyle={{
            width: '100%',
            height: '100%',
          }}>
          <FlatList
            ref={this.slider}
            horizontal
            pagingEnabled={true}
            snapToInterval={itemWidth}
            contentContainerStyle={{height: '100%'}}
            decelerationRate="fast"
            bounces={false}
            data={this.state.data}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <ChildItem
                item={item}
                width={itemWidth}
                imageKey={this.props.imageKey}
                onPress={this.props.onPress}
                index={index}
                active={index === this.state.index}
                local={this.props.local}
              />
            )}
            keyExtractor={(item, index) => item.toString() + index}
            onViewableItemsChanged={this.onViewableItemsChanged}
            viewabilityConfig={this.viewabilityConfig}
            getItemLayout={(data, index) => ({
              length: itemWidth,
              offset: itemWidth * index,
              index,
            })}
            windowSize={1}
            initialNumToRender={this.state.data.length}
            maxToRenderPerBatch={3}
            removeClippedSubviews={true}
          />
        </Shadow>
        <Indicator
          itemCount={this.props.data.length}
          currentIndex={this.state.index}
        />
      </View>
    );
  }

  onViewableItemsChanged = ({viewableItems, changed}) => {
    if (viewableItems.length > 1) {
      let currentIndex =
        viewableItems.length == 2 &&
        !(viewableItems[1].index == this.state.data.length - 1)
          ? viewableItems[0].index
          : viewableItems[1].index;
      this.setState({index: currentIndex});

      if (this.props.currentIndexCallback) {
        this.props.currentIndexCallback(currentIndex);
      }
    }
  };

  viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 0,
  };

  changeSliderListIndex = () => {
    this.setState({index: this.state.index + 1});
    this.slider.current.scrollToIndex({
      index: this.state.index,
      animated: false,
    });
  };

  startAutoPlay = () => {
    this.sliderTimer = setInterval(
      this.changeSliderListIndex,
      this.props.timer,
    );
  };

  stopAutoPlay = () => {
    if (this.sliderTimer) {
      clearInterval(this.sliderTimer);
      this.sliderTimer = null;
    }
  };
}

const ChildItem = ({item, onPress, index, width}) => {
  return (
    <TouchableOpacity
      style={{
        // height: '100%',
        justifyContent: 'center',
        // marginBottom: -20,
        backgroundColor: '#00000000',
        // backgroundColor: index == 0 ? 'red' : 'green',
        width: width,
        marginLeft: index == 0 ? (width / 0.94) * 0.03 : 0,
        alignItems: 'center',
      }}
      onPress={() => onPress(index)}>
      <View
        style={{
          width: '97%',
          borderRadius: 10,
          overflow: 'hidden',
          height: '100%',
          // backgroundColor: 'pink',
        }}>
        <Image
          style={{
            height: '70%',
            width: '100%',
          }}
          source={{uri: item.image}}
        />
        <View style={{height: '30%', backgroundColor: 'white', padding: 10}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: moderateScale(13),
              color: 'black',
              fontFamily: 'Inter-Regular',
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: moderateScale(14),
              color: 'black',
              fontWeight: '600',
            }}>
            {item.max_price === item.min_price
              ? `${item.min_price} ₽`
              : `${item.min_price}-${item.max_price} ₽`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Indicator = ({itemCount, currentIndex}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: '10%',
      }}>
      {renderIndicator(itemCount, currentIndex)}
    </View>
  );
};

const renderIndicator = (count, currentIndex) => {
  let indicators = [];
  for (let i = 0; i < count; i++) {
    indicators.push(
      <View
        key={i}
        style={[
          styles.indicator,
          i === currentIndex ? styles.active : styles.inactive,
        ]}
      />,
    );
  }
  return indicators;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // alignSelf: 'center',
  },
  indicator: {
    width: scale(6),
    height: scale(6),
    borderRadius: 10,
    marginRight: 5,
  },
  active: {
    backgroundColor: 'black',
  },
  inactive: {
    backgroundColor: '#E0E0E0',
  },
});
