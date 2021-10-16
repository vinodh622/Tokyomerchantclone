import React, {useState, useRef, useEffect} from 'react';
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
  ScrollView,
  Alert,
} from 'react-native';
import {global} from '../../Styles/global';
//import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-simple-toast';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import {Picker} from '@react-native-picker/picker';

import {VIEW_RESERVATION ,RESERVATION_SUB} from '.././API/Api';

import {useDispatch, useSelector} from 'react-redux';

import ActivityLoader from '../ActivityLoader/ActivityLoader';


export default function ReservationDetail({route, navigation}) {
  
  const {reservationid} = route.params;

  //console.log(reservationid)

  const getToken = useSelector((state) => state.loginDetails);

  const {token} = getToken;

  const [reservationDeatils, setReservationdeatils] = useState({


  });
  const [loader, setLoader] = useState(false);

  // const [memberReservepopup, setmemberReservepopup] = useState(false);

  // const [modalVisible1, setModalVisible1] = useState(false);
  // const [modalVisible2, setModalVisible2] = useState(false);
  // const [modalVisible3, setModalVisible3] = useState(false);
  // const [modalVisible4, setModalVisible4] = useState(false);
  // const [modalVisible5, setModalVisible5] = useState(false);
  // const [modalVisible6, setModalVisible6] = useState(false);

  // const [paxModel, setpaxModel] = useState(false);

  // const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  // const [getCurrentdate, setCurrentdate] = useState('Select Date');

  // const [getTime, setTime] = useState('Select Time');

  // const [selectPicker, setSelectpicker] = useState('Select Outlet');

  // const [outletDropdown, setoutletDropdown] = useState(true);

  // const [data, setd] = useState([
  //   {
  //     id: 1,
  //     outlet: 'Subabang',
  //   },
  //   {
  //     id: 2,
  //     outlet: 'Subabang',
  //   },
  //   {
  //     id: 3,
  //     outlet: 'Subabang',
  //   },
  // ]);


  const reservationSummary  = ()=>{

    var form = new FormData();
    form.append('reservationid', reservationid);

    fetch(VIEW_RESERVATION, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
       
        setLoader(false)
          
          setReservationdeatils(data.data);
        
      })
      .catch((e) => {
       
        console.log(e);
      });


  }


  useEffect(() => {
    
    const unsubscribe = navigation.addListener('focus', () => {
      setLoader(true)

      reservationSummary()

     
    });
    

   

    return () => {
      unsubscribe
    };
  }, [  ]);




  // const inputEl = useRef('');

  // const showDatePicker = () => {
  //   setModalVisible4(true);

  //   setDatePickerVisible(true);
  // };

  // const showTimePicker = () => {
  //   setModalVisible6(true);

  //   setDatePickerVisible(true);
  // };

  // const handletimeConfirm = (time) => {
  //   setDatePickerVisible(false);

  //   let Time = time;
  //   let getTime = moment(Time).format('h:mm a');

  //   setTime(getTime);

  //   setModalVisible4(true);
  // };

  // const handleConfirm = (date) => {
  //   setDatePickerVisible(false);

  //   let currentDate = date;
  //   let getcurrentDate = moment(currentDate).format('YY/MM/DD');
  //   //    console.log(getcurrentDate)
  //   setCurrentdate(getcurrentDate);

  //   setModalVisible4(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisible(false);

  //   setModalVisible4(true);
  // };

  // const openOutlet = () => {
  //   setoutletDropdown(!outletDropdown);
  // };



  const confirmReservation = () => {
    setLoader(true);

    var form = new FormData();
    form.append('api_token', token);
    form.append('action', 'approve');
    form.append('reservationid', reservationid);
    fetch(
      RESERVATION_SUB,

      {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }),
        body: form,
      },
    )
      .then((response) => response.json())
      .then((data) => {
        
        setLoader(false);
        Toast.show(data.data);

        reservationSummary()



      })
      .catch((e) => {
        setLoader(false);
        console.log(e);
      });
  };

  const cancelReservation = () => {
    setLoader(true);

   
    var form = new FormData();
    form.append('api_token', token);
    form.append('action', 'cancel');
    form.append('reservationid', reservationid);
    fetch(
      RESERVATION_SUB,

      {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }),
        body: form,
      },
    )
      .then((response) => response.json())
      .then((data) => {
       
        setLoader(false);
        Toast.show(data.data);
        reservationSummary()
      })
      .catch((e) => {
        setLoader(false);
        console.log(e);
      });
  };

  const cancelReservationAlert = () => {
    Alert.alert(
      'Are you sure want to cancel reservation',
      '',
      [
        {
          text: 'No',

          style: 'cancel',
        },
        {text: 'Yes', onPress: () => cancelReservation()},
      ],
      {cancelable: false},
    );
  };

  const completeReservation = () => {
    setLoader(true);

    var form = new FormData();
    form.append('api_token', token);
    form.append('action', 'complete');
    form.append('reservationid', reservationid);
    fetch(
      RESERVATION_SUB,

      {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }),
        body: form,
      },
    )
      .then((response) => response.json())
      .then((data) => {
        setLoader(false);

        reservationSummary()

        Toast.show(data.data);
      })
      .catch((e) => {
        setLoader(false);
        console.log(e);
      });
  };

  const completeReservationAlert = () => {
    Alert.alert(
      'Are you sure want to complete reservation',
      '',
      [
        {
          text: 'No',

          style: 'cancel',
        },
        {text: 'Yes', onPress: () => completeReservation()},
      ],
      {cancelable: false},
    );
  };

  const statusFinder = () => {
    if (reservationDeatils.status === 3) {
      //
    } else if (reservationDeatils.status === 1) {
      return (
        <View style={global.ButtonWrapper}>
          <TouchableOpacity onPress={() => cancelReservationAlert()}>
            <View style={global.white_Btn}>
              <Text style={global.btnText_white}>Cancel</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => confirmReservation()}>
            <View style={global.common_btn_box}>
              <Text style={global.btnText}>Confirm</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (reservationDeatils.status === 2) {
      return (
        <View style={global.ButtonWrapper}>
          <TouchableOpacity onPress={() => cancelReservationAlert()}>
            <View style={global.white_Btn}>
              <Text style={global.btnText_white}>Cancel</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => completeReservationAlert()}>
            <View style={global.common_btn_box}>
              <Text style={global.btnText}>Completed</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (reservationDeatils.status === 4) {
      return (
        <View style={global.singleButtonWrapper}>
          <View style={global.common_btn_box}>
            <Text style={global.btnText}> Reservation has Completed</Text>
          </View>
        </View>
      );
    }
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
          <Text style={global.common_Title}>Reservation Detail</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{paddingHorizontal: 15, paddingBottom: 30}}
        
        
        
        
        
        >
        <View style={global.activitydetailbox}>
          <View style={{marginBottom: 20}}>
            <Text>Booking ID:{reservationDeatils.booking_id}</Text>

            <Text style={global.date_Reservation}>
              On:{' '}
              {moment(reservationDeatils.booking_date).format('MMMM Do YYYY')}
            </Text>

            <View style={{flexDirection: 'row'}}>
              <Text style={global.reservation_Time}>
                {moment(reservationDeatils.booking_time, ['h:mm a']).format(
                  'hh:mm a',
                )}
              </Text>
            </View>
          </View>

          <View style={global.Transaction_lists}>
            <Text style={global.tr_list_label}>Customer Name: </Text>

            <Text style={global.tr_list_value}>
              {reservationDeatils.customer_name}
            </Text>
          </View>

          <View style={global.Transaction_lists}>
            <Text style={global.tr_list_label}>Customer Phone Number: </Text>

            <Text style={global.tr_list_value}>
              {reservationDeatils.customer_phone}
            </Text>
          </View>

          <View style={global.Transaction_lists}>
            <Text style={global.tr_list_label}>Outlet to attend :</Text>

            <Text style={global.tr_list_value} numberOfLines={3}>
              {reservationDeatils.outlet}
            </Text>
          </View>

          <View style={global.Transaction_lists}>
            <Text style={global.tr_list_label}>Created Date: </Text>

            <Text style={global.tr_list_value}>
              {' '}
              {moment(reservationDeatils.created_at).format('MMMM Do YYYY')}
            </Text>
          </View>

          <View style={global.Transaction_lists}>
            <Text style={global.tr_list_label}>Created Time: </Text>

            <Text style={global.tr_list_value}>
              {moment(reservationDeatils.created_at).format('h:mm a')}
            </Text>
          </View>

          <View style={global.Transaction_lists}>
            <Text style={global.tr_list_label}>Created By: </Text>

            <Text style={global.tr_list_value}>
              {reservationDeatils.created_by}
            </Text>
          </View>

          <View style={global.Transaction_lists}>
            <Text style={global.tr_list_label}>Number of Pax: </Text>

            <Text style={global.tr_list_value}>
              {reservationDeatils.adult} Adults ,{reservationDeatils.children}{' '}
              Children
            </Text>
          </View>

          <View style={global.Transaction_lists}>
            <Text style={global.tr_list_label}>Notes: </Text>

            <Text style={global.tr_list_value}>
              {reservationDeatils.description}
            </Text>
          </View>
        </View>
        {statusFinder()}
      </ScrollView>

      {/* 
      <Modal animationType="slide" transparent={true} visible={modalVisible1}>
        <View style={global.popupBg1}>
          <View style={global.popupBox1}>
            <Text style={global.popup_Title1}>Cancel Transaction?</Text>
            <Text style={global.popup_Title2}> The action is irreversible</Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 40,
              }}>
              <TouchableOpacity onPress={() => setModalVisible1(false)}>
                <View>
                  <Text style={global.confirm_btncancel}>No</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={global.confirm_proceed}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}

      {/* <Modal animationType="slide" transparent={true} visible={modalVisible2}>
        <View style={global.BottomModal_Bg}>
          <View style={global.bottomModal}>
            <Text style={global.popup_Title1}>Enter Reason</Text>

            <Text style={global.popup_Title2}>
              Why cancel the transaction ?
            </Text>

            <TextInput style={global.reasonBox} multiline={true} />

            <View style={{marginTop: 50,alignItems:"center"}}>
              <TouchableOpacity>
                <View style={global.smbutton}>
                  <Text style={global.btnwhite_Text}>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={global.closeIconsec}>
              <TouchableOpacity onPress={() => setModalVisible2(false)}>
                <Image source={require('../../images/closeicon.png')} style={{width:25 ,height:25}} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}

      {/* <Modal animationType="slide" transparent={true} visible={modalVisible3}>
          <View style={global.popupBg}>
            <View style={global.popupBox}>
              <Text style={global.popup_Title1}>Enter PIN</Text>
              <Text style={global.popup_Title2}>
                To confirm Day End
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 20,
                }}>
                <TextInput
                  style={global.pinBox}
                  secureTextEntry={true}
                  keyboardType="number-pad"
                />
                <TextInput
                  style={global.pinBox}
                  secureTextEntry={true}
                  keyboardType="number-pad"
                />

                <TextInput
                  style={global.pinBox}
                  secureTextEntry={true}
                  keyboardType="number-pad"
                />

                <TextInput
                  autoFocus={true}
                  style={global.pinBox}
                  secureTextEntry={true}
                  keyboardType="number-pad"
                />
              </View>

              <View style={global.closeIconsec}>
                <TouchableOpacity onPress={() => setModalVisible3(false)}>
                  <Image source={require('../../images/closeicon.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal> */}

      <View></View>

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={memberReservepopup}>
        <View style={global.reservationModels}>
          <View style={global.reservationBox}>
            <Text style={global.popup_Title1}>Enter Mobile No.</Text>
            <Text style={global.popup_Title2}>
              Please enter clients phone number{' '}
            </Text>

            <View style={global.reservationInputbox}>
              <Image
                source={require('../../images/ionic-ios-call.png')}
                style={{width: 20, height: 20, marginRight: 18}}
              />

              <TextInput style={{width: '100%'}} keyboardType="number-pad" />
            </View>

            <TouchableOpacity>
              <View style={global.payment_submit_btn}>
                <Text style={global.btnText}>Next</Text>
              </View>
            </TouchableOpacity>

            <View style={global.closeIconsec}>
              <TouchableOpacity>
                <Image source={require('../../images/closeicon.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modalVisible1}>
        <View style={global.popupBg1}>
          <View style={global.popupBox1}>
            <Text style={global.popup_Title1}>New Member ?</Text>
            <Text style={global.popup_Title2}>
              {' '}
              Does the customer have an existing account?
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 40,
              }}>
              <TouchableOpacity>
                <View style={global.confirm_btncancel}>
                  <Text style={global.white_Btn_Text}>No</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={global.confirm_proceed}>
                  <Text style={global.whiteText}>Yes</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modalVisible2}>
        <View style={global.reservationModels}>
          <View style={global.reservationBox}>
            <Text style={global.popup_Title1}>Enter Display Name</Text>
            <Text style={global.popup_Title2}>
              Reservation will be made under the name
            </Text>

            <View style={global.reservationInputbox}>
              <Image
                source={require('../../images/userIcon.png')}
                style={{width: 18, height: 18, marginRight: 18}}
              />

              <TextInput style={{width: '100%'}} />
            </View>

            <TouchableOpacity>
              <View style={global.payment_submit_btn}>
                <Text style={global.btnText}>Next</Text>
              </View>
            </TouchableOpacity>

            <View style={global.closeIconsec}>
              <TouchableOpacity>
                <Image source={require('../../images/closeicon.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modalVisible3}>
        <View style={global.reservationModels}>
          <View style={global.reservationBox}>
            <View>
              <Text style={global.popup_Title1}>Select Outlet</Text>
              <Text style={global.popup_Title2}>
                Which outlet to reserve on ?
              </Text>
              <TouchableOpacity onPress={() => openOutlet()}>
                <View style={global.reservationInputbox}>
                  <Text>{selectPicker}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text>
              {outletDropdown ? (
                <View style={global.selectOutletbox}>
                  <View style={global.slectoutletHead}>
                    <Text style={global.slectoutletheadText}>
                      Select Outlet{' '}
                    </Text>
                    <Image
                      source={require('../../images/Uparrow.png')}
                      style={{width: 20, height: 20, marginRight: 18}}
                    />
                  </View>

                  <TouchableHighlight
                    underlayColor={'#FFF5CE'}
                    style={global.outletLists}
                    onPress={() => console.log('dw')}>
                    <Text style={global.outletNmae}>Subang</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    underlayColor={'#FFF5CE'}
                    style={global.outletLists}
                    onPress={() => console.log('dw')}>
                    <Text style={global.outletNmae}>Bangi</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    underlayColor={'#FFF5CE'}
                    style={global.outletLists}
                    onPress={() => console.log('dw')}>
                    <Text style={global.outletNmae}>KingJan</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    underlayColor={'#FFF5CE'}
                    style={global.outletLists}
                    onPress={() => console.log('dw')}>
                    <Text style={global.outletNmae}>KingJanasweder</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    underlayColor={'#FFF5CE'}
                    style={global.outletLists}
                    onPress={() => console.log('dw')}>
                    <Text style={global.outletNmae}>KingJandf</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    underlayColor={'#FFF5CE'}
                    style={global.outletLists}
                    onPress={() => console.log('dw')}>
                    <Text style={global.outletNmae}>
                      KingJandfdwdwdwdwdwdwdw
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor={'#FFF5CE'}
                    style={global.outletLists}
                    onPress={() => console.log('dw')}>
                    <Text style={global.outletNmae}>
                      KingJandfdwdwdwdwdwdwdw
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor={'#FFF5CE'}
                    style={global.outletLists}
                    onPress={() => console.log('dw')}>
                    <Text style={global.outletNmae}>
                      KingJandfdwdwdwdwdwdwdw
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor={'#FFF5CE'}
                    style={global.outletLists}
                    onPress={() => console.log('dw')}>
                    <Text style={global.outletNmae}>
                      KingJandfdwdwdwdwdwdwdw
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor={'#FFF5CE'}
                    style={global.outletLists}
                    onPress={() => console.log('dw')}>
                    <Text style={global.outletNmae}>
                      KingJandfdwdwdwdwdwdwdw
                    </Text>
                  </TouchableHighlight>
                </View>
              ) : (
                ''
              )}
            </Text>

            <View>
              <TouchableOpacity>
                <View style={global.payment_submit_btn}>
                  <Text style={global.btnText}>Next</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={global.closeIconsec}>
              <TouchableOpacity>
                <Image source={require('../../images/closeicon.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modalVisible4}>
        <View style={global.reservationModels}>
          <View style={global.reservationBox}>
            <View>
              <Text style={global.popup_Title1}>Select Date</Text>
              <Text style={global.popup_Title2}>Date of event ?</Text>

              <TouchableOpacity onPress={() => showDatePicker()}>
                <View style={global.reservationInputbox}>
                  <Text>{getCurrentdate}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity>
                <View style={global.payment_submit_btn}>
                  <Text style={global.btnText}>Next</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={global.closeIconsec}>
              <TouchableOpacity>
                <Image source={require('../../images/closeicon.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          headerTextIOS="Pick a Date"
        />
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modalVisible5}>
        <View style={global.reservationModels}>
          <View style={global.reservationBox}>
            <View>
              <Text style={global.popup_Title1}>Any additional notes? </Text>
              <Text style={global.popup_Title2}>Any special request?</Text>

              <View style={global.reservationInputbox}>
                <TextInput
                  style={{width: '100%'}}
                  numberOfLines={10}
                  multiline={true}
                />
              </View>
            </View>

            <View>
              <TouchableOpacity>
                <View style={global.payment_submit_btn}>
                  <Text style={global.btnText}>Confirm</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={global.closeIconsec}>
              <TouchableOpacity>
                <Image source={require('../../images/closeicon.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modalVisible6}>
        <View style={global.reservationModels}>
          <View style={global.reservationBox}>
            <View>
              <Text style={global.popup_Title1}>Select Time </Text>
              <Text style={global.popup_Title2}>Time of Event?</Text>

              <TouchableOpacity onPress={() => showTimePicker()}>
                <View style={global.reservationInputbox}>
                  <Text>{getTime}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity>
                <View style={global.payment_submit_btn}>
                  <Text style={global.btnText}>Next</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={global.closeIconsec}>
              <TouchableOpacity>
                <Image source={require('../../images/closeicon.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handletimeConfirm}
          onCancel={hideDatePicker}
          headerTextIOS="Pick a Time"
        />
      </Modal>

      <Modal animationType="slide" transparent={true} visible={paxModel}>
        <View style={global.BottomModal_Bg}>
          <View style={global.bottomModal}>
            <View style={global.closeIconsec}>
              <TouchableOpacity onPress={() => setpaxModel(false)}>
                <Image
                  source={require('../../images/closeicon.png')}
                  style={{width: 25, height: 25}}
                />
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={global.popup_Title1}>Number of PAX</Text>

              <Text style={global.popup_Title2}>
                How many Adults and Children?
              </Text>

              <View style={global.PAX_counterSection}>
                <Text style={global.pax_Title}>Adults</Text>

                <View style={global.counterBox}>
                  <TouchableOpacity style={global.pax_Counters}>
                    <Text style={global.countIcons}>-</Text>
                  </TouchableOpacity>

                  <Text style={global.paxCount}>01</Text>

                  <TouchableOpacity style={global.pax_Counters}>
                    <Text style={global.countIcons}>+</Text>
                  </TouchableOpacity>
                </View>

                <Text style={global.pax_Title}>Children</Text>

                <View style={global.counterBox}>
                  <TouchableOpacity style={global.pax_Counters}>
                    <Text style={global.countIcons}>-</Text>
                  </TouchableOpacity>

                  <Text style={global.paxCount}>07</Text>

                  <TouchableOpacity style={global.pax_Counters}>
                    <Text style={global.countIcons}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{marginTop: 50, alignItems: 'center'}}>
                <TouchableOpacity>
                  <View style={global.smbutton}>
                    <Text style={global.btnwhite_Text}>Next</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal> */}

      <View>{loader ?<ActivityLoader />:<View></View>}</View>
    </View>
  );
}
