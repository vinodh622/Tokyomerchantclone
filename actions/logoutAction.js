import {LOGOUT_REQ} from './Constants';
import {LOGOUT_API} from '../Screens/API/Api';

export const logoutAction = (token) => async (dispatch) => {
  try {
    var form = new FormData();
    form.append('api_token', token);
    form.append('login_type', "merchant");
    await fetch(LOGOUT_API, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
      
        dispatch({type: LOGOUT_REQ, payload: data});
      });
  } catch (error) {
    console.log(error)
  }
};


