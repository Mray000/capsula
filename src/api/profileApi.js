import {instance} from './instance';
import {COMPANY_TOKEN} from '../constants';

export const profileAPI = {
  getProfile(id, company_id) {
    return instance.get(`client/${company_id}/${id}`);
  },
  editProfile(id, data, company_id) {
    return instance.put(`client/${company_id}/${id}`, data);
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
