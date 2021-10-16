import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Touchable,
  Alert,
  Switch,
  Modal,
  StyleSheet,
  ScrollView,Platform
} from 'react-native';
import {global} from '../../Styles/global';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';
import {LANsetting_action, BLEaction} from '../../actions/Settingsaction';
//import Toast from 'react-native-simple-toast';

function Setings({}) {
  const navigation = useNavigation();

  //-------   Initail State ----- //
  const [ip, onChangeIpaddress] = React.useState('');
  const [portNumber, setportNumber] = React.useState('');
  const [BLE_Name, setBLE_Name] = React.useState('');
  //-------   Initail State ----- //

  //-------   Toggle Switch State ----- //
  const [isEnabled_LAN, setIsEnabled_LAN] = useState(false);
  const toggleSwitch_LAN = () => {
    setIsEnabled_LAN(true);
    setIsEnabled_BLE(false);
    setmodel1(true);
  };

  const [isEnabled_BLE, setIsEnabled_BLE] = useState(false);

  const toggleSwitch_BLE = () => {
    setIsEnabled_LAN(false);
    setIsEnabled_BLE(true);

    setmodel2(true);
  };

  //-------  Toggle Switch State ----- //


  // ---- Enable Model  ----- //

  const [mode1, setmodel1] = useState(false);

  const [mode2, setmodel2] = useState(false);

  const [enabledType1, setenabledType1] = useState(false);

  const [enabledType2, setenabledType2] = useState(false);

  // ---- Enable Model  ----- //




  //-------  Passing Printer Type ----- //

  const [typeLan, settypeLan] = useState(''); /// ===== Pass '1' to LAN device as default value === //
  const [typeBLE, settypeBLE] = useState(''); /// ===== Pass '2' to BLE  device as default value === //

  //-------  Passing Printer Type  ----- //



  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//

  const openLanprinter = (num1) => {
    setmodel1(false);
    setenabledType1(true);
    setIsEnabled_LAN(true);
    settypeBLE('');
    settypeLan(num1);
    setBLE_Name('');
  };

  const openBluettothPrinter = (num2) => {
    setmodel2(false);
    setenabledType2(true);
    settypeLan(' ');
    onChangeIpaddress('');

    setportNumber('');

    settypeBLE(num2);
  };

  const updateSettings = async () => { /// ----------   On submit Set Data to local Db...  -------- //
    try {
      if (typeLan === 1) {
        if (ip === '' || portNumber === '') {
          Alert.alert('Please Enter Your Details.', '', [{text: 'OK'}]);
        } else {
          setBLE_Name('');

          AsyncStorage.removeItem('BLEkey');
          AsyncStorage.removeItem('key2');

          await AsyncStorage.setItem('Ipkey', ip);
          await AsyncStorage.setItem('Portkey', portNumber);
          await AsyncStorage.setItem('key1', JSON.stringify(isEnabled_LAN))

            .then((e) => {
              dispatch(LANsetting_action(ip, portNumber, typeLan));
            })

            .then((e) => {
              Alert.alert('Details Added Successfully.', '', [{text: 'OK'}]);

              setenabledType1(false);
            });
        }
      } else if (typeBLE === 2) {
        if (BLE_Name === '') {
          Alert.alert('Enter Your Device Name', '', [{text: 'OK'}]);
        } else {
          await AsyncStorage.setItem('BLEkey', BLE_Name);
          await AsyncStorage.setItem('key2', JSON.stringify(isEnabled_BLE));

          AsyncStorage.removeItem('Portkey')
          setportNumber('');

         
          AsyncStorage.removeItem('Ipkey');
          onChangeIpaddress('');

          AsyncStorage.removeItem('key1')
          // setIsEnabled_LAN(false);
          // AsyncStorage.removeItem('toggleLAN');
          ///  await AsyncStorage.setItem('key2', isEnabled_BLE);

          
            .then(() => {
              dispatch(BLEaction(BLE_Name, typeBLE));
            })
            .then(() => {
              Alert.alert('Device Added.', '', [{text: 'OK'}]);
              setenabledType2(false);
              //setText2('true');
            });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getdata = async () => { // ======  Get save Data Fom Local Db ======= // 
    try {
      const Ipval = await AsyncStorage.getItem('Ipkey');
      const Portval = await AsyncStorage.getItem('Portkey');
      const BLEtval = await AsyncStorage.getItem('BLEkey');

      const toggleVal1 = await AsyncStorage.getItem('key1');
      const toggleVal2 = await AsyncStorage.getItem('key2');

      // const getText1 = await AsyncStorage.getItem('key1');

      if (Ipval !== null) {
        onChangeIpaddress(Ipval);
      }

      if (Portval !== null) {
        setportNumber(Portval);
      }
      if (BLEtval !== null) {
        setBLE_Name(BLEtval);
      }

      if (toggleVal1 !== null) {
        setIsEnabled_LAN(JSON.parse(toggleVal1));
      }

      if (toggleVal2 !== null) {
        setIsEnabled_BLE(JSON.parse(toggleVal2));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getdata();

    return () => {};
  }, []);

  const closeModel1 = () => {
    setmodel1(false);
    setIsEnabled_LAN(false);
  };

  const closeModel2 = () => {
    setmodel2(false);

    setIsEnabled_BLE(false);
  };

  return (
    <View style={global.innerpageContainer}>
      <StatusBar
        backgroundColor="#F1D049"
        barStyle="dark-content"
        networkActivityIndicatorVisible={true}
      />

      <View
        style={[
          Platform.OS === 'android'
            ? global.common_header1
            : global.common_header1_IOS,
          {
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            paddingBottom: 2,
          },
        ]}>
        <View
          style={[
            global.common_header_layer1,
            {alignItems: 'center', paddingTop: 10},
          ]}>
          <TouchableOpacity onPress={() => navigation.navigate('Lastactivity')}>
            <Image
              source={require('../../images/back.png')}
              style={{width: 24, height: 24, tintColor: '#fff'}}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text style={global.common_Title}>Settings</Text>

          <Text></Text>
        </View>
      </View>

      <View style={{paddingHorizontal: 15}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#D3D3D3',
          }}>
          <Text style={[global.Bold_Text, {color: '#000', fontSize: 16}]}>
            LAN{' '}
          </Text>

          <Switch
            trackColor={{false: '#000', true: '#76543A'}}
            thumbColor={isEnabled_LAN ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#000"
            onValueChange={toggleSwitch_LAN}
            value={isEnabled_LAN}
          />
        </View>

{ Platform.OS==="ios" ?<View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#D3D3D3',
          }}>
          <Text style={[global.Bold_Text, {color: '#000', fontSize: 16}]}>
            BlueTooth{' '}
          </Text>

          <Switch
            trackColor={{false: '#000', true: '#76543A'}}
            thumbColor={isEnabled_BLE ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#000"
            onValueChange={toggleSwitch_BLE}
            value={isEnabled_BLE}
          />
        </View>   : null}


        <View>
          {ip !== '' || portNumber !== '' ? (
            <View style={styles.settingCard}>
              <Text
                style={[global.whiteText, {fontSize: 20, marginBottom: 20}]}>
             SOS
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.label}>Ip-Address:</Text>
                  <Text style={styles.sett_data}>{ip}</Text>

                  <Text></Text>

                  <Text style={styles.label}>Port-Number:</Text>
                  <Text style={[styles.sett_data]} numberOfLines={1}>
                    {portNumber}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: '#fff',
                    padding: 10,
                    borderRadius: 10,
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../images/printericon.png')}
                    style={{tintColor: '#000'}}
                  />
                </View>
              </View>
            </View>
          ) : null}

          {BLE_Name !== '' ? (
            <View style={styles.settingCard}>
              <Text
                style={[global.whiteText, {fontSize: 20, marginBottom: 20}]}>
               SOS
              </Text>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.label}>Device-Name:</Text>
                  <Text
                    style={[styles.sett_data, {width: 170}]}
                    numberOfLines={1}>
                    {BLE_Name}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: '#fff',
                    padding: 10,
                    borderRadius: 10,
                  }}>
                  <Image
                    source={require('../../images/bluetooth.png')}
                    style={{tintColor: '#000'}}
                  />
                </View>
              </View>
            </View>
          ) : null}
        </View>

        {/* 
{text === 'LAN'?
<View style={styles.alertBox}>


<Text style={{textAlign:"center"}}>Tokyo Merchant  is Integrated to  LAN printer</Text> 

</View>
:  
<View style={styles.alertBox}>

  

<Text style={{textAlign:"center"}}>Tokyo Merchant is Integrated to Bluetooth printer</Text>
</View>} */}
      </View>

      <Modal animationType="none" transparent={true} visible={mode1}>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
          onPress={() => closeModel1()}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              backgroundColor: '#00000052',
              justifyContent: 'flex-end',
            }}>
            <View style={styles.bottomsheet}>
              <View>
                <TouchableOpacity onPress={() => openLanprinter(1)}>
                  <View style={styles.sheetButton1}>
                    <Text style={[global.Bold_Text, {textAlign: 'center'}]}>
                      LAN Printer
                    </Text>
                  </View>
                </TouchableOpacity>

                <Text></Text>

                {/* <TouchableOpacity onPress={() => openBluettothPrinter(2)}>
                      <View style={styles.sheetButton2}>
                        <Text style={global.whiteText}>Bluettoth Printer</Text>
                      </View>
                    </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal animationType="none" transparent={true} visible={mode2}>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
          onPress={() => closeModel2()}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              backgroundColor: '#00000052',
              justifyContent: 'flex-end',
            }}>
            <View style={styles.bottomsheet}>
              <View>
                <TouchableOpacity onPress={() => openBluettothPrinter(2)}>
                  <View style={styles.sheetButton2}>
                    <Text style={global.whiteText}>Bluettoth Printer</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal animationType="none" transparent={true} visible={enabledType1}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#00000052',
            paddingHorizontal: 15,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'column',
            }}
            onPress={() => setenabledType1(false)}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <View style={styles.bottomsheet}>
                <View style={styles.fieldBox}>
                  <Text style={styles.boldFont}>Enter Your IP Address</Text>

                  <TextInput
                    style={styles.fieldInput}
                    onChangeText={onChangeIpaddress}
                    placeholder="Enter Ip Address"
                    
                    placeholderTextColor="#000"
                    value={ip}
                  />
                </View>

                <View style={styles.fieldBox}>
                  <Text style={styles.boldFont}>Enter Your Port Number</Text>

                  <TextInput
                    style={styles.fieldInput}
                    onChangeText={setportNumber}
                    placeholder="Enter Port Number"
                   
                    placeholderTextColor="#000"
                    value={portNumber}
                  />
                </View>

                <View style={{marginVertical: 20}}>
                  <TouchableOpacity
                    onPress={() => updateSettings()}
                    style={{
                      backgroundColor: '#76543A',
                      padding: 17,
                      borderRadius: 5,
                    }}>
                    <Text style={{textAlign: 'center', color: '#fff'}}>
                      Update
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      <Modal animationType="none" transparent={true} visible={enabledType2}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#00000052',
            paddingHorizontal: 15,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'column',
            }}
            onPress={() => setenabledType2(false)}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',

                justifyContent: 'center',
              }}>
              <View style={styles.bottomsheet}>
                <View style={styles.fieldBox}>
                  <Text style={styles.boldFont}>Enter Printer Name</Text>

                  <TextInput
                    style={styles.fieldInput}
                    onChangeText={setBLE_Name}
                    placeholder="Enter Printer Name"
                    placeholderTextColor="#000"
                    value={BLE_Name}
                  />
                </View>

                <View style={{marginVertical: 20}}>
                  <TouchableOpacity
                    onPress={() => updateSettings()}
                    style={{
                      backgroundColor: '#76543A',
                      padding: 17,
                      borderRadius: 5,
                    }}>
                    <Text style={{textAlign: 'center', color: '#fff'}}>
                      Update
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomsheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },

  fieldBox: {marginBottom: 15},

  fieldInput: {
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 15,
    marginTop: 10,
   
    borderColor: '#d3d3d3de',

    borderRadius: 5,
  },
  boldFont: {color: '#000', fontSize: 15, fontFamily: 'Helvetica-Bold'},

  sheetButton1: {backgroundColor: '#FFE26B', padding: 15},
  sheetButton2: {backgroundColor: '#76543A', padding: 15},

  alertBox: {
    backgroundColor: '#00000012',
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 10,
  },

  settingCard: {
    backgroundColor: '#76543A',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  label: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'capitalize',
    letterSpacing: 0.7,
    marginBottom: 7,
  },

  sett_data: {color: '#fff', fontWeight: 'bold', fontSize: 16},
});

export default Setings;
