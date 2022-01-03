import React from 'react';
import {Alert, Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authentication} from 'store/authentication';
import moment from 'moment';
import {EMaskUnits} from 'react-native-svg';
// import {error} from '../store/error';
const URL = 'https://api.yclients.com/api/v1/';

const COMPANY_ID = 68870;
const COMPANY_TOKEN = 'te4ned5zsnhcg8xnwk25';
const GROUP_ID = 45997;

const request = {
  post: async (url, body) => {
    let data = await fetch(URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${COMPANY_TOKEN}, User ${authentication.token}`,
      },
      body: JSON.stringify(body),
    }).then(res => res.json());
    return data;
  },
  post_form_data: async (url, body) => {
    let data = await fetch(URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': ' multipart/form-data',
        Authorization: `Bearer ${COMPANY_TOKEN}, User ${authentication.token}`,
      },
      body: body,
    }).then(res => res.json());
    return data;
  },
  get: async url => {
    let data = await fetch(URL + url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${COMPANY_TOKEN}, User ${
          authentication.token || 'ecec81087e48daa654e8d1f8f8c90913'
        }`,
      },
    }).then(res => res.json());
    return data;
  },
};

export const api = {
  getCode: async phone => {
    let data = await request.post(`book_code/${COMPANY_ID}`, {phone});
    return data?.errors?.message;
  },
  login: async (phone, code) => {
    let data = await request.post('user/auth', {phone, code});
    return data;
  },

  getSales: async () => {
    let data = await request.get(`services/${COMPANY_ID}/`);
    return data.filter(el => el.category_id == 4218539);
  },

  getFilials: async () => {
    let filials = await request.get(`companies?group_id=${GROUP_ID}&city_id=1`);

    let filials_data = await Promise.all(
      filials.map(async filial => {
        let date = await api.getFirstBookableDate(filial.id);
        let datetime = await api.getFirstBookableDateTime(filial.id, date);
        let stylists_length = await api.getFreeStylistsLength(
          filial.id,
          datetime,
        );
        return {datetime, stylists_length};
      }),
    );
    filials.forEach((filial, i) => {
      filial.datetime = filials_data[i].datetime;
      filial.stylists_length = filials_data[i].stylists_length;
    });

    return filials;
  },
  getFirstBookableDate: async (company_id, index = 0) => {
    let date = await request
      .get(`book_dates/${company_id}`)
      .then(data => data.booking_dates[index]);
    return date;
  },
  getFirstBookableDateTime: async (company_id, date) => {
    let time = await request
      .get(`book_times/${company_id}/0/${date}`)
      // .then(data => data[0].datetime);
      .then(async data => {
        if (data[0]?.datetime) return data[0].datetime;
        else
          return await api.getFirstBookableDateTime(
            company_id,
            await api.getFirstBookableDate(company_id, 1),
          );
      });
    return time;
  },

  getFreeStylistsLength: async (company_id, datetime) => {
    let stylists_length = await request
      .get(`book_staff/${company_id}?datetime=${datetime}`.replace('+', '%2B'))
      .then(data => data.filter(el => el.bookable).length);
    return stylists_length;
  },

  getServicesCategorys: async (company_id, stylist_id, datetime) => {
    const getRequstStringString = () => {
      let start = `book_services/${company_id}?`;
      if (stylist_id) {
        start += `staff_id=${stylist_id}`;
        if (datetime) start += `&datetime=${datetime.date}T${datetime.time}`;
      } else if (datetime)
        start += `datetime=${datetime.date}T${datetime.time}`;
      return start;
    };

    let categorys_and_staffs = await request.get(getRequstStringString());
    let categorys = categorys_and_staffs.category;
    categorys.map(category => {
      category.staffs = categorys_and_staffs.services.filter(
        staff => staff.category_id == category.id && staff.active,
      );
      return category;
    });
    return categorys;
  },

  getStylists: async (company, service_ids, datetime) => {
    const getRequstStringString = () => {
      let start = `book_staff/${company.id}?`;
      if (service_ids?.length) {
        start += `service_ids=${service_ids.join(',')}`;
        if (datetime) start += `datetime=${datetime.date}T${datetime.time}`;
      } else if (datetime)
        start += `datetime=${datetime.date}T${datetime.time}`;
      return start;
    };

    let stylists = await request
      .get(getRequstStringString())
      .then(data => data.filter(el => el.bookable));

    stylists.forEach((stylist, i) => (stylist.company = company));

    return stylists;
  },

  getStylistData: async (company_id, stylist_id, service_ids) => {
    console.log(service_ids?.length);
    let stylist_data = await request.get(
      `book_staff_seances/${company_id}/${stylist_id}${
        service_ids?.length ? `?service_ids=${service_ids.join(',')}` : ''
      },
      )}`,
    );

    return stylist_data;
  },

  getStylistBookableSeances: async (company_id, stylist_id, service_ids) => {
    const getRequstStringString = () => {
      let start = `book_dates/${company_id}?`;
      if (service_ids?.length) {
        start += `service_ids=${service_ids.join(',')}`;
        if (stylist_id) start += `&staff_id=${stylist_id}`;
      } else if (stylist_id) start += `staff_id=${stylist_id}`;
      return start;
    };

    let dates = await request.get(getRequstStringString()).then(data => {
      console.log(data);
      return data.booking_dates;
    });

    let times = await Promise.all(
      dates.map(date =>
        request
          .get(
            `book_times/${company_id}/${stylist_id || 0}/${date}?${
              service_ids.length ? `service_ids=${service_ids.join(',')}` : ``
            }`,
          )
          .then(data => data.map(el => el.time)),
      ),
    );

    let seances = [];

    for (let i = 0; i < dates.length; i++) {
      seances.push({date: dates[i], times: times[i]});
    }
    return seances;
  },

  getUserCards: async () => {
    let cards = await request.get(`user/loyalty_cards/${GROUP_ID}`);
    return cards;
  },

  getComments: async (company_id, stylist_id) => {
    let comments = await request.get(
      `comments/${company_id}/?staff_id=${stylist_id}`,
    );
    return comments;
  },

  getAllStylists: async () => {
    let filials = await request.get(`companies?group_id=${GROUP_ID}&city_id=1`);
    let stylists = await Promise.all(
      filials.map(filial => api.getStylists(filial)),
    );
    return stylists.reduce((a, b) => a.concat(b), []);
  },
};
