import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  ImageBackground,
  RefreshControl,
  Alert,
} from 'react-native';
import {global} from '../../Styles/global';
import * as Animatable from 'react-native-animatable';
import Actionsheet from '../ActionSheet/Actionsheet';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction} from '../../actions/loginActions';
import moment from 'moment';
import ActivityLoader from '../ActivityLoader/ActivityLoader';
import {Ltout} from '../../actions/loginActions';
import {PAYMENT_HISTORY} from '../../Screens/API/Api';

import {getPaymentId} from '../../actions/CancelPayment';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function TransactionHistory({navigation}) {
  const [history, setHistory] = useState([]);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [ServerError, setserverError] = useState(false);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const getToken = useSelector((state) => state.loginDetails);

  const {token} = getToken;

  const cv = useSelector((state) => state.getpaymentId);

  const {uniquePaymentID} = cv;

  const [Error, setError] = useState(false);

  const payHistorylist = () => {
    var form = new FormData();
    form.append('api_token', token);

    fetch(PAYMENT_HISTORY, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setRefreshing(false);
        if (data.status === 'success') {
          setHistory(data.data);

          setserverError(false);

          setError(false);
        } else if (data.status === 'failure') {
          setserverError(false);

          setError(true);
        }
      })

      .catch((e) => {
        setserverError(true);

        setLoading(false);

        setHistory([]);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      //   setreservationName('today')

      payHistorylist();
    });

    return () => {
      unsubscribe;
    };
  }, []);

  const openPinmodel = () => {
    setModalVisible1(false);

    navigation.navigate('CustomPinModal');
  };

  const RetyAlert = () => {
    setLoading(true);

    var form = new FormData();
    form.append('api_token', token);

    fetch(PAYMENT_HISTORY, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())
      .then((datac) => {
        setLoading(false);
        let data = datac.data;
        let sliceData = data;
        //  console.log(sliceData)

        setHistory(sliceData);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const cancelPayment_Id = async (r) => {
    //  console.log(r);

    await dispatch(getPaymentId(r)).then(() => {
      setModalVisible1(true);
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      payHistorylist();
      // console.log("w")
      //console.log("e")
    });
  }, [refreshing]);

  return (
    <View style={global.innerpageContainer}>
      <StatusBar
        backgroundColor="#F1D049"
        barStyle="dark-content"
        networkActivityIndicatorVisible={true}
      />

      <View
        style={
          Platform.OS === 'android'
            ? global.common_header1
            : global.common_header1_IOS
        }>
        <View style={global.common_header_layer1}>
        
          <View></View>
        

          <Image source={require('../../images/Logo.png')}  style={global.headLogo} resizeMode="contain" />

   
          <Text></Text>
        </View>

        <View style={global.common_header_layer2}>
          <View>
            <Text style={global.common_Title}>Transaction History</Text>
          </View>
        </View>

        <View style={global.common_header2_btn_wrapper}>
          <TouchableOpacity>
            <View style={global.white_Btn}>
              <Image
                source={require('../../images/Coinyellow_icon.png')}
                style={{width: 18, height: 18}}
              />
              <Text style={global.btnText_white}>Payment</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('TopupHistory')}>
            <View style={global.common_btn_box}>
              <Image
                source={require('../../images/Wallet_yellow_icon.png')}
                style={{width: 18, height: 18}}
              />
              <Text style={global.btnText}>Top-Up</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 30,
          paddingBottom: 60,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Animatable.View animation="fadeInUp">
          {ServerError === true ? (
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'red',
                  fontSize: 20,
                  paddingVertical: 40,
                }}>
                Something went wrong.
              </Text>
              <TouchableOpacity onPress={() => RetyAlert()}>
                <Text style={global.retryButton}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {Error ? (
                <View style={global.EmptyListbox}>
                  <Text style={global.emptyBoxtext}>
                    No Payment History Found.
                  </Text>
                </View>
              ) : (
                <View>
                  {history.map((e) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Transactiondetail', {
                            transactionID: e.id,
                            paymentID: e.id,
                            status: e.status,
                          })
                        }
                        key={e.paymentID}>
                        <View style={global.activityLists} key={e.paymentID}>
                          <View style={global.activityList_wrap1}>
                            <Text
                              style={global.activity_trimText}
                              numberOfLines={1}
                              ellipsizeMode="tail">
                              {e.username}
                            </Text>

                            <Text style={global.pay_dt_md}>
                              {' '}
                              {moment(e.created_at).format('h:mm a')}{' '}
                            </Text>

                            <View>
                              {e.status === 2 || e.dayendstatus === 1 ? (
                                <View style={global.activitycancled_btn}>
                                  <Text style={global.activitycancled_Text}>
                                    Canceled
                                  </Text>
                                </View>
                              ) : (
                                <TouchableOpacity
                                  onPress={() => cancelPayment_Id(e.id)}>
                                  <View style={global.activitycancel_Btn}>
                                    <Text style={global.brown_btn_text}>
                                      Cancel
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              )}
                            </View>
                          </View>

                          <View style={global.activityList_wrap2}>
                            <Text style={global.normalText}>
                              RM {(Math.round(e.amount * 100) / 100).toFixed(2)}
                            </Text>

                            <Text style={global.pay_dt_md}>
                              Payment ID:{e.paymentID}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          )}
        </Animatable.View>
      </ScrollView>

      <View
        style={
          Platform.OS === 'ios'
            ? global.CustomTabheader_IOS
            : global.CustomTabheader
        }>
        <TouchableOpacity onPress={() => navigation.navigate('Lastactivity')}>
          <View style={global.tabbarMenuwidth}>
            <Image
              source={require('../../images/Hometab.png')}
              style={{width: 18, height: 18}}
            />
            <Text style={global.MenuName}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Table')}>
          <View style={global.tabbarMenuwidth}>
            <Image
              source={require('../../images/drawericon3.png')}
              style={{width: 18, height: 18,tintColor:"#C7451F"}}
            />
            <Text style={global.Active_menu}>History</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Actionsheet')}>
          <View style={global.tabbarMenuwidth}>
            <View style={global.circleMenu_layer1}>
              <View style={global.circleMenu_layer2}>
                <Image source={require('../../images/Iconly-Bold-Scan.png')} />
              </View>
            </View>
            <Text style={global.Menu_Center}>Transaction</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={global.tabbarMenuwidth}>
            <Image
              source={require('../../images/drawerIcon1.png')}
              style={{width: 17, height: 17}}
            />
            <Text style={global.MenuName}>Profile</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Summary')}>
          <View style={global.tabbarMenuwidth}>
            <Image
              source={require('../../images/logout.png')}
              style={{width: 18, height: 18}}
            />
            <Text style={global.MenuName}>Day End</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <Text>{loading ? <ActivityLoader /> : ''}</Text>
      </View>

      <View>
        <Modal animationType="slide" transparent={true} visible={modalVisible1}>
          <TouchableOpacity
            onPress={() => setModalVisible1(false)}
            style={global.popupBg1}>
            <View>
              <View style={global.popupBox1}>
                <Text style={global.popup_Title1}>
                  Are you sure want to cancel this transaction ?
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 40,
                  }}>
                  <TouchableOpacity onPress={() => setModalVisible1(false)}>
                    <View style={global.confirm_btncancel}>
                      <Text style={global.white_Btn_Text}>No</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => openPinmodel()}>
                    <View style={global.confirm_proceed}>
                      <Text style={global.whiteText}>Yes</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
}
