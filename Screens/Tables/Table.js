import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import {global} from '../../Styles/global';
import * as Animatable from 'react-native-animatable';
import {TABLE_LIST, CHECK_IN, CONFIRM_CHECKOUT} from '.././API/Api';

import {useSelector, useDispatch} from 'react-redux';
import ActivityLoader from '../ActivityLoader/ActivityLoader';
import moment from 'moment';
import Toast from 'react-native-simple-toast';

import {tablelistAction} from '../../actions/tablelistAction';


import Pushuserinteraction from '../Pushuserinteraction'



const Pulse = require('react-native-pulse');


const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function Table({navigation}) {
  const [tableList, settableList] = useState([]);

  const [loader, setLoader] = useState(true);

  const [modalvisibe1, setmodalvisibe1] = useState(false);

  const [modalvisibe2, setmodalvisibe2] = useState(false);
  const [modalvisibe3, setmodalvisibe3] = useState(false);
  const [modalvisibe4, setmodalvisibe4] = useState(false);
  const [activityLoader, setactivityLoader] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [checkinId, setcheckinId] = useState('');

  const [bookingId, setbookingId] = useState('');

  const [search, setsearch] = useState('');

  const [Error, setError] = useState(false);
  const [tableName, setTablename] = useState('');

  const getToken = useSelector((state) => state.loginDetails);
  const {token} = getToken;
 

  const getTablelist = useSelector((state) => state.tablelistReducer);
  const {tableData, status} = getTablelist;

  //console.log(tableData)

  const updateSearch = tableList.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()),
  );

  const dispatch = useDispatch();

  // const fetchTable = async (token) => {
  //   await dispatch(tablelistAction(token)).then(() => {
  //     setLoader(false);
  //     if (status === 'success') {
  //       setError(false);

  //       setRefreshing(false);

  //       settableList(tableData);
  //     } else if (status === 'failure') {
  //       setError(true);

  //       setRefreshing(false);
  //       settableList([]);
  //     }
  //   });
  // };






const fetchTable =()=>{
  var form = new FormData();
    form.append('api_token', token);

    fetch(TABLE_LIST, {
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
        if (data.status === 'success') {
          setError(false);

          settableList(data.data);
        } else if (data.status === 'failure') {
          setError(true);

          settableList([]);
        }
      })
      .catch((e) => console.log(e));
}

const userInteraction= Pushuserinteraction(navigation)



React.useEffect(() => {

  userInteraction;

  const unsubscribe = navigation.addListener('focus', () => {
setLoader(true)
    fetchTable()
   
  });


   
   



  return  ()=>{
unsubscribe
  };

}, [  ]);

 






  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000)
      .then(() => {

        fetchTable();

    setRefreshing(false)
      })
      .catch((e) => console.log(e));
  }, [refreshing]);

  const checkIn = (id, getTablename) => {
    setcheckinId(id);
    setTablename(getTablename);

    setmodalvisibe1(true);
  };

  const confirmCheckin = () => {
    setactivityLoader(true);

    var form = new FormData();

    form.append('api_token', token);
    form.append('tableid', checkinId);

    fetch(CHECK_IN, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())

      .then((data) => {
      
        if (data.status === 'success') {
          Toast.show(data.data);
          setmodalvisibe1(false);
          setactivityLoader(false);

        fetchTable()

        } else if (data.status === 'failure') {
          Toast.show(data.data);
          setmodalvisibe1(false);
          setactivityLoader(false);
        }
      })
      .catch((e) => console.log(e));
  };

  const checkOut = (bookinId, tableId, getTablename) => {

    setTablename(getTablename);
    setbookingId(bookinId);
    setcheckinId(tableId);
    setmodalvisibe4(true);


  };

  const openSummary = (bookingid, checkin_date, qrcode, name) => {
    if (bookingid === '') {
      Alert.alert(
        'Please check-in your table.',

        '',
        [{text: 'OK'}],
        {cancelable: false},
      );
    } else {
      navigation.navigate('Ordersummary', {
        booking_Id: bookingid,
        checkin_date: checkin_date,
        qrcode: qrcode,
        tableName: name,
      });
    }
  };

  const confirmCheckout = () => {
    setactivityLoader(true);

    var form = new FormData();

    form.append('api_token', token);
    form.append('bookingid', bookingId);

    fetch(CONFIRM_CHECKOUT, {
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
        if (data.status === 'failure') {
          //  Toast.show(data.data);
          setactivityLoader(false);
          setmodalvisibe4(false);
          setmodalvisibe2(true);
        } else if (data.status === 'success') {
          Toast.show(data.data);
           fetchTable ()
          setactivityLoader(false);
          setmodalvisibe4(false);
        }
      })
      .catch((e) => console.log(e));
  };

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
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={require('../../images/HamburgerMenu.png')} />
          </TouchableOpacity>
          <Image source={require('../../images/Logo.png')} style={global.headLogo} />

          <Text></Text>
        </View>

        <View style={global.common_header_layer2}>
          <View>
            <Text style={global.common_Title}>Tables</Text>
          </View>
        </View>

        <View style={global.common_header2_btn_wrapper}>
          <View style={global.searchBox}>
            <Image
              source={require('../../images/searchIcon.png')}
              style={{width: 20, height: 20}}
            />

            <TextInput
              placeholder="Search  by table number"
              placeholderTextColor="#BCBCBC"
              style={{width: '100%', height: 40, paddingLeft: 15}}
              onChangeText={(e) => setsearch(e)}
            />
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 30,
          paddingBottom: 60,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Animatable.View animation="fadeInUp">
          <View>
            {loader ? (
              <ActivityLoader />
            ) : (
              <View>
                {Error ? (
                  <View style={global.EmptyListbox}>
                    <Text style={global.emptyBoxtext}>No Products Found.</Text>
                  </View>
                ) : (
                  <View>
                    {updateSearch.length > 0 ? (
                      updateSearch.map((e) => {
                        return (
                          <TouchableOpacity
                            key={e.id}
                            onPress={() =>
                              openSummary(
                                e.bookingid,
                                e.checkin_date,
                                e.qrcode,
                                e.name,
                              )
                            }>
                            <View style={global.tableBox}>

<View style={{position:"absolute" ,right:0 ,top:0}}>
  
 { e.webstatus===null || e.webstatus.status!==2 ?   null  :
<View style={{width:10 ,height:10 ,backgroundColor:"red" ,borderRadius:50 }}>


</View>}

</View>



                              <View style={global.menuBox_col2}>
                                <Text
                                  style={global.Bold_Text}
                                  numberOfLines={1}
                                  ellipsizeMode="tail">
                                  {e.name}
                                </Text>

                                <Text
                                  style={global.greyText}
                                  numberOfLines={1}
                                  ellipsizeMode="tail">
                                  Check In Time:{' '}
                                  {e.checkin_date === '0000-00-00 00:00:00'
                                    ? '00:00'
                                    : moment(e.checkin_date).format('h:mm a')}
                                </Text>
                              </View>

                              <View style={global.menuBox_col3}>
                                {e.status === '' ? (
                                  <TouchableOpacity
                                    onPress={() => checkIn(e.id, e.name)}>
                                    <View style={global.Tablecheckin_Btn}>
                                      <Text style={global.whiteText}>
                                        Check In
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                ) : (
                                  <TouchableOpacity
                                    onPress={() =>
                                      checkOut(e.bookingid, e.id, e.name)
                                    }>
                                    <View style={global.Tablecheckout_Btn}>
                                      <Text style={global.brownText_btn}>
                                        Check Out
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                )}

                                <Text style={global.greyText}>00:00</Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      })
                    ) : (
                      <View style={global.EmptyListbox}>
                        <Text style={global.emptyBoxtext}>
                          No Tables Found.
                        </Text>
                      </View>
                    )}
                  </View>
                )}
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
              source={require('../../images/tableiconActive.png')}
              style={{width: 18, height: 18}}
            />
            <Text style={global.Active_menu}>Table</Text>
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

        <TouchableOpacity onPress={() => navigation.navigate('Reservation')}>
          <View style={global.tabbarMenuwidth}>
            <Image
              source={require('../../images/calendar.png')}
              style={{width: 18, height: 18}}
            />
            <Text style={global.MenuName}>Reservation</Text>
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

      <Modal animationType="none" transparent={true} visible={modalvisibe1}>
        <View style={global.popupBg1}>
          <View style={global.popupBox1}>
            <Text style={global.popup_Title1}>Check in Table {tableName}</Text>
            <Text style={global.popup_Title2}>
              Confirm Check in for Table {tableName}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 40,
              }}>
              <TouchableOpacity onPress={() => setmodalvisibe1(false)}>
                <View style={global.confirm_btncancel}>
                  <Text style={global.white_Btn_Text}>No</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => confirmCheckin()}>
                <View style={global.confirm_proceed}>
                  <Text style={global.whiteText}>Yes</Text>
                  {activityLoader ? (
                    <ActivityIndicator
                      size="small"
                      color="#F1D049"
                      style={{marginLeft: 10}}
                    />
                  ) : (
                    <View></View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="none" transparent={true} visible={modalvisibe2}>
        <View style={global.popupBg1}>
          <View style={global.popupBox1}>
            <Text style={global.popup_Title1}>
              Cannot Checkout {tableName}{' '}
            </Text>
            <Text style={global.popup_Title2}>
              There are still unconfirmed orders in the table .Cancel order to
              checkout this table.
            </Text>

            <View
              style={{
                paddingTop: 20,
                width: '100%',
              }}>
              <TouchableOpacity onPress={() => setmodalvisibe2(false)}>
                <View style={global.LargeBtn1}>
                  <Text style={global.whiteText}>Back</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* <Modal animationType="slide" transparent={true} visible={modalvisibe3}>
        <View style={global.popupBg1}>
          <View style={global.popupBox1}>
            <Text style={global.popup_Title1}>
              
            </Text>
            <Text style={global.popup_Title2}>
              
            </Text>
            
            <View
              style={{
                flexDirection: '"row',

                paddingvertical: 40,
                width: '100%',
                paddingHorizontal: 60,
              }}>
              <TouchableOpacity onPress={() => setmodalvisibe3(false)}>
                <View style={global.LargeBtn1}>
                  <Text style={global.whiteText}>Back</Text>
                </View>
              </TouchableOpacity></View>
            
          </View>
        </View>
      </Modal> */}

      <Modal animationType="none" transparent={true} visible={modalvisibe4}>
        <View style={global.popupBg1}>
          <View style={global.popupBox1}>
            <Text style={global.popup_Title1}>
              Confirm Checkout {tableName}
            </Text>
            <Text style={global.popup_Title2}>
              Customer finished eating and ordering
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 40,
              }}>
              <TouchableOpacity onPress={() => setmodalvisibe4(false)}>
                <View style={global.confirm_btncancel}>
                  <Text style={global.white_Btn_Text}>No</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => confirmCheckout()}>
                <View style={global.confirm_proceed}>
                  <Text style={global.whiteText}>Yes</Text>

                  {activityLoader ? (
                    <ActivityIndicator
                      size="small"
                      color="#EFCB38"
                      style={{marginLeft: 10}}
                    />
                  ) : (
                    <View></View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
