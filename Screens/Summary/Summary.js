import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  Modal,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {global} from '../../Styles/global';
import * as Animatable from 'react-native-animatable';

import {DAYEND_SUMMARY, CHECK_PIN, MERCHANT_DAYEND} from '../API/Api';
import ActivityLoader from '../ActivityLoader/ActivityLoader';

import moment from 'moment';

import {connect} from 'react-redux';

class Summary extends Component {
  constructor(props) {
    super(props);

    this.pin1Ref = React.createRef();
    this.pin2Ref = React.createRef();
    this.pin3Ref = React.createRef();
    this.pin4Ref = React.createRef();

    this.state = {
      modalVisible1: false,

      modalVisible2: false,
      modalVisible3: false,

      pin1: '',
      pin2: '',
      pin3: '',
      pin4: '',
      summaryDatas: {},
      loader: false,
      dayEndTransaction: {},
      summmaryError: false,
      activityLoader: false,
    };
  }

  ac = new AbortController();

  _dayendDetails = () => {
    ///console.log("dw")

    var form = new FormData();

    form.append('api_token', this.props.merchentToken);

    fetch(
      DAYEND_SUMMARY,
      {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }),
        body: form,
      },
      {signal: this.ac.signal},
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({loading: false});
        if (data.status === 'success') {
          this.setState({summaryDatas: data.data});
          this.setState({summmaryError: false});
        } else if (data.status === 'failure') {
          this.setState({summmaryError: true});
        }
      })
      .catch((e) => console.log(e.name));
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({loading: true});

      this._dayendDetails();
    });
  }

  componentWillUnmount() {
    this.ac.abort();
    this._unsubscribe;
  }

  confirmDayend = () => {
    this.setState({modalVisible1: false});

    this.setState({modalVisible2: true});
  };

  handleCloseModal = () => {
    this.setState({modalVisible1: false});
  };

  render() {
    const {navigation, route} = this.props;
    const {pin1, pin2, pin3} = this.state;

    return (
      <View style={global.innerpageContainer}>
        <StatusBar backgroundColor="#EFCB38" barStyle="dark-content" />

        <View
          style={
            Platform.OS === 'android'
              ? global.common_header1
              : global.common_header1_IOS
          }>
          <View style={global.common_header_layer1}>
            {/* <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={require('../../images/HamburgerMenu.png')} />
            </TouchableOpacity> */}
            <View></View>

            <Image source={require('../../images/Logo.png')}   style={global.headLogo} resizeMode="contain"/>

            <Text></Text>
          </View>

          <View style={global.common_header_layer2}>
            <View>
              <Text style={global.common_Title}>Day End</Text>
            </View>
          </View>

          <View style={global.common_header2_btn_wrapper}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('DayendHistory')}>
              <View style={global.common_btn_box}>
                <Image
                  source={require('../../images/Coinyellow_icon.png')}
                  style={{width: 18, height: 18}}
                />

                <Text style={global.btnText}>History</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({modalVisible1: true})}>
              <View style={global.common_btn_box}>
                <Image
                  source={require('../../images/Wallet_yellow_icon.png')}
                  style={{width: 18, height: 18}}
                />
                <Text style={global.btnText}>Day End</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={global.common_wrapper}>
          <View style={global.flextitleSec}>
            <Text style={global.common_Title}>Summary</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{paddingHorizontal: 15, paddingBottom: 40}}>
          <Animatable.View animation="fadeInUp">
            {this.state.summmaryError ? (
              <View style={global.EmptyListbox}>
                <Text style={global.emptyBoxtext}>No Summary Found..</Text>
              </View>
            ) : (
              <View style={global.activitydetailbox}>
                <View style={global.activitydt_Flexctx}>
                  <Text style={global.activityLabel}>Current Date </Text>

                  <Text>:</Text>
                  <Text style={global.activityValue}>
                    {moment(this.state.summaryDatas.date).format(
                      'MMMM Do YYYY',
                    )}
                  </Text>
                </View>

                <View style={global.activitydt_Flexctx}>
                  <Text style={global.activityLabel}>Current Time </Text>
                  <Text>:</Text>
                  <Text style={global.activityValue}>
                    {moment(this.state.summaryDatas.time, ['h:mm a']).format(
                      'hh:mm a',
                    )}
                  </Text>
                </View>

                <View style={global.activitydt_Flexctx}>
                  <Text style={global.activityLabel}>Total Wallet </Text>
                  <Text>:</Text>
                  <Text style={global.activityValue}>
                    RM{' '}
                    {(
                      Math.round(this.state.summaryDatas.total_wallet * 100) /
                      100
                    ).toFixed(2)}
                  </Text>
                </View>

                <View style={global.activitydt_Flexctx}>
                  <Text style={global.activityLabel}>Total others </Text>
                  <Text>:</Text>
                  <Text style={global.activityValue}>
                    RM{' '}
                    {(
                      Math.round(this.state.summaryDatas.total_others * 100) /
                      100
                    ).toFixed(2)}
                  </Text>
                </View>

                <View style={global.activitydt_Flexctx}>
                  <Text style={global.activityLabel}>Total Top-Up </Text>
                  <Text>:</Text>
                  <Text style={global.activityValue}>
                    RM{' '}
                    {(
                      Math.round(this.state.summaryDatas.total_topup * 100) /
                      100
                    ).toFixed(2)}
                  </Text>
                </View>

                <View style={global.activitydt_Flexctx}>
                  <Text style={global.activityLabel}>
                    Total Payment Cancelled{' '}
                  </Text>
                  <Text>:</Text>

                  <Text style={global.activityValue}>
                    RM{' '}
                    {(
                      Math.round(
                        this.state.summaryDatas.payment_canceled * 100,
                      ) / 100
                    ).toFixed(2)}
                  </Text>
                </View>

                <View style={global.activitydt_Flexctx}>
                  <Text style={global.activityLabel}>
                    Total Top-Up Cancelled{' '}
                  </Text>
                  <Text>:</Text>
                  <Text style={global.activityValue}>
                    RM{' '}
                    {(
                      Math.round(this.state.summaryDatas.topup_canceled * 100) /
                      100
                    ).toFixed(2)}
                  </Text>
                </View>
              </View>
            )}
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

          <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
            <View style={global.tabbarMenuwidth}>
              <Image
                source={require('../../images/drawericon3.png')}
                style={{width: 18, height: 18}}
              />
              <Text style={global.MenuName}>History</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Actionsheet')}>
            <View style={global.tabbarMenuwidth}>
              <View style={global.circleMenu_layer1}>
                <View style={global.circleMenu_layer2}>
                  <Image
                    source={require('../../images/Iconly-Bold-Scan.png')}
                  />
                </View>
              </View>
              <Text style={global.Menu_Center}>Transaction</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View style={global.tabbarMenuwidth}>
              <Image
                source={require('../../images/drawerIcon1.png')}
                style={{width: 18, height: 18}}
              />
              <Text style={global.MenuName}>Profile</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Summary')}>
            <View style={global.tabbarMenuwidth}>
              <Image
                source={require('../../images/focusedLogout.png')}
                style={{width: 18, height: 18}}
              />
              <Text style={global.Active_menu}>Day End</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible1}>
          <TouchableOpacity
            style={global.popupBg1}
            onPressOut={() => this.setState({modalVisible1: false})}>
            <View>
              <View style={global.popupBox1}>
                <Text style={global.popup_Title1}>Confirm Day End ?</Text>
                <Text style={global.popup_Title2}>
                  {' '}
                  Are you sure you would like to end your shift ?
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 40,
                  }}>
                  <TouchableOpacity
                    onPress={() => this.setState({modalVisible1: false})}>
                    <View style={global.confirm_btncancel}>
                      <Text style={global.white_Btn_Text}>No</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.confirmDayend()}>
                    <View style={global.confirm_proceed}>
                      <Text style={global.whiteText}>Yes</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible2}
          onShow={() => {
            this.pin1Ref.current.focus();
          }}>
          <TouchableOpacity
            onPress={() => this.setState({modalVisible2: false})}>
            <View style={global.popupBg}>
              <View style={global.popupBox}>
                <Text style={global.popup_Title1}>Enter PIN</Text>
                <Text style={global.popup_Title2}>To confirm Day End</Text>

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
                    value={this.state.pin2}
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
                    value={this.state.pin3}
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
                              let getpinToken = data.data.token;

                              var form = new FormData();
                              form.append('api_token', getpinToken);

                              fetch(MERCHANT_DAYEND, {
                                method: 'POST',
                                headers: new Headers({
                                  Accept: 'application/json',
                                  'Content-Type': 'multipart/form-data',
                                }),
                                body: form,
                              })
                                .then((response) => response.json())
                                .then((data) => {
                                  ///  console.log(data.status);
                                  if (data.status === 'success') {
                                    this.setState({activityLoader: false});
                                    this.pin1Ref.current.focus();
                                    this.setState({
                                      pin1: '',
                                      pin2: '',
                                      pin3: '',
                                      pin4: '',
                                    });
                                    this.setState(
                                      {
                                        dayEndTransaction:
                                          data.data.transactionid,
                                      },
                                      () => {
                                        this.setState({
                                          modalVisible1: false,
                                          modalVisible2: false,
                                          modalVisible3: true,
                                        });
                                      },

                                      //  console.log(this.state.dayEndTransaction)
                                    );
                                  } else if (data.status === 'failure') {
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
                                });
                            }

                            if (data.status === 'failure') {
                              this.pin1Ref.current.focus();
                              this.setState({activityLoader: false});
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

        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible3}>
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

              <Text style={global.common_Title}>Day End Successful</Text>

              <Text style={global.common_smtitle}>
                Transaction No: {this.state.dayEndTransaction}{' '}
              </Text>
            </View>

            <View style={global.flexpart2}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({modalVisible3: false}, () => {
                    this.props.navigation.navigate('DayendHistory');
                  })
                }>
                <View style={global.Homebtn}>
                  <Text style={global.btnBrown_Text}>Back to Home</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View>
          <Text>{this.state.loading ? <ActivityLoader /> : ''}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  merchentToken: state.loginDetails.token,
  // statusMessage: state.loginDetails.status,
});
export default connect(mapStateToProps, {})(Summary);
