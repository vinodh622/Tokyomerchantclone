import {  LIST_CAT_PRODUCTS   } from './Constants';
import {  VIEW_CATEGORY } from '../Screens/API/Api';

export const CategorylistAction = (token) => async (dispatch) => {
  try {
    var form = new FormData();

    form.append('api_token', token);

    

    await fetch(VIEW_CATEGORY, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
      

        dispatch({type: LIST_CAT_PRODUCTS, payload: data});
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};















