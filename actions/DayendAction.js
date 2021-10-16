import {DAY_END_REQ, CHECK_MERCHENT_PIN, DAY_OUT} from './Constants';

import {CHECK_PIN, MERCHANT_DAYEND} from '../Screens/API/Api';

export const DayendAction = (token, pin1, pin2, pin3, pin4) => async (
  dispatch,
) => {
  // console.log(VoucherType)
  try {
    var form = new FormData();
    form.append('api_token', token);
    form.append('pin', pin1 + pin2 + pin3 + pin4);

    await fetch(CHECK_PIN, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("reee"+data)
        if (data.status === 'success') {
          let getpinToken = data.data.token;

          var form = new FormData();
          form.append('api_token', getpinToken);

          fetch(MERCHANT_DAYEND, {
            method: 'POST',
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            }),
            body: form,
          })
            .then((response) => response.json())

            .then((data) => {
              //    console.log(data)
              dispatch({type: DAY_END_REQ, payload: data});
            });
        } else if (data.status === 'failure') {
          let invalidPin = data;

          dispatch({type: CHECK_MERCHENT_PIN, payload: invalidPin});
        }
      })

      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};

export const Daydt = () => async (dispatch) => {
  try {
    dispatch({type: DAY_OUT});
  } catch (error) {
    console.log(error);
  }
};
