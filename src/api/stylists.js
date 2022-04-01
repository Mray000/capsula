import {instance} from './instance';

export const stylistsAPI = {
  getStylists(company, service_ids, datetime) {
    const getRequstStringString = () => {
      let start = `book_staff/${company.id}?`;
      if (service_ids?.length) {
        start += `service_ids=${service_ids.join(',')}`;
        if (datetime?.date) start += `&datetime=${datetime.date}T${datetime.time}`;
      } else if (datetime?.date)
        start += `datetime=${datetime.date}T${datetime.time}`;
      return start;
    };
    return instance.get(getRequstStringString()).then(data =>
      data.data
        .filter(el => el.bookable)
        .map(i => ({
          ...i,
          company,
        })),
    );
  },
  getStylistData(company_id, stylist_id, service_ids) {
    return instance.get(
      `book_staff_seances/${company_id}/${stylist_id}${
        service_ids?.length ? `?service_ids=${service_ids.join(',')}` : ''
      },
      )}`,
    );
  },
  getStylistBookableSeancesDates(company_id, stylist_id, service_ids) {
    const getRequstStringString = () => {
      let start = `book_dates/${company_id}?`;
      if (service_ids?.length) {
        start += `service_ids=${service_ids.join(',')}`;
        if (stylist_id) start += `&staff_id=${stylist_id}`;
      } else if (stylist_id) start += `staff_id=${stylist_id}`;
      return start;
    };
    return instance.get(getRequstStringString()).then(data => {
      return data.data.booking_dates;
    });
  },
  getStylistBookableSeancesTimes(company_id, stylist_id, service_ids, date) {
    return instance
      .get(
        `book_times/${company_id}/${stylist_id || 0}/${date}?${
          service_ids.length ? `service_ids=${service_ids.join(',')}` : ``
        }`,
      )
      .then(data => data.data.map(el => el.time));
  },
  getComments(company_id, stylist_id) {
    return instance.get(`comments/${company_id}/?staff_id=${stylist_id}&count=2000`);
  },
};
