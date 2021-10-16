import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import {global} from '../../Styles/global';
import {useSelector} from 'react-redux';

export default function Dayendsuccess({navigation}) {
  const dayEndetails = useSelector((state) => state.Dayendreducer);

  const {getdayendDetails} = dayEndetails;

  ///console.log(getdayendDetails.transactionid);

  return (
    <View style={{flex: 1}}>
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
          <Image
            source={require('../../images/Tick.png')}
            style={{marginBottom: 20, width: 140, height: 140}}
          />

          <Text style={global.common_Title}>Day End Successful d</Text>

          <Text style={global.common_smtitle}>
            Transaction No: {getdayendDetails.transactionid}
          </Text>
        </View>

        <View style={global.flexpart2}>
          <TouchableOpacity onPress={() => navigation.navigate('Summary')}>
            <View style={global.Homebtn}>
              <Text style={global.btnBrown_Text}>Back to Home</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
