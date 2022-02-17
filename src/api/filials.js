import {instance} from './instance';
import {GROUP_ID} from '../constants';

export const filialsAPI = {
  getFilials() {
    return instance.get(`companies?group_id=${GROUP_ID}&city_id=1`);
  },
  getFirstBookableDate(company_id, index = 0) {
    return instance
      .get(`book_dates/${company_id}`)
      .then(data => data.data?.booking_dates[index]);
  },
  getFirstBookableDateTime(company_id, date) {
    return instance
      .get(`book_times/${company_id}/0/${date}`)
      .then(async data => {
        if (data.data[0]?.datetime) return data.data[0].datetime;
        else
          return await filialsAPI.getFirstBookableDateTime(
            company_id,
            await filialsAPI.getFirstBookableDate(company_id, 1),
          );
      });
  },
  getFreeStylistsLength (company_id, datetime) {
    return instance
      .get(`book_staff/${company_id}?datetime=${datetime}`.replace('+', '%2B'))
      .then(data => data?.data.filter(el => el.bookable).length);
  },
};
