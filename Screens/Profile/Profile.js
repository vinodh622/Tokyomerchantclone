import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  Platform,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {global} from '../../Styles/global';
import * as Animatable from 'react-native-animatable';

import {Ltout} from '../../actions/loginActions';
import {purgeStoredState} from 'redux-persist';
import {logoutAction} from '../../actions/logoutAction';
import {VIEW_PROFILE} from '../API/Api';
import moment from 'moment';
import {connect} from 'react-redux';
import {CHECK_PIN, UPDATE_PIN} from '../API/Api';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

class Profile extends Component {
  constructor(props) {
    super(props);

    this.pin1Ref = React.createRef();
    this.pin2Ref = React.createRef();
    this.pin3Ref = React.createRef();
    this.pin4Ref = React.createRef();

    this.state = {
      viewprofileData: {},
      modalVisible1: false,
      modalVisible2: false,
      activityLoader: false,
      pageRefreshing: false,
    };
  }

  componentDidMount() {
    console.log(this.props.merchentToken)

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
///console.log("w")
      var form = new FormData();
      form.append('api_token', this.props.merchentToken);
  
      fetch(VIEW_PROFILE, {
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
            this.setState({viewprofileData: data.data});
          }
        })

  
        .catch((e) => console.log(e));
  
 
    
   
       
 
     });
 






   


  }


  componentWillUnmount() {

    ///this.abort.abort();

    this._unsubscribe();

  }





  clearData = async () => {
    
    await this.props
      .logoutAction(this.props.merchentToken)

      .then(() => {
        // console.log("e")

        this.props.Ltout(purgeStoredState);
      });
  };

  logOut = () => {
    Alert.alert(
      'Are you sure you want to log out',
      '',
      [
        {
          text: 'No',

          style: 'cancel',
        },
        {text: 'Yes', onPress: () => this.clearData()},
      ],
      {cancelable: false},
    );
  };

  onRefresh = () => {
    this.setState({pageRefreshing: true});

    wait(1000).then(() => {
      var form = new FormData();
      form.append('api_token', this.props.merchentToken);

      fetch(VIEW_PROFILE, {
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
            this.setState({viewprofileData: data.data});
          }
        })
        .then(() => {
          this.setState({pageRefreshing: false});
        })

        .catch((e) => console.log(e));
    });
  };

  render() {
    const {navigation, route} = this.props;

    const {pin1, pin2, pin3} = this.state;

    return (
      <View style={global.innerpageContainer}>
        <StatusBar
          backgroundColor="#EFCB38"
          barStyle="dark-content"></StatusBar>

        <ImageBackground
          source={require('../../images/GradientBg_big.png')}
          style={
            Platform.OS === 'android'
              ? global.GradientBg_bigsec
              : global.GradientBg_bigsec_IOS
          }>
          <View style={global.header_arrow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../images/Iconly-Bold-Arrow.png')} />
            </TouchableOpacity>
          </View>

          <View style={global.Profileheader}>
            <View style={global.ProfileImagebox}>
              <Image
                source={require('../../images/placeholder-image.jpeg')}
                style={global.profileImage}
                resizeMode="cover"
              />
            </View>

            <Text style={global.common_Title}>
              {this.state.viewprofileData.ic}
            </Text>

            <Text style={global.Normal_Text}>
              {this.state.viewprofileData.outlet_name}
            </Text>
          </View>

          <View style={global.common_header2_btn_wrapper}>
            <TouchableOpacity onPress={() => this.logOut()}>
              <View style={global.common_btn_box}>
                <Image
                  source={require('../../images/Iconly-Bold-Logout.png')}
                  style={{width: 18, height: 18}}
                />

                <Text style={global.btnText}>Log Out</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPressIn={() => this.setState({modalVisible1: true})}>
              <View style={global.common_btn_box}>
                <Image
                  source={require('../../images/PinLock.png')}
                  style={{width: 18, height: 18}}
                />
                <Text style={global.btnText}>Update PIN</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={global.common_wrapper}>
          <View style={global.flextitleSec}>
            <Text style={global.common_Title}>Details</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{paddingHorizontal: 15, paddingBottom: 40}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.pageRefreshing}
              onRefresh={() => this.onRefresh()}
            />
          }>
          <Animatable.View animation="fadeInUp">
            <View style={global.activitydetailbox}>
              <View>
                <View style={global.activitydt_Flexctx}>
                  <Text style={global.activityLabel}>Merchant Since </Text>

                  <Text>:</Text>
                  <Text style={global.activityValue}>
                    {moment(this.state.viewprofileData.created_at).format(
                      'MMMM Do YYYY',
                    )}
                  </Text>
                </View>

                <View style={global.activitydt_Flexctx}>
                  <Text style={global.activityLabel}>PIC Contact</Text>
                  <Text>:</Text>
                  <Text style={global.activityValue}>
                    {this.state.viewprofileData.phone}
                  </Text>
                </View>

                <View style={global.activitydt_Flexctx}>
                  <Text style={global.activityLabel}>Outlet Address </Text>
                  <Text>:</Text>
                  <Text style={global.activityValue} numberOfLines={15}>
                    {this.state.viewprofileData.outlet_address}
                  </Text>
                </View>
              </View>
            </View>
          </Animatable.View>
        </ScrollView>

        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible1}
          onShow={() => {
            this.pin1Ref.current.focus();
          }}>
          <TouchableOpacity>
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
                    paddingTop: 30,
                  }}>
                  <TextInput
                    style={global.pinBox}
                    secureTextEntry={true}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={this.pin1Ref}
                    onChangeText={(pin1) => {
                      this.setState({pin1});

                      if (pin1 != '') {
                        this.pin2Ref.current.focus();
                      }
                    }}
                    value={pin1}
                  />
                  <TextInput
                    ref={this.pin2Ref}
                    style={global.pinBox}
                    secureTextEntry={true}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(pin2) => {
                      this.setState({pin2});

                      if (pin2 != '') {
                        this.pin3Ref.current.focus();
                      }
                    }}
                    value={pin2}
                  />

                  <TextInput
                    ref={this.pin3Ref}
                    style={global.pinBox}
                    secureTextEntry={true}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(pin3) => {
                      this.setState({pin3});
                      if (pin3 != '') {
                        this.pin4Ref.current.focus();
                      }
                    }}
                    value={pin3}
                  />

                  <TextInput
                    ref={this.pin4Ref}
                    style={global.pinBox}
                    maxLength={1}
                    secureTextEntry={true}
                    keyboardType="number-pad"
                    value={this.state.pin4}
                    onChangeText={(pin4) =>
                      this.setState({pin4}, () => {
                        this.setState({activityLoader: true});

                        var form = new FormData();
                        form.append('api_token', this.props.merchentToken);
                        form.append(
                          'pin',
                            this.state.pin1 +
                            this.state.pin2 +
                            this.state.pin3 +
                            this.state.pin4,
                        );

                        fetch(CHECK_PIN, {
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
                              this.setState({activityLoader: false});

                              this.setState({
                                modalVisible1: false,
                                modalVisible2: true,
                              });

                              this.setState({
                                pin1: '',
                                pin2: '',
                                pin3: '',
                                pin4: '',
                              });
                            }

                            if (data.status === 'failure') {
                              this.setState({activityLoader: false});
                              this.pin1Ref.current.focus();

                              this.setState({
                                pin1: '',
                                pin2: '',
                                pin3: '',
                                pin4: '',
                              });

                              Alert.alert(data.data, '', [{text: 'OK'}], {
                                cancelable: false,
                              });
                            }
                          })

                          .catch((e) => console.log(e));
                      })
                    }
                  />

                  {this.state.activityLoader ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <View></View>
                  )}
                </View>

                <View style={global.closeIconsec}>
                  <TouchableOpacity
                    onPress={() => this.setState({modalVisible1: false})}>
                    <Image source={require('../../images/closeicon.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible2}
          onShow={() => {
            this.pin1Ref.current.focus();
          }}>
          <TouchableOpacity>
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
                    paddingTop: 30,
                  }}>
                  <TextInput
                    style={global.pinBox}
                    secureTextEntry={true}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={this.pin1Ref}
                    onChangeText={(pin1) => {
                      this.setState({pin1});

                      if (pin1 != '') {
                        this.pin2Ref.current.focus();
                      }
                    }}
                    value={pin1}
                  />
                  <TextInput
                    ref={this.pin2Ref}
                    style={global.pinBox}
                    secureTextEntry={true}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(pin2) => {
                      this.setState({pin2});

                      if (pin2 != '') {
                        this.pin3Ref.current.focus();
                      }
                    }}
                    value={pin2}
                  />

                  <TextInput
                    ref={this.pin3Ref}
                    style={global.pinBox}
                    secureTextEntry={true}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(pin3) => {
                      this.setState({pin3});
                      if (pin3 != '') {
                        this.pin4Ref.current.focus();
                      }
                    }}
                    value={pin3}
                  />

                  <TextInput
                    ref={this.pin4Ref}
                    style={global.pinBox}
                    maxLength={1}
                    secureTextEntry={true}
                    keyboardType="number-pad"
                    value={this.state.pin4}
                    onChangeText={(pin4) =>
                      this.setState({pin4}, () => {
                        this.setState({activityLoader: true});

                        var form = new FormData();
                        form.append('api_token', this.props.merchentToken);
                        form.append(
                          'pin',
                          this.state.pin1 +
                            this.state.pin2 +
                            this.state.pin3 +
                            this.state.pin4,
                        );

                        fetch(UPDATE_PIN, {
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

                            if (data.status === 'success') {
                              this.setState({activityLoader: false});

                              this.setState({modalVisible2: false});

                              this.setState({
                                pin1: '',
                                pin2: '',
                                pin3: '',
                                pin4: '',
                              });

                              Alert.alert(data.data, '', [{text: 'OK'}], {
                                cancelable: false,
                              });
                            }

                            if (data.status === 'failure') {
                              this.setState({activityLoader: false});
                              this.pin1Ref.current.focus();

                              this.setState({
                                pin1: '',
                                pin2: '',
                                pin3: '',
                                pin4: '',
                              });

                              Alert.alert(data.data, '', [{text: 'OK'}], {
                                cancelable: false,
                              });
                            }
                          })

                          .catch((e) => console.log(e));
                      })
                    }
                  />

                  {this.state.activityLoader ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <View></View>
                  )}
                </View>

                <View style={global.closeIconsec}>
                  <TouchableOpacity
                    onPress={() => this.setState({modalVisible2: false})}>
                    <Image source={require('../../images/closeicon.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  merchentToken: state.loginDetails.token,
});

export default connect(mapStateToProps, {logoutAction, Ltout})(Profile);
