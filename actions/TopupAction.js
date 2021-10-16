import {TOP_UP_REQ} from './Constants';
import {TOP_UP_PAYMENT} from '../Screens/API/Api';

export const TopupAction = (merchantToken, Qrdata, amount) => async (
  dispatch,
) => {
  // console.log(Qrdata)
  try {
    var form = new FormData();
    form.append('api_token', merchantToken);
    form.append('qrcode', Qrdata);
    form.append('amount', amount);

    await fetch(TOP_UP_PAYMENT, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data)

        dispatch({type: TOP_UP_REQ, payload: data});
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};
