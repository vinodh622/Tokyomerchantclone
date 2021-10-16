import {  CAT_WISE_PRODUCTS   } from './Constants';
import {  CATEGORY_WISE } from '../Screens/API/Api';

export const Category_wise_product = (token ,catId) => async (dispatch) => {
    //console.log(catId)
  try {
    var form = new FormData();
    form.append('api_token', token);
    form.append('cateid', catId);

    await fetch(CATEGORY_WISE, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        //  console.log(data)
      

        dispatch({type: CAT_WISE_PRODUCTS, payload: data});
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};















