import {StyleSheet, Text, View} from "react-native";
import NoEntiesIcon from "assets/noEntriese.svg";
import {Button} from "utils/Button";
import {dimisions} from "utils/demisions";
import React from "react";
import {moderateScale, verticalScale} from "utils/Normalize";

export const EmptyScreen = () => {
  return (
    <View style={styles.emptyProfileScreenContainer}>
      <View style={styles.emptyProfileScreen}>
        <NoEntiesIcon style={styles.emptyScreenIcon} />
        <Text style={styles.emptyText}>Вы еще не были у нас :(</Text>
        <Button height={dimisions.height / 12} text="Создать запись" />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  emptyProfileScreenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
  },
  emptyScreenIcon: {
    marginBottom: 16,
  },
  emptyProfileScreen: {
    width: 216,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: 'black',
    fontFamily: 'Inter-SemiBold',
    fontSize: moderateScale(16),
    lineHeight: 18,
    marginBottom: 16,
  },
});
