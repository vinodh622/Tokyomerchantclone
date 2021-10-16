import {LOGIN_FAIL, LOGIN_REQ, LOGIN_RESPONSE, LOG_OUT} from './Constants';
import {LOGIN_API, PUSH_NOTIFICATION ,FIREBASE_API} from '../Screens/API/Api';

export const loginAction = (values, notificationValues, load) => async (dispatch) => {
  try {
    var form = new FormData();
    form.append('merchantid', values.merchantid);
    form.append('password', values.password);
    await fetch(LOGIN_API, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
       
      
   
        let userTokens = data.data.token;
        
        var form = new FormData();
        form.append('api_token', userTokens);
        form.append('device_token', notificationValues.tok);
        form.append('device_type', notificationValues.os);
        form.append('login_type' ,"merchant")
        fetch(FIREBASE_API, {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'multipart/form-data',
          }),
          body: form,
        })
    





        dispatch({type: LOGIN_RESPONSE, payload: data});

        
      });
  } catch (error) {
    dispatch({type: LOGIN_FAIL});
  }
};

export const Ltout = () => async (dispatch) => {
  try {
    dispatch({type: LOG_OUT});
  } catch (error) {
    console.log(error);
  }
};
