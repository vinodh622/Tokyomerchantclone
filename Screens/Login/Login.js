///====== Import Statements ===== //

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Touchable,
  ScrollView,
  Platform,
} from 'react-native';
import {global} from '../../Styles/global';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction} from '../../actions/loginActions';
import {Ltout} from '../../actions/loginActions';
import * as Animatable from 'react-native-animatable';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Formik} from 'formik';
import * as yup from 'yup';
import {purgeStoredState} from 'redux-persist';
import messaging from '@react-native-firebase/messaging';

///====== Import Statements ===== //

//===== ValidationSchema ===== //

const SignupSchema = yup.object({
  merchantid: yup.string().required('Required'),
  password: yup.string().required('Required').min(8, 'It must be 8 Characters'),
});

//===== ValidationSchema ===== //

export default function Login({navigation}) {
  //======== Fuction  ====== //

  //Initail state of app ===== //
  const [loading, setLoading] = useState(false);
  const [splash, setSplash] = useState(true);

  const [deviceToken, setdeviceToken] = useState('');

  const [deviceType, setdeviceType] = useState('');

  //Initail state of app ===== //

  //===Getting Login Details via Store =====//
  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//
  const LoginStatus = useSelector((state) => state.loginDetails);
  const {status, getErrorMesage} = LoginStatus;
  //===Getting Login Details via Store =====//

  useEffect(() => {
    requestUserPermission();
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken(); //<---- Add this
      /// console.log('Authorization status:', authStatus);
    }
  };

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();

    if (fcmToken) {
      setdeviceToken(fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  const notificationValues = {
    tok: deviceToken,
    os: Platform.OS === 'android' ? 'Android' : 'IOS',
  };

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 2000);

    return () => {
      //test
      clearInterval(() => {
        setSplash(true);
        //setSendData(false);
      });
    };
  }, []);

  PushNotification.createChannel(
    {
      channelId: 'driver_app_notification_123', // (required)
      channelName: 'tokyosecret', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    //  (created) => alert(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );

  PushNotification.configure({
    onRegister: function (uniqueData) {
      //  console.log(uniqueData)
      // setdeviceToken(uniqueData.token);
      // setdeviceType(uniqueData.os);
      // // console.log(uniqueData)
    },

    onNotification: function (notification) {
      const {title, body} = notification.data;
      const {data} = notification;

      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: 'driver_app_notification_123', // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
        largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
        largeIconUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
        smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
        bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
        subText: 'This is a subText', // (optional) default: none
        bigPictureUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
        color: 'red', // (optional) default: system default
        priority: 'high', // (optional) set notification priority, default: high
        visibility: 'private', // (optional) set notification visibility, default: private
        ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
        onlyAlertOnce: false,
        /* iOS only properties */
        alertAction: 'view', // (optional) default: view
        category: '', // (optional) default: empty string

        /* iOS and Android properties */
        title: title, // (optional)
        message: body, // (required)
        playSound: true, // (optional) default: true

        soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      });

      notification.finish(PushNotificationIOS.FetchResult.NoData);

      PushNotification.popInitialNotification((notification) => {
        ///   console.log("eee",notification)
      });
    },

    senderID: '945025541582',

    //  senderID:'917569150989',

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,
    requestPermissions: true,
  });

  // const notificationValues = {
  //   tok: deviceToken,
  //   os: deviceType,
  // };
  //console.log(notificationValues)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      enabled={true}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {splash ? (
          <View style={global.splashScreenwrapper}>
            <ActivityIndicator size={70} color="#EFCB38" />
          </View>
        ) : (
          <View style={global.commonFlex}>
            <StatusBar
              backgroundColor="#EFCB38"
              barStyle="dark-content"
              networkActivityIndicatorVisible={true}
            />

            <View style={global.loginsec1}>
              <Animatable.View animation="fadeInUp">
                <Image
                  source={require('../../images/Logo_Big1.png')}
                  resizeMode="contain"
                  style={{width: 90, height: 90}}
                />
              </Animatable.View>
            </View>

            <View style={global.loginsec2}>
              <Text style={global.LtTitle}>Hello,Merchant</Text>

              <View style={global.loginForm}>
                <Formik
                  initialValues={{
                    merchantid: '',
                    password: '',
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={async (values) => {
                    // console.log(values)
                    setLoading(true);
                    dispatch(Ltout(purgeStoredState));
                    await dispatch(
                      loginAction(values, notificationValues),
                    ).then(() => {
                      setLoading(false);
                    });
                  }}>
                  {(props) => (
                    <View>
                      <View>
                        <View style={global.flexForm}>
                          <TextInput
                            style={global.ltTextinput}
                            placeholder="Merchant ID"
                            placeholderTextColor="#957C1F"
                            onChangeText={props.handleChange('merchantid')}
                            value={props.values.merchantid}
                          />
                          <Image
                            source={require('../../images/userIcon.png')}
                            style={{width: 14, height: 14}}
                          />
                        </View>

                        <Text style={global.errorMsg}>
                          {props.touched.merchantid && props.errors.merchantid}
                        </Text>
                      </View>

                      <View>
                        <View style={global.flexForm}>
                          <TextInput
                            style={global.ltTextinput}
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor="#957C1F"
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}
                          />
                          <Image
                            source={require('../../images/lock.png')}
                            style={{width: 16, height: 16}}
                          />
                        </View>
                        <Text style={global.errorMsg}>
                          {props.touched.password && props.errors.password}
                        </Text>
                      </View>

                      <View style={global.loginButtonsec}>
                        <TouchableOpacity onPress={props.handleSubmit}>
                          <View style={global.loginButton}>
                            <Text style={global.btnText}>Log In</Text>
                            <Text style={{marginLeft: 20}}>
                              {loading ? (
                                <ActivityIndicator
                                  size="small"
                                  color="#F8DB65"
                                />
                              ) : (
                                ''
                              )}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </Formik>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: -90,
                  right: 0,
                  left: 0,
                }}>
                {/* <Animatable.View animation="zoomInUp">
                <Image
                  source={require('../../images/Logo_Big1.png')}
                  resizeMode="contain"
                  style={{width: 160, height: 180}}
                />
              </Animatable.View> */}
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Text>
                  {status === 'failure' ? (
                    <View>
                      <Text
                        style={{
                          backgroundColor: 'red',
                          marginTop: 40,
                          width: 300,
                          padding: 13,
                          color: '#fff',
                          fontFamily: 'Helvetica-Bold',
                          textAlign: 'center',
                        }}>
                        {getErrorMesage}
                      </Text>
                    </View>
                  ) : (
                    ''
                  )}
                </Text>
              </View>
            </View>
          </View>
        )}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
