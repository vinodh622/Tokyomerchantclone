/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar, Platform,
} from 'react-native';
import Lastactivity from './Screens/Lastactivity/Lastactivity';
import Login from './Screens/Login/Login';
import Summary from './Screens/Summary/Summary';
import Success from './Screens/Success/Success';
import Cancel from './Screens/Cancelpage/Cancel';
import {NavigationContainer} from '@react-navigation/native';
//import Tabnavigation from './Tabnavigation/Tabnavigation';

import Paymentsuccess from './Screens/Success/Paymentsuccess';
import PushNotification from 'react-native-push-notification';

import TopupSuccess from './Screens/Success/TopupSuccess';
import TransactionHistory from './Screens/History/TransactionHistory';
import Transactiondetail from './Screens/History/Transactiondetail';
import Qrscanner from './Screens/QrScanner/Qrscanner';

import Reservation from './Screens/Reservation/Reservation';

import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Actionsheet from './Screens/ActionSheet/Actionsheet';
import Profile from './Screens/Profile/Profile';
import ReservationDetail from './Screens/Reservation/ReservationDetail';
//import Test  from './Screens/Test/Test';

import DayendHistory from './Screens/DayendHistory/DayendHistory';

//import PinModal from './Screens/PinModal/PinModal';
import CustomPinModal from './Screens/CustomModels/CustomPinModal';
import TopupHistory from './Screens/History/TopupHistory';
import TopupCancel from './Screens/History/TopupCancel';
import BottomTab from './Screens/BottomTab/BottomTab';
import {Drawercontent} from './Screens/Drawercontent/Drawercontent';

import Topupdetail from './Screens/History/Topupdetail';

import Successwallet from './Screens/Success/Successwallet';

import Dayendsuccess from './Screens/Summary/Dayendsuccess';

import Menu from './Screens/Menus/Menu';

import Table from './Screens/Tables/Table';
import Ordersummary from './Screens/Tables/Ordersummary';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Buffer} from 'buffer';
global.Buffer = Buffer; // very important
import NetInfo from '@react-native-community/netinfo';
import {TouchableHighlight} from 'react-native-gesture-handler';

import Printer from './Screens/Printer/Printer';
import Settings from './Screens/Settings/Setings';


import PushNotificationhandler from './Screens/PushNotificationhandler'
import Pushuserinteraction from './Screens/Pushuserinteraction'




import  NewModuleButton from './Screens/Printer/NewModuleButton'



const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator
//       tabBarOptions={{
//         activeTintColor: 'red',
//         inactiveTintColor: '#fff',

//         labelStyle: {
//           fontSize: 13,

//           color: '#000',
//           textTransform: 'none',
//         },

//         style: {
//           padding: 10,
//         },
//         tabStyle: {
//           padding: 0,
//         },

//         /// style: { backgroundColor: 'powderblue' },
//       }}  
      
//     tabBar={props => <MyTabBar {...props} />}>



//       <Tab.Screen
//         name="Home"
//         component={Lastactivity}
//         options={{
//           tabBarLabel: ({color, size, focused}) =>
//             focused ? (
//               <Text style={{color: 'red'}}>Home</Text>
//             ) : (
//               <Text>Home</Text>
//             ),

//           tabBarIcon: ({color, size, focused}) =>
//             focused ? <Text>wdw</Text> : <Text>d</Text>,
//         }}
//       />
//       <Tab.Screen name="Table" component={Table} />
//       <Tab.Screen name="Transaction" component={Actionsheet} />

//       <Tab.Screen name="Reservation" component={Reservation} />
//       <Tab.Screen name="Dayend" component={Summary} />
//     </Tab.Navigator>
//   );
// }

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerLists = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Lastactivity"
      drawerContent={(props) => <Drawercontent {...props} />}
      drawerStyle={{width: 320}}>
      <Drawer.Screen name="Lastactivity" component={Lastactivity} />
      <Drawer.Screen name="Table" component={Table} />
      <Drawer.Screen name="Printer" component={Printer} />
  
      <Drawer.Screen name="Reservation" component={Reservation} />

      <Drawer.Screen name="Summary" component={Summary} />

      <Drawer.Screen name="Menu" component={Menu} />

      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="TransactionHistory" component={TransactionHistory} />
      <Drawer.Screen name="DayendHistory" component={DayendHistory} />
      <Drawer.Screen name="TopupHistory" component={TopupHistory} />
      
    </Drawer.Navigator>
  );
};

class App extends Component {
  Netinfosubscribtion = null;

  constructor(props) {
    super(props);

    this.state = {
      connnectionStatus: false,
    };
  }




// PushNotification.configure({
   

//   onNotification: function (notification) {


//     if (notification.userInteraction) {
    
//       navigation.navigate('Ordersummary', {
//          booking_Id: notification.data.bookingid,
//          checkin_date: notification.data.checkinDate,
//          tableName: notification.data.tableName,
//          qrcode: notification.data.qrcode
//       });
//     }

//     notification.finish(PushNotificationIOS.FetchResult.NoData);
//   },

//   senderID: '945025541582',

//   //  senderID:'917569150989',

//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true,
//   },

//   popInitialNotification: true,
//   requestPermissions: true,
// });










  componentDidMount() {
    this.Netinfosubscribtion = NetInfo.addEventListener(
      this.handleConnectioncheck,
    );
  }

  componentWillUnmount() {
    this.Netinfosubscribtion && this.Netinfosubscribtion();
  }

  handleConnectioncheck = (state) => {
    this.setState({connnectionStatus: state.isConnected});
  };










  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#EFCB38" barStyle="dark-content" />

        <NavigationContainer>
          {this.props.merchentToken === null ||
          this.props.statusMessage ==='failure' 
         ? (
            <Login />
          ) : (
            <View style={{flex: 1}}>
              {this.state.connnectionStatus ? (
                <View style={{flex: 1}}>
                  <Stack.Navigator headerMode="none">
                    <Stack.Screen
                      name="DrawerLists"
                      component={ DrawerLists}></Stack.Screen>

                    <Stack.Screen
                      name="Reservation"
                      component={Reservation}></Stack.Screen>

                    <Stack.Screen name="Table" component={Table}></Stack.Screen>

                    <Stack.Screen
                      name="Actionsheet"
                      component={Actionsheet}></Stack.Screen>

                    <Stack.Screen
                      name="CustomPinModal"
                      component={CustomPinModal}></Stack.Screen>

                    <Stack.Screen
                      name="Qrscanner"
                      component={Qrscanner}></Stack.Screen>

                    <Stack.Screen
                      name="Paymentsuccess"
                      component={Paymentsuccess}></Stack.Screen>

                    <Stack.Screen
                      name="Profile"
                      component={Profile}></Stack.Screen>

                    <Stack.Screen
                      name="Success"
                      component={Success}></Stack.Screen>

                    <Stack.Screen
                      name="TopupSuccess"
                      component={TopupSuccess}></Stack.Screen>

                    <Stack.Screen
                      name="TopupHistory"
                      component={TopupHistory}></Stack.Screen>

                    <Stack.Screen
                      name="TopupCancel"
                      component={TopupCancel}></Stack.Screen>

                    <Stack.Screen
                      name="Successwallet"
                      component={Successwallet}></Stack.Screen>

                    <Stack.Screen
                      name="Transactiondetail"
                      component={Transactiondetail}></Stack.Screen>

                    <Stack.Screen
                      name="Topupdetail"
                      component={Topupdetail}></Stack.Screen>

                    <Stack.Screen
                      name="Dayendsuccess"
                      component={Dayendsuccess}></Stack.Screen>
                    <Stack.Screen
                      name="ReservationDetail"
                      component={ReservationDetail}></Stack.Screen>

                  

                    <Stack.Screen
                      name="Ordersummary"
                      component={Ordersummary}></Stack.Screen>

                    <Stack.Screen   
                      name="Summmary"
                      component={Summary}></Stack.Screen>


                    {Platform.OS==="android" ?<Stack.Screen
                      name="Printer"
                      component={Printer}></Stack.Screen>:null}

    <Stack.Screen
                      name="Settings"
                      component={Settings}></Stack.Screen>


<Stack.Screen
                      name="PushNotificationhandler"
                      component={PushNotificationhandler}></Stack.Screen>







                  </Stack.Navigator>
                </View>
              ) : (
                <View style={styles.Connectioncheck}>
                  <View style={styles.wrap1}>
                    <Image
                      source={require('./images/Logo_Big1.png')}
         
                      resizeMode="contain"
                    />
                  </View>

                  <View style={styles.wrap2}>
                    <View style={styles.wrap2Content}>
                      <Text
                        style={{
                          color: '#fff',
                          fontFamily: 'Helvetica-Bold',
                          textAlign: 'center',
                        }}>
                        No Internet Connection...
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          )}
        </NavigationContainer>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  merchentToken: state.loginDetails.token,

  statusMessage: state.loginDetails.status,
  
});
export default connect(mapStateToProps)(App);

const styles = StyleSheet.create({
  Connectioncheck: {flex: 1, backgroundColor: '#EFCB38'},

  wrap1: {
    backgroundColor: '#EFCB38',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  wrap2: {
    backgroundColor: '#EFCB38',
    flex: 1,
    justifyContent: 'flex-end',
    padding: 15,
    marginBottom: 20,
  },

  wrap2Content: {
    flexDirection: 'row',
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
  },
  btn: {
    backgroundColor: '#EFCB38',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 7,
  },
});







// import React from "react";
// import { StyleSheet, Text, View } from "react-native";
// import Header from './Screens/Header/Header';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Header />
//       </View>
//       <View style={styles.childContainer}>
//         <Text style={{ fontSize: 30 }}>I am badass</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#eef",
//     flexDirection: "column"
//   },
//   childContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: 100
//   },
//   header: {
//     backgroundColor: "cyan",
//     width: "100%",
//     height: "15%"
//   }
// });
