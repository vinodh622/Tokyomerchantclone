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




export default function TopupSuccess({navigation}) {
  const getTopUpdetails = useSelector((state) => state.topupDatas);
  const {topupData} = getTopUpdetails;

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

        <Text style={global.common_Title}>Top-up Successful</Text>

        <Text style={global.common_smtitle}>
          Transaction No:{topupData.transaction_id}{' '}
        </Text>
      </View>

      <View style={global.flexpart2}>
        <View style={global.paymentdt_Section}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <View style={global.activityList_wrap1}>
              <Text
                style={global.pay_merName}
                numberOfLines={1}
                ellipsizeMode="tail">
                {' '}
                {topupData.name}
              </Text>

              <Text style={global.pay_dt_bold}>
                MYR {(Math.round(topupData.amount * 100) / 100).toFixed(2)}
              </Text>
            </View>

            <View style={global.activityList_wrap1}>
              <Text style={global.pay_dt_bold_Md}> {topupData.phone}</Text>
            </View>
          </View>

          <View style={global.activityList_wrap2}>
            <Text style={global.pay_dt_topUp}>
              Top-Up ID:{topupData.payment_id}
            </Text>

               <Text style={global.pay_dt_md}>{moment(topupData.date).format('ll').substr(0, 6)} ,  
              {moment(topupData.date ).format(
                  'hh:mm a',
                )}</Text>
          </View>

          <View></View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('TopupHistory')}>
          <View style={global.LargeBtn1}>
            <Text style={global.btnwhite_Text}>Done</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
