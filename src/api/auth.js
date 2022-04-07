import {COMPANY_ID, COMPANY_TOKEN, GROUP_ID, USER_TOKEN} from '../constants';
import axios from 'axios';

export const authAPI = {
  getCode(phone) {
    return axios.post(
      `https://api.yclients.com/api/v1/book_code/${COMPANY_ID}`,
      {phone},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${COMPANY_TOKEN}`,
        },
      },
    );
  },
  login(phone, code) {
    return axios.post(
      `https://api.yclients.com/api/v1/user/auth`,
      {phone, code},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${COMPANY_TOKEN}`,
        },
      },
    );
  },
  findUserByPhone(phone) {
    return axios.get(
        `https://api.yclients.com/api/v1/group/${GROUP_ID}/clients/?phone=${phone}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${COMPANY_TOKEN}, User ${USER_TOKEN}`,
          },
        },
    );
  },
};
