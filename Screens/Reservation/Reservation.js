import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  ImageBackground,
  Alert,
  ScrollView, RefreshControl
} from 'react-native';
import {global} from '../../Styles/global';

import {Ltout} from '../../actions/loginActions';
import {useDispatch, useSelector} from 'react-redux';
import {RESERVATION_HISTORY} from '.././API/Api';
import ActivityLoader from '../ActivityLoader/ActivityLoader';
import moment from 'moment';


const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function Reservation({navigation,}) {
  const [reservationTypes, setReservationTypes] = useState([
    {
      id: 1,
      name: 'today',
    },

    {
      id: 2,
      name: 'upcoming',
    },

    {
      id: 3,
      name: 'cancel',
    },
  ]);

  const dispatch = useDispatch();

  const [reservationName, setreservationName] = useState('today');

  const getToken = useSelector((state) => state.loginDetails);

  const {token} = getToken;

  const [reservationHistory, setreservationHistory] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);



  const reservationLists = (name) =>{

    


    
   

      var form = new FormData();
      form.append('api_token', token);
      form.append('type', name);
  
      fetch(RESERVATION_HISTORY, {
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
       setLoader(false);
            if (data.status === 'success') {
             
              
              setError(false);
              setreservationHistory(data.data);
             // setRefreshing(false)
  
            
            } else if (data.status === 'failure') {
              
              setreservationHistory([]);
  
              setError(true);
              //setRefreshing(false)
            }
          
  
          // console.log(data)
        })
        .catch((e) => console.log(e));

      

    
    

  }

 
  React.useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      setLoader(true)

      setreservationName('today')
      

      reservationLists(reservationName)





     
    });
  
  
     
     
  
  
  
    return  ()=>{
  unsubscribe
    };
  
  }, [  ]);








  const getReservationtype = (name) => {
    setreservationName(name);
    //console.log(name)

    setLoader(true);

    var form = new FormData();
    form.append('api_token', token);
    form.append('type', name);

    fetch(RESERVATION_HISTORY, {
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
        setLoader(false);
        if (data.status === 'success') {
          
          //  console.log(data.status)
          setError(false);
          setreservationHistory(data.data);

          //  console.log(Error)
        } else if (data.status === 'failure') {
         
          setreservationHistory([  ]);

          setError(true);
        }
      })
      .catch((e) => console.log(e));
  };

 

  


const   onRefresh = () => {
    
  setRefreshing(true)

    wait(1000)
      .then(() => {
        if (reservationName === "today") {

          reservationLists()

        } else if(reservationName === "upcoming" || reservationName === "cancel") {
          getReservationtype(reservationName)
        }

        //this.listCategory();
      })
      .then(() => {
        setRefreshing(false)
      });
  };




  
  

  return (
    <View style={global.innerpageContainer}>
      <StatusBar backgroundColor="#F1D049" barStyle="dark-content" />


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
              <Text style={global.common_Title}>Reservation</Text>
            </View>
          </View>

          {/* <View style={global.common_header2_btn_wrapper}>
            <TouchableOpacity>
              <View style={global.white_Btn}>
                <Image
                  source={require('../../images/ios-list.png')}
                
                />

                <Text style={global.btnText_white}>List</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={global.common_btn_box}>
              <Image
                  source={require('../../images/add.png')}
                
                />

                <Text style={global.btnText}>New</Text>
              </View>
            </TouchableOpacity>
          </View> */}
        </View>


      <View style={global.common_wrapper}>
        <View style={global.reservationLists}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {reservationTypes.map((e) => {
              return (
                <View key={e.id}>
                  <TouchableOpacity onPress={() => getReservationtype(e.name)}>
                    <View
                      style={
                        e.name === reservationName
                          ? global.listsBox_Active
                          : global.listsBox_Inactive
                      }>
                      <Text
                        style={
                          e.name === reservationName
                            ? global.active_ListText
                            : global.inactive_Liststext
                        }>
                        {e.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{paddingHorizontal: 15, paddingBottom: 40}}
        
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        
        
        
        
        >
        {error ? (
          <View style={global.EmptyListbox}>
            <Text style={global.emptyBoxtext}>No Activity yet.</Text>
          </View>
        ) : (
          <View>
            {reservationHistory.map((e) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ReservationDetail', {
                      reservationid: e.id,
                    })
                  }
                  key={e.id}>
                  <View style={global.activityLists}>

<View style={{flexDirection:"row" ,justifyContent:"space-between"}}>
                    <View>
                      <Text style={global.listWrapper1}>
                        {moment(e.date).format('ll').substr(0, 6)}
                      </Text>

                      <Text style={global.listWrapper1}>
                        {moment(e.created_at).format('h:mm a')}
                      </Text>
                      
                    </View>

                    <View>
                    <Text  style={global.outlet_Text}
                        numberOfLines={1}
                        ellipsizeMode="tail"> {e.name}</Text>

                      <Text style={global.listWrapper2}> {e.phone}</Text>


                    </View>

                    <View>
                      <Text
                        style={global.outlet_Text}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {' '}
                        {e.outlet}
                      </Text>

                      <Text style={global.listWrapper2}>
                        Created {moment(e.date).format('ll').substr(0, 6)}
                      </Text>

                    </View>

                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
            
          </View>
        )}
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
              source={require('../../images/tableicon.png')}
              style={{width:18 ,height:18}}
            />
            <Text style={global.MenuName}>Table</Text>
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

        <TouchableOpacity>
        <View style={global.tabbarMenuwidth}>
            <Image
              source={require('../../images/calendar-Focused.png')}
              style={{width: 18, height: 18}}
            />
            <Text style={global.Active_menu}>Reservation</Text>
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

      <View>{loader ?<ActivityLoader />:<View></View>}</View>
    </View>
  );
}
