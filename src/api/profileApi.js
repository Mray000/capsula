import {instance} from './instance';
import {COMPANY_ID, COMPANY_TOKEN} from '../constants';

export const profileAPI = {
  getProfile(id) {
    return instance.get(`client/${COMPANY_ID}/${id}`);
  },
  editProfile(id, data) {
    return instance.put(`client/${COMPANY_ID}/${id}`, data);
  },
  getLoyalityCards(user_id) {
    return instance.get(`loyalty/client_cards/${user_id}`);
  },
  getAllEntries(token) {
    return instance.get(`user/records`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${COMPANY_TOKEN},  User ${token}`,
      },
    });
  },
  removeEntry(token, entryId) {
    return instance.delete(`user/records/${entryId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${COMPANY_TOKEN},  User ${token}`,
      },
    });
  },
  editEntry(company_id, data) {
    return instance.put(`record/${company_id}/${data.id}`, data);
  },
};
