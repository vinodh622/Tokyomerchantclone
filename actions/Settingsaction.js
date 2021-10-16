import {LAN_SETTING_VALUE, BLE_SETTING_VALUE} from './Constants';

export const LANsetting_action = (
  your_Ip,
  your_Portnum, your_Type1
) => async (dispatch) => {
  try {
    dispatch({
      type: LAN_SETTING_VALUE,
      payloadIp1: your_Ip,
      payloadPortnum: your_Portnum,
      payloadType1:your_Type1
    });
  } catch (error) {
    console.log(error);
  }
};


export const BLEaction = (your_Devicename   ,your_Type2) => async (dispatch) => {
  try {
    dispatch({type: BLE_SETTING_VALUE, payload3: your_Devicename  , payloadType2: your_Type2});
  } catch (error) {
    console.log(error);
  }
};
