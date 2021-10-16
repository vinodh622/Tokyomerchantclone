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
  ScrollView,
  Dimensions,
  TouchableHighlight,
  Platform,
  ImageBackground,
  Alert,
  ActivityIndicator,
  RefreshControl,
  NativeModules,
} from 'react-native';
import {global} from '../../Styles/global';
import * as Animatable from 'react-native-animatable';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-simple-toast';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import {
  DELETE_ORDER,
  DELETE_TABLE_ORDER,
  CONFIRM_ORDER,
  WEB_ORDERS,
} from '.././API/Api';

import moment from 'moment';
import ActivityLoader from '../ActivityLoader/ActivityLoader';

import QRCode from 'react-native-qrcode-image';
import Tooltip from 'react-native-walkthrough-tooltip';
import {summaryAction} from '../../actions/summaryAction';
import CancelOrderPin from '../Tables/CancelOrderPin';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

var NativeModuleEx = NativeModules.TaskManager;

var _androidLan_Printer = NativeModules.PrinterModule;

///console.log(_androidLan_Printer)



const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const windowWidth = Dimensions.get('screen').width;

export default function Ordersummary({navigation, route}) {
  const [modalvisibe1, setmodalvisibe1] = useState(false);
  const [toolTipVisible, setToolTipVisible] = useState(false);

  const [onConfirmbooking, setConfirmbooking] = useState(false);

  const [Notify, setNotify] = useState(false);

  const [modalvisibe2, setmodalvisibe2] = useState(false);

  const [productId, setProductid] = useState('');

  const [orderDatas, setorderDatas] = useState([]);

  const [Errors, setErrors] = useState(false);
  const [Loader, setLoader] = useState(true);

  const [showBtn, setshowBtn] = useState(false);

  const [Qrmodal, setQrmodal] = useState(false);

  const [orderId, setorderId] = useState('');

  const {booking_Id, checkin_date, qrcode, tableName} = route.params;

  const [Qrdatas, setQrdata] = useState(WEB_ORDERS + qrcode);

  const [activityLoader, setactivityLoader] = useState(false);
  const [activityLoader_1, setactivityLoader_1] = useState(false);
  const [activityLoader_2, setactivityLoader_2] = useState(false);

  const [showconfirmModel, setconfirmModel] = useState(false);

  const [showconfirmModel_id, setconfirmModel_id] = useState('   ');

  const [refreshing, setRefreshing] = React.useState(false);

  const getToken = useSelector((state) => state.loginDetails);
  const {token} = getToken;

  const getsummaryStatus = useSelector((state) => state.summaryReducer);
  const {summaryStatus, summaryData, productStatus} = getsummaryStatus;

  const printerdetails = useSelector((state) => state.Settingsreducer);

  const {
    privateIp,
    privatePortnum,
    privateDevicename,
    privateType1,
    privateType2,
  } = printerdetails;


  const dispatch = useDispatch();

  // PushNotification.configure({

  //   onNotification: function (notification) {

  //     if (notification.userInteraction) {
  //     console.log("e2e2e2e2e2e2e2e2e2e2e2e2e2e")
  //       dispatch(
  //         summaryAction(
  //           token,
  //           notification.data.bookingid,
  //           notification.data.checkinDate,
  //           notification.data.tableName,
  //           notification.data.qrcode,
  //         )

  //       )
  //     }

  //     notification.finish(PushNotificationIOS.FetchResult.NoData);
  //   },

  //   senderID: '945025541582',

  //   //  senderID:'917569150989',

  //   permissions: {
  //     alert: true,
  //     badge: true,
  //     sound: true,
  //   },

  //   popInitialNotification: true,
  //   requestPermissions: true,
  // });

  const getsummaryData = async () => {
    if (route.params.booking_Id !== '' && route.params.checkin_date !== '') {
      await dispatch(
        summaryAction(
          token,
          route.params.booking_Id,
          route.params.checkin_date,
          route.params.tableName,
          route.params.qrcode,
        ),
      ).then(() => {
        setLoader(false);

        if (summaryStatus === 'success') {
          setRefreshing(false);

          setshowBtn(false);
        } else if (summaryStatus === 'failure') {
          setRefreshing(false);
          setLoader(false);
          setshowBtn(false);
        }
      });
    } else {
      await dispatch(
        summaryAction(token, booking_Id, checkin_date, tableName, qrcode),
      ).then(() => {
        setLoader(false);

        if (summaryStatus === 'success') {
          setRefreshing(false);
          setshowBtn(false);
        } else if (summaryStatus === 'failure') {
          setRefreshing(false);
          setLoader(false);
          setshowBtn(false);
        }
      });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoader(true);
      getsummaryData();
    });

    return () => {
      unsubscribe;
    };
  }, []);

  const confirmProductdelete = (id) => {
    setmodalvisibe2(true);

    setProductid(id);
  };

  const deleteProduct = () => {
    setactivityLoader_1(true);

    var form = new FormData();
    form.append('api_token', token);
    form.append('deleteid', productId);

    fetch(DELETE_ORDER, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())

      .then((data) => {
        if (data.status === 'success') {
          setactivityLoader_1(false);
          Toast.show(data.data);
          setmodalvisibe2(false);
          getsummaryData();
        } else if (data.status === 'failure') {
          Toast.show(data.data);
          setmodalvisibe2(false);
          setactivityLoader_1(false);
        }
      })
      .catch((e) => console.log(e));
  };

  const cancelorderPopup = (id) => {
    setmodalvisibe1(true);

    setProductid(id);
  };

  const cancelOrder = () => {
    setactivityLoader_2(true);

    var form = new FormData();
    form.append('api_token', token);
    form.append('orderid', productId);

    fetch(DELETE_TABLE_ORDER, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())

      .then((data) => {
        if (data.status === 'success') {
          Toast.show(data.data);
          setactivityLoader_2(false);
          setmodalvisibe1(false);
          getsummaryData();
        } else if (data.status === 'failure') {
          setactivityLoader_2(false);

          Toast.show(data.data);
        }
      })
      .catch((e) => console.log(e));
  };

  // const ShowButton = () => {
  //   if (summaryStatus === 'failure') {
  //     return (
  //       <View style={global.ButtonWrapper}>
  //         <TouchableOpacity onPress={() => QrcodeOpen()}>
  //           <View style={global.white_Btn}>
  //             {Platform.OS === 'android' ? (
  //               <Text style={global.normalText}>Print QR code</Text>
  //             ) : (
  //               <Text style={global.normalText}>Print QR code</Text>
  //             )}
  //           </View>
  //         </TouchableOpacity>

  //         <View style={global.diasbleBtn}>
  //           <Text style={global.btnText}>Confirm</Text>
  //         </View>
  //       </View>
  //     );
  //   } else {
  //     return (
  //       <View style={global.ButtonWrapper}>
  //         <TouchableOpacity onPress={() => QrcodeOpen()}>
  //           <View style={global.white_Btn}>
  //             {Platform.OS === 'android' ? (
  //               <Text style={global.normalText}>Re-Print QR code</Text>
  //             ) : (
  //               <Text style={global.normalText}>Scan QR code</Text>
  //             )}
  //           </View>
  //         </TouchableOpacity>

  //         <TouchableOpacity onPress={() => confirmSummary()} disabled={true}>
  //           <View style={global.brown_Btn}>
  //             <Text style={global.btnText}>Confirm</Text>

  //             {activityLoader ? (
  //               <ActivityIndicator
  //                 size="small"
  //                 color="#EFCB38"
  //                 style={{marginLeft: 10}}
  //               />
  //             ) : (
  //               <View></View>
  //             )}
  //           </View>
  //         </TouchableOpacity>
  //       </View>
  //     );
  //   }
  // };

  const doAndroidprinter = () => {
    // Native android to print QR  via LAN......//
    if (privateType1 === null) {
      Alert.alert(
        'You need to configure your app to access this feature.',
        '',
        [
          {
            text: 'Cancel',

            style: 'cancel',
          },
          {text: 'OK', onPress: () => navigation.navigate('Settings')},
        ],
      );
    } else {
      _androidLan_Printer.printQR(
        privateIp,
        privatePortnum,
        Qrdatas,
        tableName,
      );
    }
  };

  const doIosNetPrintwithData = () => {
    //------ Native IOS to print QR via LAN & Bluetooth---------//
    if (privateType1 === null || privateType2 === null) {
      Alert.alert(
        'You need to configure your app to access this feature. ',
        '',
        [
          {
            text: 'Cancel',

            style: 'cancel',
          },
          {text: 'OK', onPress: () => navigation.navigate('Settings')},
        ],
      );
    } else {
      if (privateType1 === 1) {
        NativeModuleEx.initwithIpAddress(
          privateIp,
          privatePortnum,
          Qrdatas,
          tableName,
        );
      } else {
        NativeModuleEx.initwithBLEName(privateDevicename, Qrdatas, tableName);
      }
    }
  };

  const _onPrintQr_android = () => {
    Alert.alert(
      `Select your printer type`,
      'To continue your process....',
      [
        {text: 'Cancel'},

        {text: 'LAN', onPress: () => doAndroidprinter()},

        {text: 'Bluetooth', onPress: () => navigation.navigate('Printer')},
      ],

      {cancelable: false},
    );
  };

  const QrcodeOpen = () => {
    //---- Handle Printer onClick ----------
    if (Platform.OS === 'android') {
      Alert.alert(
        `Scan Qr code via printer ?`,
        '',
        [
          {text: 'Cancel'},

          {text: 'No', onPress: () => setQrmodal(true)},

          {text: 'Yes', onPress: () => _onPrintQr_android()},
        ],

        {cancelable: false},
      );
    } else {
      Alert.alert(
        'Scan your  Qr code via printer ? ',
        '',
        [
          {
            text: 'No',
            onPress: () => setQrmodal(true),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => doIosNetPrintwithData()},
        ],
        {cancelable: false},
      );
    }
  };

  const confirmSummary = () => {
    setactivityLoader(true);

    var form = new FormData();
    form.append('api_token', token);
    form.append('bookingid', booking_Id);

    fetch(CONFIRM_ORDER, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())

      .then((data) => {
        setactivityLoader(false);

        getsummaryData();

        if (data.status === 'success') {
          Alert.alert(data.data, '', [{text: 'OK'}], {
            cancelable: false,
          });
          setConfirmbooking(true);
        } else if (data.status === 'failure') {
          Alert.alert(data.data, '', [{text: 'OK'}], {
            cancelable: false,
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      getsummaryData();
    });
  }, [refreshing]);

  const openNotify = async (id) => {
    ///console.log(id)
    setToolTipVisible(id);
    if (id === toolTipVisible) {
      setNotify(!Notify);
    }
  };

  const confirmCancel = (id) => {
    setconfirmModel(true);

    setconfirmModel_id(id);
  };
  const closeConfirmmodel = () => {
    setconfirmModel(false);

    getsummaryData();
  };

  return (
    <View style={global.innerpageContainer}>
      <StatusBar
        backgroundColor="#FFF5CE"
        barStyle="dark-content"
        networkActivityIndicatorVisible={true}
      />

      <View
        style={
          Platform.OS === 'android'
            ? global.common_wrapper
            : global.common_wrapper_IOS
        }>
        <View style={{marginBottom: 20}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../images/yellowBackarrow.png')} />
          </TouchableOpacity>
        </View>

        <View style={global.flextitleSec}>
          <Text style={global.common_Title}>Order Summary</Text>
        </View>

        <View style={global.flextitleSec}>
          <Text style={[global.common_Title]}>{tableName}</Text>

          <Text style={global.normalText}>
            Check In Time: {moment(checkin_date).format('h:mm a')}
          </Text>
        </View>
      </View>

      <View style={{flex: 7}}>
        <ScrollView
          contentContainerStyle={{paddingHorizontal: 15, paddingBottom: 30}}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {summaryStatus === 'failure' ? (
            <View style={global.EmptyListbox}>
              <Text style={global.emptyBoxtext}>No activite orders yet.</Text>
            </View>
          ) : (
            <View>
              <View>
                {summaryData.map((e) => {
                  return (
                    <View key={e.orderid} style={global.summaryBox}>
                      <View style={global.summaryWrapcol1}>
                        <Text style={global.normalText_Bold}>
                          {' '}
                          Order ID : {e.id < 9 ? '00' + e.id : '0' + e.id}
                        </Text>

                        <Text style={global.normalText}>
                          {' '}
                          Order At:{moment(e.created_at).format('h:mm a')}{' '}
                        </Text>
                        {e.status === 2 ? (
                          <TouchableOpacity
                            onPress={() => cancelorderPopup(e.id)}>
                            <View style={global.sm_cancelop1}>
                              <Text style={global.btnwhite_Text}> Cancel</Text>
                            </View>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity onPress={() => confirmCancel(e.id)}>
                            <View style={global.sm_cancelop1}>
                              <Text style={global.btnwhite_Text}> Cancel</Text>
                            </View>
                          </TouchableOpacity>
                        )}
                      </View>

                      <View>
                        {e.product.map((e) => {
                          return (
                            <View style={global.summaryWrapcol2}>
                              <TouchableOpacity
                                onPress={() => confirmProductdelete(e.orderid)}>
                                <View style={global.sm_trashIcon}>
                                  <Image
                                    source={require('../../images/trashicon1.png')}
                                    style={{width: 11, height: 11}}
                                  />
                                </View>
                              </TouchableOpacity>

                              <Text style={global.normalText}>{e.qty}</Text>

                              <View>
                                <Text
                                  style={global.sm_Productname}
                                  numberOfLines={3}
                                  ellipsizeMode="tail">
                                  {e.product_name}
                                </Text>
                                <Text style={global.normalText}>
                                  Variation:
                                </Text>
                                {e.variation.map((e) => {
                                  return (
                                    <View style={{marginBottom: 10}}>
                                      <Text style={global.normalText}>
                                        - {e.addon}
                                      </Text>
                                    </View>
                                  );
                                })}

                                <Text style={global.normalText}>Addons:</Text>

                                {e.addon.length === 0 ? (
                                  <Text style={global.normalText}>
                                    - No addons
                                  </Text>
                                ) : (
                                  <View>
                                    {e.addon.map((e) => {
                                      return (
                                        <View>
                                          <Text style={global.normalText}>
                                            - {e.addon}
                                          </Text>
                                        </View>
                                      );
                                    })}
                                  </View>
                                )}
                              </View>
                              <View>
                                <View style={{marginBottom: 7}}>
                                  {e.remark !== '' ? (
                                    <TouchableOpacity
                                      onPress={() => openNotify(e.orderid)}>
                                      <Image
                                        source={require('../../images/icons8-notification.png')}
                                        style={{width: 16, height: 16}}
                                      />
                                    </TouchableOpacity>
                                  ) : (
                                    <Text></Text>
                                  )}
                                </View>

                                <View>
                                  {e.remark !== '' ? (
                                    <View>
                                      {e.orderid === toolTipVisible ? (
                                        Notify ? (
                                          <View style={{position: 'relative'}}>
                                            <View
                                              style={{
                                                position: 'absolute',
                                                left: -12,
                                                zIndex: 9,
                                                top: -9,
                                              }}>
                                              <Image
                                                source={require('../../images/up-arrow.png')}
                                                style={{width: 19, height: 19}}
                                              />
                                            </View>

                                            <View
                                              style={{
                                                backgroundColor: '#EFCB38',
                                                padding: 10,
                                                borderRadius: 4,
                                                position: 'absolute',
                                                top: 5,
                                                width: windowWidth / 2,
                                                right: 0,
                                              }}>
                                              <Text
                                                style={global.normalText_Bold}>
                                                Remarks
                                              </Text>

                                              <Text>{e.remark}</Text>
                                            </View>
                                          </View>
                                        ) : (
                                          <Text></Text>
                                        )
                                      ) : null}
                                    </View>
                                  ) : (
                                    <Text> </Text>
                                  )}
                                </View>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          )}
        </ScrollView>
      </View>

      <View style={{flex: 1.2, paddingHorizontal: 15, paddingBottom: 15}}>
        <View style={global.ButtonWrapper}>
          <TouchableOpacity onPress={() => QrcodeOpen()}>
            <View style={global.white_Btn}>
              <Text style={global.normalText}>Re-Print QR code</Text>
            </View>
          </TouchableOpacity>
          {summaryStatus === 'failure' || summaryData.length === 0 ? (
            <TouchableOpacity disabled>
              <View style={global.diasbleBtn}>
                <Text style={global.btnText}>Confirm</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => confirmSummary()}
              disabled={productStatus === true}>
              <View
                style={
                  productStatus === true ? global.diasbleBtn : global.brown_Btn
                }>
                <Text style={global.btnText}>Confirm</Text>

                {activityLoader ? (
                  <ActivityIndicator
                    size="small"
                    color="#EFCB38"
                    style={{marginLeft: 10}}
                  />
                ) : (
                  <View></View>
                )}
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View></View>

      <Modal animationType="none" transparent={true} visible={modalvisibe1}>
        <View style={global.popupBg1}>
          <View style={global.popupBox1}>
            <Text style={global.popup_Title1}>Cancel Order?</Text>
            <Text style={global.popup_Title2}>Cancel entire order</Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 40,
              }}>
              <TouchableOpacity onPress={() => setmodalvisibe1(false)}>
                <View style={global.confirm_btncancel}>
                  <Text style={global.white_Btn_Text}>No</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => cancelOrder()}>
                <View style={global.confirm_proceed}>
                  <Text style={global.whiteText}>Yes</Text>

                  {activityLoader_2 ? (
                    <ActivityIndicator
                      size="small"
                      color="#FFE26B"
                      style={{marginLeft: 10}}
                    />
                  ) : (
                    <View></View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="none" transparent={true} visible={modalvisibe2}>
        <View style={global.popupBg1}>
          <View style={global.popupBox1}>
            <Text style={global.popup_Title1}>Delete Item?</Text>
            <Text style={global.popup_Title2}>Remove item permanently?</Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 40,
              }}>
              <TouchableOpacity onPress={() => setmodalvisibe2(false)}>
                <View style={global.confirm_btncancel}>
                  <Text style={global.white_Btn_Text}>No</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteProduct()}>
                <View style={global.confirm_proceed}>
                  <Text style={global.whiteText}>Yes</Text>
                  {activityLoader_1 ? (
                    <ActivityIndicator
                      size="small"
                      color="#FFE26B"
                      style={{marginLeft: 10}}
                    />
                  ) : (
                    <View></View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="none" transparent={true} visible={Qrmodal}>
        <TouchableOpacity
          style={global.popupBg1}
          onPress={() => setQrmodal(false)}>
          <QRCode
            value={Qrdatas}
            size={250}
            bgColor="#FFFFFF"
            fgColor="#000000"
          />
        </TouchableOpacity>
      </Modal>

      <View>{Loader ? <ActivityLoader /> : null}</View>

      {showconfirmModel ? (
        <CancelOrderPin
          showconfirmModel_id={showconfirmModel_id}
          closeConfirmmodel={closeConfirmmodel}
        />
      ) : null}
    </View>
  );
}
