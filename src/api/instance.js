import axios from 'axios';
import {COMPANY_TOKEN, USER_TOKEN} from "../constants";



export const instance = axios.create({
  baseURL: 'https://api.yclients.com/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${COMPANY_TOKEN},  User ${USER_TOKEN}`,
  },
});
