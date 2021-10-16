import {STOCK_STATUS ,STOCK_UPDATE   } from './Constants';
import {STATUS_LIST ,STOCK_STATUS_UPDATE} from '../Screens/API/Api';

export const stockstatusAction = (token) => async (dispatch) => {
  try {
    var form = new FormData();
    form.append('api_token', token);

    await fetch(STATUS_LIST, {
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

        dispatch({type: STOCK_STATUS, payload: data});
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};





export const stockstatusUpdate = (token ,productId ,statusId  ) => async (dispatch) => {

    try {

        var form = new FormData();
        form.append('api_token', token);
        form.append('productid', productId );
        form.append('status', statusId);
  
        fetch(STOCK_STATUS_UPDATE, {
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
  
          dispatch({type: STOCK_UPDATE, payload: data});
        })
        .catch((e) => console.log(e));



    } catch (error) {
      console.log(error);
    }
  };
  
  









