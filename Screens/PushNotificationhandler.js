import React, {useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {
  Platform,
  Alert,
  Modal,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {diffClamp} from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux';
import {summaryAction} from '../actions/summaryAction';

export default PushNotificationhandler = (navigation) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [rmMessage, setRmessage] = useState('');

  const dispatch = useDispatch();

  const getToken = useSelector((state) => state.loginDetails);
  const {token} = getToken;

  useEffect(() => {
    const yu = messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          navigation.navigate('Ordersummary', {
            booking_Id: remoteMessage.data.bookingid,
            checkin_date: remoteMessage.data.checkinDate,
            tableName: remoteMessage.data.tableName,
            qrcode: remoteMessage.data.qrcode,
          });
        } else {
          //
        }
      })
      .catch((e) => console.log(e));

    const unsubscribe1 = messaging().onMessage(async (remoteMessage) => {
      if (Platform.OS === 'ios') {
        Alert.alert(
          remoteMessage.notification.title,
          '',

          [
            {
              text: 'Dismiss',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Tap to view order now',
              onPress: () => {
                navigation.navigate('Ordersummary', {
                  booking_Id: remoteMessage.data.bookingid,
                  checkin_date: remoteMessage.data.checkinDate,
                  tableName: remoteMessage.data.tableName,
                  qrcode: remoteMessage.data.qrcode,
                });
              },
            },
          ],
        );
      }
    });

    const unsubscribe2 = messaging().onNotificationOpenedApp(
      async (remoteMessage) => {
        navigation.navigate('Ordersummary', {
          booking_Id: remoteMessage.data.bookingid,
          checkin_date: remoteMessage.data.checkinDate,
          tableName: remoteMessage.data.tableName,
          qrcode: remoteMessage.data.qrcode,
        });
      },
    );

    PushNotification.configure({
      onNotification: function (notification) {
        if (notification.userInteraction) {
          navigation.navigate('Ordersummary', {
            booking_Id: notification.data.bookingid,
            checkin_date: notification.data.checkinDate,
            tableName: notification.data.tableName,
            qrcode: notification.data.qrcode,
          });

          dispatch(
            summaryAction(
              token,
              notification.data.bookingid,
              notification.data.checkinDate,
              notification.data.tableName,
              notification.data.qrcode,
            ),
          );
        }

        notification.finish(PushNotificationIOS.FetchResult.NoData);
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

    return () => {
      unsubscribe1;
      unsubscribe2;
      yu;
    };
  }, []);
};
