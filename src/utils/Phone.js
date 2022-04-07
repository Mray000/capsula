export const FormatPhone = phone => {
  return '7' + phone;
};

export const CheckIsValidPhone = phone => {
  return phone && phone.length == 10;
};
