import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  SafeAreaView,
  Platform,
  Image,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Images from '../../images';
import {global} from '../../Styles/global';
import {useDispatch, useSelector} from 'react-redux';
import {Ltout} from '../../actions/loginActions';
import PushNotification from 'react-native-push-notification';

import * as Animatable from 'react-native-animatable';
import Actionsheet from '../ActionSheet/Actionsheet';
import moment from 'moment';
import ActivityLoader from '../ActivityLoader/ActivityLoader';
import {PAYMENT_HISTORY, CANCEL_PAYMENT} from '../../Screens/API/Api';
import CustomPinModal from '../CustomModels/CustomPinModal';

import {getPaymentId} from '../../actions/CancelPayment';

import PushNotificationhandler from '../PushNotificationhandler'


///import Pushuserinteraction from '../Pushuserinteraction'






const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function Lastactivity({navigation}) {
  const [ServerError, setserverError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const [Hours, setHours] = useState('');
  const [Minutes, setMinutes] = useState('');
  const [Sec, setSec] = useState('');
  const [Range, setRange] = useState('');

  const [history, setHistory] = useState([]);

  const [Error, setError] = useState(false);

  const [modalvisibe1, setmodalVisible1] = useState(false);

  const [pinModel, setpinModel] = useState(false);

  let timer1 = setInterval(() => {
    var dt = new Date();
    var hours = dt.getHours();
    var AmOrPm = hours >= 12 ? 'p.m' : 'a.m';
    hours = hours % 12 || 12;
    var minutes = dt.getMinutes();
    var sec = dt.getSeconds();
    //  var finalTime = ` ${ hours } : ${ minutes } : ${sec } : ${ AmOrPm}`;
    setHours(hours);
    setMinutes(minutes);
    setSec(sec);
    setRange(AmOrPm);
  }, 1000);

  const dispatch = useDispatch();

  const getToken = useSelector((state) => state.loginDetails);

  const {token, StaffID} = getToken;




  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const getCurrentmonth = new Date();

  const setcurrentMonth = monthNames[getCurrentmonth.getMonth()];

  var dateObj = new Date();
  //var month = dateObj.getMonth() + 1; //months from 1-12
  var day = dateObj.getDate();
  var year = dateObj.getFullYear();

  const newdate = day + '' + setcurrentMonth + ',' + year;

  const latestActivity = () => {
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
        setRefreshing(false);
        if (datac.status === 'success') {
          let data = datac.data;
          let sliceData = data.slice(0, 4);

          setHistory(sliceData);
          setserverError(false);
          setError(false);
        } else if (datac.status === 'failure') {
          setError(true);
        }
      })
      .catch((e) => {
        setserverError(true);

        setHistory([]);
      });
  };

  const pushListener = PushNotificationhandler(navigation);
//const userInteraction= Pushuserinteraction(navigation)


 
 



  useEffect(() => {    

    pushListener

    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      

      latestActivity();
    });

    return () => {
      clearTimeout(timer1);

      unsubscribe;
    };
  }, []);

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
        let sliceData = data.slice(0, 4);
        //console.log(sliceData)

        setHistory(sliceData);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openPinmodel = () => {
    setmodalVisible1(false);

    navigation.navigate('CustomPinModal');
  };

  const cancelPayment_Id = async (id) => {
    // console.log(id);

    await dispatch(getPaymentId(id)).then(() => {
      setmodalVisible1(true);
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      
      latestActivity();

      //console.log("e")
    });
  }, [refreshing]);




  return (
    <View style={global.innerpageContainer}>
      <StatusBar backgroundColor="#F1D049" barStyle="dark-content" />

      <View
        style={
          Platform.OS === 'android' ? global.homeHead : global.homeHead_IOS
        }>
        <View style={global.common_header_layer1}>
          {/* <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={require('../../images/HamburgerMenu.png')} />
          </TouchableOpacity> */}
          <View></View>

          <Image source={require('../../images/Logo.png')} style={global.headLogo}  resizeMode="contain"/>

          <Text></Text>
          
        </View>

        <View style={global.common_header_layer2}>
          <View>
            <Animatable.View animation="zoomInUp">
              <View style={global.common_header_bgImage}>
                <Image
                  source={require('../../images/placeholder-image.jpeg')}
                  imageStyle={{borderRadius: 36}}
                  style={{width: '100%', height: '100%', overflow: 'hidden'}}
                  resizeMode="cover"
                />
              </View>
            </Animatable.View>
          </View>

          <View>
            <View>
              <Text style={global.dateSection}>{newdate}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Text>{Hours}</Text>
              <Text>:</Text>
              <Text>{Minutes}</Text>
              <Text>:</Text>
              <Text>{Sec}</Text>
              <Text>{Range}</Text>
            </View>
            <Text
              style={global.cm_header_addr}
              numberOfLines={1}
              ellipsizeMode="tail">
              {' '}
              {StaffID}
            </Text>
          </View>
        </View>
      </View>

      <View style={global.common_wrapper}>
        <View style={global.flextitleSec}>
          <Text style={global.common_Title}>Latest Activity</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('TransactionHistory')}>
            <View style={global.activityView_All}>
              <Text style={global.yellow_btn_text}>View All</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15, paddingBottom: 60}}
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
                  paddingVertical: 30,
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
                  <Text style={global.emptyBoxtext}>No activity yet.</Text>
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
                              {moment(e.created_at).format('h:mm a')}{' '}
                            </Text>

                            <View>
                              {e.status === 2 || e.dayendstatus ===1  ? (
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
                            <Text style={global.pay_dt_bold_Md}>
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

      {/* <View style={global.CustomTabheader}>


<TouchableOpacity onPress={()=>navigation.navigate('Summary')}>
<View>
<Image source={require('../../images/lock.png')}/>
<Text>Home</Text>
</View>

</TouchableOpacity>



<View>
<Image source={require('../../images/lock.png')}/>
<Text>settings</Text>
</View>



</View> */}

      <View
        style={
          Platform.OS === 'ios'
            ? global.CustomTabheader_IOS
            : global.CustomTabheader
        }>
              <TouchableOpacity>
        <View style={global.tabbarMenuwidth}>
          <Image
            source={require('../../images/HomeActive.png')}
            style={{width: 18, height: 18}}
          />
          <Text style={global.Active_menu}>Home</Text>

        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
          <View style={global.tabbarMenuwidth}>
            <Image
              source={require('../../images/drawericon3.png')}
              style={{width: 18, height: 18}}
            />
            <Text style={global.MenuName}>History</Text>
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
              style={{width: 18, height: 18}}
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

   
        <View>{loading ? <ActivityLoader /> : null}</View>
      

      <View>
        <Modal animationType="none" transparent={true} visible={modalvisibe1}>
          <TouchableOpacity
            onPress={() => setmodalVisible1(false)}
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
                  <TouchableOpacity onPress={() => setmodalVisible1(false)}>
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
