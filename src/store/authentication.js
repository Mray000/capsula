import AsyncStorage from '@react-native-async-storage/async-storage';
import {makeAutoObservable} from 'mobx';
import {api} from 'utils/api';

class Authentication {
  token = '';
  phone = '';
  is_login = false;
  constructor() {
    makeAutoObservable(this);
  }
  setToken(token) {
    this.token = token;
  }

  setPhone(phone) {
    this.phone = phone;
  }

  setIsLogin(is_login) {
    this.is_login = is_login;
  }

  login = async (phone, code) => {
    let {errors, user_token} = await api.login(phone, Number(code));
    if (errors) return errors.message;
    else {
      this.setToken(user_token);
      this.setPhone(phone);
      this.setIsLogin(true);
      AsyncStorage.setItem('token', user_token);
      AsyncStorage.setItem('phone', phone);
    }
  };
  logout = async () => {
    this.setToken('');
    this.setPhone('');
    this.setIsLogin(false);

    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('phone');
  };
}

export const authentication = new Authentication();
