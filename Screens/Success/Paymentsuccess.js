import React from 'react';
import {
  View,
  Text,
  Platform,
  TextInput,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {global} from '../../Styles/global';
import {useSelector} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';



export default function PaymentSuccess({navigation}) {
  const PaymentDt = useSelector((state) => state.paymentData1);
  const {PaymentData} = PaymentDt;

  //console.log(PaymentData)

  return (
    <View
      style={
        Platform.OS === 'android'
          ? global.successBanner
          : global.successBanner_IOS
      }>
      <StatusBar
        backgroundColor="#EFCB38"
        barStyle="dark-content"
        networkActivityIndicatorVisible={true}
      />

      <View style={global.flexpart1}>
        <Animatable.View animation="zoomIn" iterationCount={2}>
          <Image
            source={require('../../images/Tick.png')}
            style={{marginBottom: 20, width: 140, height: 140}}
            resizeMode="contain"
          />
        </Animatable.View>

        <Text style={global.common_Title}>Payment Successful</Text>

        <Text style={global.common_smtitle}>
          Transaction No: {PaymentData.transaction_id}
        </Text>
      </View>

      <View style={global.flexpart2}>
        <View style={global.paymentdt_Section}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingBottom: 20,
            }}>
            <View style={global.activityList_wrap1}>
              <Text
                style={global.pay_merName}
                numberOfLines={1}
                ellipsizeMode="tail">
                {PaymentData.name}{' '}
              </Text>
            

              <Text style={global.pay_mer_amt}>
                MYR {(Math.round(PaymentData.amount * 100) / 100).toFixed(2)}{' '}
              </Text>
            </View>

            <View style={global.activityList_wrap2}>

            <Text style={global.pay_dt_md}>
                Payment Id: {PaymentData.payment_id}
              </Text>
              
              <Text style={global.pay_dt_md}>{moment(PaymentData.date).format('ll').substr(0, 6)} ,  
              {moment(PaymentData.date ).format(
                  'hh:mm a',
                )}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={global.pay_dt_bold}>
              {PaymentData.point} Points Earned
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('TransactionHistory')}>
          <View style={global.LargeBtn1}>
            <Text style={global.btnwhite_Text}>Done</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Lastactivity')}>
          <View style={global.Homebtn}>
            <Text style={global.btnBrown_Text}>Back to Home</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
