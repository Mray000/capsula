import {instance} from './instance';
import {COMPANY_ID, COMPANY_TOKEN} from '../constants';

export const entryAPI = {
  checkEntryParams(company_id, data) {
    return instance.post(`book_check/${company_id}`, data);
  },
  createEntry(company_id, data, token) {
    return instance.post(`book_record/${company_id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${COMPANY_TOKEN}, User ${token}` :`Bearer ${COMPANY_TOKEN}`,
      },
    });
  },
  getEntry(company_id, entryId) {
    return instance.get(`record/${company_id}/${entryId}`);
  },

  getFilialInfo(filial_id) {
    return instance.get(`company/${filial_id}`);
  },
  getSales(company_id) {
    return instance.get(`services/${company_id}`).then(data => data.data );
  },
  getSalesById(id) {
    return instance.get(`services/${COMPANY_ID}/${id}`);
  },
  getServicesCategorys(company_id, stylist_id, datetime, services) {
    const getRequstStringString = () => {
      let start = `book_services/${company_id}?`;
      if (stylist_id) {
        start += `staff_id=${stylist_id}&`;
      }
      if (datetime?.date) {
        start += `datetime=${datetime.date}T${datetime.time}&`;
      }
      if (services.length)
        start += `service_ids=${services.map(el => el?.id)}`;
      return start;
    };
    return instance.get(getRequstStringString());
  },
};
