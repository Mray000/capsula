import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'utils/Normalize';
import {observer} from 'mobx-react-lite';
import UserAvatarIcon from '../../assets/user_avatar.svg';
import {BottomNavigator} from 'utils/BottomNavigator';
import {dimisions} from 'utils/demisions';
import {Button} from "utils/Button";

export const PreLogin = observer(({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.header_text}>Мой профиль</Text>
        </View>
        <View style={styles.content}>
          <UserAvatarIcon style={styles.content_icon} />
          <Text style={styles.content_text}>
            Войдите в свой аккаунт YClients
          </Text>
          <Button onPress={() => navigation.navigate("Login")} width={216} text={"Войти"} />
        </View>
      </View>
      <BottomNavigator active="profile" navigation={navigation} />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal:
      dimisions.width * 0.03 +
      (dimisions.width * 0.94 - dimisions.width * 0.94 * 0.97) / 2,
  },
  header: {
    marginTop: 32,
  },
  header_text: {
    color: 'black',
    fontFamily: 'Inter-SemiBold',
    fontSize: moderateScale(24),
    lineHeight: 29,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content_icon: {
    marginBottom: 16,
  },
  content_text: {
    textAlign: "center",
    width: 143,
    color: 'black',
    fontFamily: 'Inter-SemiBold',
    fontSize: moderateScale(16),
    lineHeight: 18,
    marginBottom: 16,
  },
});
