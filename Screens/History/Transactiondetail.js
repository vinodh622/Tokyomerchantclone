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
} from 'react-native';
import {global} from '../../Styles/global';
import {VIEW_PAYMENT} from '.././API/Api';
import moment from 'moment';
import ActivityLoader from '../ActivityLoader/ActivityLoader';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getPaymentId} from '../../actions/CancelPayment';

export default function Transactiondetail({route, navigation}) {
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [paymentDetails, setPaymantdetails] = useState({});
  const [loader, setLoader] = useState(true);

  const dispatch = useDispatch();

  const {transactionID, paymentID, status} = route.params;


const transactionDetail = () =>{

  var form = new FormData();
    form.append('transactionid', transactionID);

    fetch(VIEW_PAYMENT, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
   
          setLoader(false);

          setPaymantdetails(data.data);
        
      })
      .catch((e) => {
        setLoader(false);
        console.log(e);
      });




}



  useEffect(() => {
    
    const unsubscribe = navigation.addListener('focus', () => {
      setLoader(true)
   //   setreservationName('today')



   transactionDetail()
   





     
    });
  


    return () => {
      unsubscribe
    };
  }, [   ]);



  const openPinmodel = () => {
    setModalVisible1(false);

    navigation.navigate('CustomPinModal');
  };

  const buttonSegment = () => {
    if (paymentDetails.status === 2) {
      return (
        <View style={global.LargeBtn_cancelled}>
          <Text style={global.LargeBtn_cancelledText}>
            Transaction Cancelled
          </Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => cancelPayment_Id(paymentID)}>
          <View style={global.LargeBtn1}>
            <Text style={global.btnwhite_Text}> Cancel Transaction</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const cancelPayment_Id = async (id) => {
    await dispatch(getPaymentId(id))
      .then(() => {
        setModalVisible1(true);
      })
      .then(() => {});
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
            ? global.nohead_wrapper
            : global.nohead_wrapper_IOS
        }>
        <View style={{paddingBottom: 20}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../images/yellowBackarrow.png')} />
          </TouchableOpacity>
        </View>

        <View style={global.flextitleSec}>
          <Text style={global.common_Title}>Transaction Detail</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{paddingHorizontal: 15}}>
        <View style={global.activitydetailbox}>
          <View style={{marginBottom: 20}}>
            <Text>Payment ID:{paymentDetails.paymentID}</Text>

            <Text style={global.Paymentdt_Amount}>
              MYR {(Math.round(paymentDetails.amount * 100) / 100).toFixed(2)}
            </Text>

            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../images/coin.png')}
                style={{marginRight: 7}}
              />
              <Text style={global.pay_dt_bold_Md}>
                {paymentDetails.point} Points Earned
              </Text>
            </View>
          </View>

          <View style={global.Transaction_lists}>
            <Text style={global.tr_list_label}>Customer Name: </Text>

            <Text style={global.tr_list_value}>{paymentDetails.username}</Text>
          </View>

          <View style={global.Transaction_lists}>
            <Text style={global.tr_list_label}>Customer Phone Number: </Text>

            <Text style={global.tr_list_value}>
              {' '}
              {paymentDetails.phone} {}
            </Text>
          </View>

          <View style={global.Transaction_lists}>
            <Text style={global.tr_list_label}>Outlet Name :</Text>

            <Text style={global.tr_list_value}>{paymentDetails.outlet}</Text>
          </View>

          <View style={global.Transaction_lists}>
            <Text style={global.tr_list_label}>Transaction Type: </Text>

            <Text style={global.tr_list_value}>
              {paymentDetails.transaction_type}
            </Text>
          </View>

          <View style={global.Transaction_lists}>
            <Text style={global.tr_list_label}>Date: </Text>

            <Text style={global.tr_list_value}>
              {moment(paymentDetails.date).format('DD-MM-YY')}{' '}
            </Text>
          </View>

          <View style={global.Transaction_lists}>
            <Text style={global.tr_list_label}>Time: </Text>

            <Text style={global.tr_list_value}>
              {moment(paymentDetails.date).format('h:mm a')}{' '}
            </Text>
          </View>
        </View>

        <View style={{marginTop: 20}}>{buttonSegment()}</View>
      </ScrollView>

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

              <TouchableOpacity onPress={() => openPinmodel()}>
                <Text style={global.confirm_proceed}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modalVisible2}>
        <View style={global.BottomModal_Bg}>
          <View style={global.bottomModal}>
            <Text style={global.popup_Title1}>Enter Reason</Text>

            <Text style={global.popup_Title2}>
              Why cancel the transaction ?
            </Text>

            <TextInput style={global.reasonBox} multiline={true} />

            <View style={{marginTop: 50, alignItems: 'center'}}>
              <TouchableOpacity>
                <View style={global.smbutton}>
                  <Text style={global.btnwhite_Text}>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={global.closeIconsec}>
              <TouchableOpacity onPress={() => setModalVisible2(false)}>
                <Image
                  source={require('../../images/closeicon.png')}
                  style={{width: 25, height: 25}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modalVisible3}>
        <View style={global.popupBg}>
          <View style={global.popupBox}>
            <Text style={global.popup_Title1}>Enter PIN</Text>
            <Text style={global.popup_Title2}>To confirm Day End</Text>

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
      </Modal>

      <View>{loader ? <ActivityLoader /> : <Text></Text>}</View>
    </View>
  );
}
