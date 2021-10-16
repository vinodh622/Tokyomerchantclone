//import {boolean} from 'yup';
import {LAN_SETTING_VALUE, BLE_SETTING_VALUE} from '../actions/Constants';

function Settingsreducer(
  
  state = {privateIp:null , privatePortnum: null , privateDevicename:null ,privateType1: null ,privateType2: null},
  action,
) {
  switch (action.type) {
    case LAN_SETTING_VALUE:
      let printerdb1 = action.payloadIp1;
      let printerdb2 = action.payloadPortnum;
     let  getType=action.payloadType1

    

      return {
        privateIp: printerdb1,
        privatePortnum: printerdb2,
        privateType1:getType

      };

    case BLE_SETTING_VALUE:
      let printerdb3 = action.payload3;
      let getType2=action.payloadType2
    


      return {
        privateDevicename: printerdb3,
        privateType2:getType2

      };

    default:
      return state;
  }
}

export {Settingsreducer};
