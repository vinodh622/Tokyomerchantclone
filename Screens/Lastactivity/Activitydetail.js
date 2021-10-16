import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight, Platform,
  Modal,
} from 'react-native';
import {global} from '../../Styles/global';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Activitydetail() {
  // ===== Initial state of App ====== //

  const [modalVisible, setModalVisible] = useState(false);

  const [modalVisible2, setModalVisible2] = useState(false);

  const [modalVisible3, setModalVisible3] = useState(false);

  // ===== Initial state of App ====== //

  return (
    <View style={global.innerpageContainer}>
   

    <StatusBar backgroundColor="#EFCB38" barStyle="dark-content" networkActivityIndicatorVisible={true} />

    <View >
      <View style={ Platform.OS==='android'?global.common_header2 :global.common_header2IOS}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <View style={global.common_header_bg_image}>
            <Image
              source={require('../../images/AdvSearch2-7263.jpg')}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="cover"
            />
          </View>

          <View>
            <Text style={global.outletId}>TS232</Text>
            <Text style={global.outletName}>Tokyo Secret Subang Outlet</Text>
          </View>
        </View>

        <View style={global.common_header2_btn_wrapper}>
          <TouchableOpacity>
            <View style={global.common_btn_box}>

              <Image source={require('../../images/Iconly-Bold-Logout.png')} />
              <Text style={global.btnText}>Log Out</Text>
              
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={global.common_btn_box}>

              <Image source={require('../../images/Iconly-Bold-Logout.png')} />
              <Text style={global.btnText}>Update PIN</Text>
              
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={global.common_wrapper}>
        <View style={global.flextitleSec}>
          <Text style={global.common_Title}>Details</Text>
        </View>

        <View style={global.activitydetailbox}>
          <View style={global.activitydt_Flexctx}>
            <Text style={global.activityLabel}>Merchant Since</Text>
            <Text>:</Text>

            <Text style={global.activityValue}>12 november 2020</Text>
          </View>

          <View style={global.activitydt_Flexctx}>
            <Text style={global.activityLabel}>PIC Contact :</Text>
            <Text>:</Text>
            <Text style={global.activityValue}>+ 6778777777777</Text>
          </View>

          <View style={global.activitydt_Flexctx}>
            <Text style={global.activityLabel}>Outlet Address</Text>
            <Text>:</Text>

            <Text style={global.activityValue}>
              Driver LicenseZ5666180 - issued in California
            </Text>
          </View>
        </View>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={global.popupBg}>
            <View style={global.popupBox}>
              <Text style={global.popup_Title1}>Enter Current PIN</Text>
              <Text style={global.popup_Title2}>
                To proceed with updating PIN
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 40,
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
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Image source={require('../../images/closeicon.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal animationType="slide" transparent={true} visible={modalVisible2}>
          <View style={global.popupBg}>
            <View style={global.popupBox}>
              <Text style={global.popup_Title1}>Enter New PIN</Text>
              <Text style={global.popup_Title2}>
                To proceed with updating PIN
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 40,
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
                <TouchableOpacity onPress={() => setModalVisible2(false)}>
                  <Image source={require('../../images/closeicon.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal animationType="slide" transparent={true} visible={modalVisible3}>
          <View style={global.popupBg}>
            <View style={global.popupBox}>
              <Text style={global.popup_Title1}>RE-Enter New PIN</Text>
              <Text style={global.popup_Title2}>
                To proceed with updating PIN
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 40,
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
      </View>
    </View>
  </View>

  );
}
