import {action, makeAutoObservable} from 'mobx';

class Entry {
  filial = null;
  services = [];
  stylist = null;
  date_and_time = null;
  bonus = 0;
  constructor() {
    makeAutoObservable(this);
  }
  setFilial(filial) {
    this.filial = filial;
  }

  setServices = filial => {
    this.services = !this.services.find(el => el.id == filial.id)
      ? [...this.services, filial]
      : this.services.filter(el => el.id != filial.id);
  };
  setStylist = stylist => {
    this.stylist = stylist;
  };

  setDateAndTime = (date, time) => {
    this.date_and_time = {date, time};
  };

  setBonus = (bonus, max) => {
    console.log(bonus, max);
    if (!Number.isNaN(bonus) && Number(bonus) < max) {
      this.bonus = Number(bonus);
    } else {
      this.bonus = this.bonus;
    }
  };

  clearFilial = () => {
    this.filial = null;
    this.clearServices();
  };

  clearServices = () => {
    this.services = [];
    this.clearStylist();
  };

  clearStylist = () => {
    this.stylist = null;
    this.clearDateAndTime();
  };
  clearDateAndTime = () => {
    this.date_and_time = null;
  };
}

export const entry = new Entry();
