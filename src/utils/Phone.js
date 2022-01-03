export const FormatPhone = phone => {
  if (phone.length == 12) return phone.substr(1);
  else return '7' + phone.substr(1);
};

export const CheckIsValidPhone = phone => {
  return (
    phone &&
    (phone.length == 12
      ? phone.substr(0, 2) == '+7'
      : phone.length == 11
      ? phone[0] == '8' || phone[0] == '7'
      : false)
  );
};
