import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  SafeAreaView,
  Modal,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
  Platform,
  PlatformColor,
  ImageBackground,
  ActivityIndicator,
  Vibration,
  Button,
} from 'react-native';
import {global} from '../../Styles/global';

import axios from 'axios';
import {set} from 'react-native-reanimated';
import {PAYMENT_TYPES} from '../../Screens/API/Api';



export default function Actionsheet({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);

  const [VoucherType, setVoucherType] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    axios
      .post(PAYMENT_TYPES)

      .then((e) => {
        setVoucherType(e.data.data);
        setLoader(false);
      })
      .catch((e) => console.log(e));

    return () => {};
  }, []);

  const Qrscanpage = (id) => {

    navigation.navigate('Qrscanner', {VoucherType: id});

    setModalVisible(false);
  };

  const wd = () => {
    /// setModalVisible(false);
    navigation.goBack();
  };

  return (
    <View>
      <StatusBar backgroundColor="#EFCB38" barStyle="dark-content" />

      <View style={global.Actionsheet_bg}>
        <View style={global.actionBox}>
          <View style={global.actionHeader}>
            <Text style={global.Sheethead_title}>Choose Option</Text>
          </View>
          {loader ? (
            <View style={{paddingVertical: 20}}>
              <ActivityIndicator size="large" color="#76543A" />
            </View>
          ) : (
            <View>
              {VoucherType.map((e) => {
                return (
                  <TouchableOpacity
                    key={e.poID}
                    onPress={() => Qrscanpage(e.poID)}>
                    <View style={global.sheetContent}>
                      <Text style={global.Sheet_ctx_text}>
                        {e.poName === 'Redeem'
                          ? ' Redeem Voucher'
                          : 'Transactions'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        <View style={global.sheetCancel}>
          <TouchableOpacity onPress={() => wd()}>
            <Text style={global.sheetCancel_Text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
