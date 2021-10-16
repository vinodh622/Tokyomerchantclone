import {PAYMENT_REQ, WALLET_PAYMENT} from './Constants';
import {
  PAYMENT_REQ_POINT,
  PAYMENT_VOUCHER,
  WALLET_PAY,
} from '../Screens/API/Api';

export const paymentAction = (text, token, VoucherType, userToken) => async (
  dispatch,
) => {
  //console.log(token)
  try {
    if (VoucherType === 1) {
      var form = new FormData();
      form.append('user_token', userToken);

      form.append('merchant_token', token);
      form.append('pay_type', 'points');
      form.append('amount', text);

      await fetch(PAYMENT_REQ_POINT, {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }),
        body: form,
      })
        .then((response) => response.json())
        .then((data) => {
       //   console.log(data);

          dispatch({type: PAYMENT_REQ, payload: data});
        })
        .catch((e) => console.log(e));
    } else if (VoucherType === 2) {
      var form = new FormData();
      form.append('qrcode', userToken);
      form.append('merchantToken', token);
      form.append('amount', text);

      await fetch(PAYMENT_VOUCHER, {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }),
        body: form,
      })
        .then((response) => response.json())
        .then((data) => {
       //   console.log(data);

          dispatch({type: PAYMENT_REQ, payload: data});
        })
        .catch((e) => console.log(e));
    }
  } catch (error) {
    console.log(error);
  }
};

export const walletAction = (merchentToken, Qrcode, amount) => async (
  dispatch,
) => {
  //console.log(Qrcode);

  try {
    var form = new FormData();
    form.append('api_token', merchentToken);

    form.append('qrcode', Qrcode);

    form.append('amount', amount);

    await fetch(WALLET_PAY, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        dispatch({type: WALLET_PAYMENT, payload: data});

        //
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};
