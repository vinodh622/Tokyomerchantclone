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
  ImageBackground, RefreshControl
  
} from 'react-native';
import {global} from '../../Styles/global';
import * as Animatable from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import ActivityLoader from '../ActivityLoader/ActivityLoader';
import {
  TOP_UP_HISTORY,
  CANCEL_PAYMENT,
  TOPUP_HISTORY_SEARCH,
} from '../../Screens/API/Api';

import {getTopuptId} from '../../actions/CancelTopup';



const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};


export default function TopupHistory({navigation}) {
  const [history, setHistory] = useState([]);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [ServerError, setserverError] = useState(false);

  const [loading, setLoading] = useState(true);

  const [getDate, setDate] = useState('(Today) Select Date');

  const [isDatePickerVisible, setIsdatePickerVisible] = useState(false);

  const [Error, setError] = useState(false);

  //console.log(Error)

  const dispatch = useDispatch();

  const getToken = useSelector((state) => state.loginDetails);

  const {token} = getToken;

  const cv = useSelector((state) => state.TopupcancelReducer);

  const {uniqueTopupId} = cv;



  const topupHistorylist = () =>{

    var form = new FormData();
    form.append('api_token', token);

    fetch(TOP_UP_HISTORY, {
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
        setLoading(false);
        setRefreshing(false)
          if (data.status === 'success') {
           
            setHistory(data.data);
            setserverError(false);
            setError(false);
          } else if (data.status === 'failure') {
           
           
            setError(true);
          }
        
      })
      .catch((e) => {
        setserverError(true);
        // console.log(ServerError)

        setLoading(false);

        setHistory([]);
      });



  }




  useEffect(() => {
   
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true)
   //   setreservationName('today')



   topupHistorylist ()
   





     
    });
  
  

    return () => {
      unsubscribe
    };
  }, [ ]);

  


  const openPinmodel = () => {
    setModalVisible1(false);

    navigation.navigate('TopupCancel');
  };

  

  
  
  const cancelPayment_Id = async (id) => {
    //console.log(id)

    await dispatch(getTopuptId(id)).then(() => {
      setModalVisible1(true);
    });
  };

  const showDatePicker = () => {
    setIsdatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsdatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setIsdatePickerVisible(false);
    // this.setState({loading:true})
    //      console.log(date)

    //  console.log(date)

    let currentDate = date;
    // console.log(currentDate)

    let setCurrentdate = moment(currentDate).format('YY-MM-DD');
    console.log(setCurrentdate);
    //console.log(setCurrentdate)
    setDate(setCurrentdate);

    var form = new FormData();
    form.append('api_token', token);
    form.append('date', setCurrentdate);

    fetch(TOPUP_HISTORY_SEARCH, {
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
        if (data.status === 'success') {
          //     console.log(data.status)

          setHistory(data.data);

          setError(false);
          //  console.log(Error)
        } else if (data.status === 'failure') {
          // console.log(data.status)
          setHistory([]);

          setError(true);
        }
      })
      .catch((e) => console.log(e));
  };





  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      
  
      topupHistorylist()
  
  //console.log("e")
  
  
    });
  }, [refreshing])
  



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

            <Image source={require('../../images/Logo.png')}   style={global.headLogo} resizeMode="contain"/>

            <Text></Text>
          </View>

          <View style={global.common_header_layer2}>
            <View>
              <Text style={global.common_Title}>Transaction History</Text>
            </View>
          </View>

          <View style={global.common_header2_btn_wrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('TransactionHistory')}>
              <View style={global.common_btn_box}>
                <Image
                  source={require('../../images/Coinyellow_icon.png')}
                  style={{width: 18, height: 18}}
                />
                <Text style={global.btnText}>Payment</Text>
              </View>
            </TouchableOpacity>

            <View style={global.white_Btn}>
              <Image
                source={require('../../images/Wallet_yellow_icon.png')}
                style={{width: 18, height: 18}}
              />
              <Text style={global.btnText_white}>Top-Up</Text>
            </View>
          </View>
        </View>
  

      {/* <View style={global.common_wrapper}>
      <TouchableOpacity onPress={()=>showDatePicker()}>
            <View style={global.reportCalendersec}>
              <Text>{getDate} </Text>

              <Image
                source={require('../../images/Iconly-Bold-Calendar.png')}
                style={global.downArrow}
              />
            </View>
          </TouchableOpacity>


          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={(date)=>handleConfirm(date)}
            onCancel={()=>hideDatePicker()}
            headerTextIOS="Pick a Date"
          />
</View> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 30,
          paddingBottom: 60,
        }}
        

        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        
        
        
        
        >
        <Animatable.View animation="fadeInUp">
          <View>
            {Error ? (
              <View style={global.EmptyListbox}>
                <Text style={global.emptyBoxtext}>No Top-Up yet.</Text>
              </View>
            ) : (
              <View>
                {history.map((e) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Topupdetail', {
                          transactionID: e.id,
                          paymentID: e.id,
                          status: e.status,
                        })
                      }
                      key={e.paymentID}>
                      <View style={global.activityLists}>
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
                          {e.status === 2 || e.day_end_status ==1 ? (
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

                        <View   style={global.activityList_wrap2}>
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
              style={{width: 18, height: 18 ,tintColor:"#C7451F"}}
            />
            <Text style={global.Active_menu}>History</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Actionsheet')}>
          <View  style={global.tabbarMenuwidth}>
            <View style={global.circleMenu_layer1}>
              <View style={global.circleMenu_layer2}>
                <Image source={require('../../images/Iconly-Bold-Scan.png')} />
              </View>
            </View>
            <Text style={global.Menu_Center}>Transaction</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View  style={global.tabbarMenuwidth}>
            <Image
              source={require('../../images/drawerIcon1.png')}
              style={{width: 17, height: 17}}
            />
            <Text style={global.MenuName}>Profile</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={global.tabbarMenuwidth} onPress={()=>navigation.navigate('Summary')}>
          <View style={global.tabbarMenuwidth}>
            <Image
              source={require('../../images/logout.png')}
              style={{width: 18, height: 18}}
            />
            <Text style={global.MenuName}>Day End</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View>{loading ? <ActivityLoader /> : <View></View>}</View>

      <View>
        <Modal animationType="slide" transparent={true} visible={modalVisible1}>
          <TouchableOpacity
            onPress={() => setModalVisible1(false)}
            style={global.popupBg1}>
            <View>
              <View style={global.popupBox1}>
                <Text style={global.popup_Title1}>
                  Are you sure want to cancel Top-Up ?
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
