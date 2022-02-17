import React, {Component} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Animated,
  StyleSheet,
  PanResponder,
} from 'react-native';
import {verticalScale} from './Normalize';

class BottomSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      pan: new Animated.ValueXY(),
    };

    this.createPanResponder(props);
  }

  setModalVisible(visible) {
    const {closeFunction, height} = this.props;
    const {animatedHeight, pan} = this.state;
    if (visible) {
      this.setState({modalVisible: visible});
      Animated.timing(animatedHeight, {
        toValue: height,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        pan.setValue({x: 0, y: 0});
        this.setState({
          modalVisible: visible,
          animatedHeight: new Animated.Value(0),
        });
        if (typeof closeFunction === 'function') closeFunction();
      });
    }
  }

  createPanResponder(props) {
    const {height} = props;
    const {pan} = this.state;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          Animated.event([null, {dy: pan.y}], {
            useNativeDriver: false,
          })(e, gestureState);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        const gestureLimitArea = height / 3;
        const gestureDistance = gestureState.dy;
        if (gestureDistance > gestureLimitArea) {
          this.setModalVisible(false);
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();
        }
      },
    });
  }

  show() {
    this.setModalVisible(true);
  }

  close() {
    this.setModalVisible(false);
  }

  render() {
    const {
      children,
      hasDraggableIcon,
      dragIconColor,
      dragIconStyle,
      draggable = true,
      radius,
    } = this.props;
    const {animatedHeight, pan, modalVisible} = this.state;
    const panStyle = {
      //   position: 'absolute',
      transform: pan.getTranslateTransform(),
    };

    return (
      <Animated.View
        {...(draggable && this.panResponder.panHandlers)}
        style={[
          panStyle,
          styles.container,
          {
            height: animatedHeight,
            borderTopRightRadius: radius || 10,
            borderTopLeftRadius: radius || 10,
          },
        ]}>
        {hasDraggableIcon && (
          <View style={styles.draggableContainer}>
            <View
              style={[
                styles.draggableIcon,
                dragIconStyle,
                {
                  backgroundColor: dragIconColor || '#A3A3A3',
                },
              ]}
            />
          </View>
        )}
        {children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    bottom: -1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  draggableContainer: {
    width: '100%',
    alignItems: 'center',
  },
  draggableIcon: {
    width: 40,
    height: 6,
    borderRadius: 3,
    margin: 10,
    marginBottom: 0,
  },
});

export default BottomSheet;
