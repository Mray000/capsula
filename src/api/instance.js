import axios from 'axios';
import {COMPANY_TOKEN} from "../constants";



export const instance = axios.create({
  baseURL: 'https://api.yclients.com/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${COMPANY_TOKEN},  User ${"2804f52ec42edcdbe0e80b827f018fd8"}`,
  },
});
