import {TABLE_DATA} from './Constants';
import {
    TABLE_LIST,

} from '../Screens/API/Api';

export const tablelistAction = (token) => async (
  dispatch,
) => {
 
  try {
  
      var form = new FormData();
      form.append('api_token', token);

    

      await fetch(TABLE_LIST, {
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


          dispatch({type: TABLE_DATA, payload: data});
        })
        .catch((e) => console.log(e));



   
  } catch (error) {
    console.log(error);
  }
};



