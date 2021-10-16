import React, {Component} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Modal,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {global} from '../../Styles/global';
import axios from 'axios';
import {connect} from 'react-redux';
import {GET_USER_DATA, GETDATA_QR, PAYMENT_VOUCHER} from '../API/Api';
import {paymentAction, walletAction} from '../../actions/paymentAction';
//import styled from 'styled-components/native'
import {TopupAction} from '../../actions/TopupAction';

class Qrscanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible1: false,
      modalVisible2: false,
      modalVisible3: false,
      modalVisible4: false,
      modalVisible5: false,
      modalVisible6: false,

      getMerchentdata: {},
      text: '',
      Qrdata: '',
      loader: false,
      //QrMessage: false,
      QrMessage: '',
      QrMessage1: '',
    };
    console.log("uniqueToken",this.props.merchentToken);
  }

  selectPaymenttype1 = () => {
    this.setState({
      modalVisible1: false,
    });

    this.setState({
      modalVisible2: true,
    });
  };

  selectPaymenttype2 = () => {
    this.setState({
      modalVisible1: false,
    });

    this.setState({
      modalVisible5: true,
    });
  };

  Paymentmethod1 = () => {
    this.setState({
      modalVisible2: false,
    });
    this.setState({
      modalVisible6: true,
    });
  };

  Paymentmethod2 = () => {
    this.setState({
      modalVisible2: false,
    });
    this.setState({
      modalVisible3: true,
    });
  };

  RevertModal2 = () => {
    this.setState({
      modalVisible3: false,
    });
    this.setState({
      modalVisible2: true,
    });
  };

  render() {
    const {navigation, route} = this.props;

    const {VoucherType} = route.params;

    //console.log(VoucherType)

    this.fg = async () => {
      if (this.state.text === '') {
        Alert.alert(
          'Please Enter The Amount.',
          '',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      } else {
        this.setState({loader: true});

        await this.props
          .paymentAction(
            this.state.text,
            this.props.merchentToken,
            VoucherType,
            this.state.Qrdata,
          )

          .then((e) => {
            this.setState({loader: false});

            this.props.navigation.navigate('Paymentsuccess');

            this.setState({modalVisible1: false});

            this.setState({modalVisible3: false});
          })
          .catch((e) => console.log(e));
      }
    };

    this.Walletpayment = async () => {
      if (this.state.text === '') {
        Alert.alert('Please Enter The Amount.', '', [{text: 'OK'}], {
          cancelable: false,
        });
      } else {
        this.setState({loader: true});

        await this.props
          .walletAction(
            this.props.merchentToken,
            this.state.Qrdata,
            this.state.text,
          )

          .then((e) => {
            this.setState({loader: false});
            this.setState({text: ' '});
            this.setState({modalVisible1: false});
            if (this.props.walletStatus === 'failure') {

              Alert.alert(this.props.walletDetails, '', [{text: 'OK'}], {
                cancelable: false,
              });

            

             

              
            } else if (this.props.walletStatus === 'success') {
              this.props.navigation.navigate('Successwallet');

              this.setState({modalVisible1: false});
              this.setState({modalVisible6: false});
            }

            //

            //console.log(e)
          })
          .catch((e) => console.log(e));
      }
    };

    this.topupPayment = async () => {
      if (this.state.text === '') {
        Alert.alert('Please Enter The Amount.', '', [{text: 'OK'}], {
          cancelable: false,
        });
      } else {
        this.setState({loader: true});

        await this.props
          .TopupAction(
            this.props.merchentToken,
            this.state.Qrdata,
            this.state.text,
          )

          .then((e) => {
            this.setState({loader: false});
            this.props.navigation.navigate('TopupSuccess');
            this.setState({modalVisible1: false});
            this.setState({modalVisible5: false});
          })
          .catch((e) => console.log(e));
      }
    };

    this.onSuccess = async (e) => {
      //console.log(e);
      // console.log(e.data)

      if (VoucherType === 1) {
        this.setState({Qrdata: e.data});
        //console.log(this.state.Qrdata);
        this.setState({loader: true});

        this.setState({modalVisible1: true}, () => {
          axios
            .get(GET_USER_DATA, {
              params: {
                api_token: this.state.Qrdata,
              },
            })
            .then((response) => {
              // console.log(response.data.msg);

              if (response.data.status === 'success') {
                this.setState({getMerchentdata: response.data.data});
                //   console.log(this.state.getMerchentdata)

                this.setState({loader: false});
                // this.setState({QrMessage: re});
              } else if (response.data.status === 'failure') {
                this.setState({QrMessage: response.data.data});

                this.setState({loader: false});
              }
            })

            .catch((err) => console.log(err));
        });
      }

      if (VoucherType === 2) {
        this.setState({loader: true});
        this.setState({Qrdata: e.data});
   


        this.setState({modalVisible4: true}, () => {
          var form = new FormData();
          form.append('qrcode', this.state.Qrdata);
          form.append('merchantToken', this.props.merchentToken);
          form.append('amount', 0);

          fetch(PAYMENT_VOUCHER, {
            method: 'POST',
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            }),
            body: form,
          })
            .then((response) => response.json())
            .then((e) => {
             
              //console.log(e)

              if (e.status === 'success') {
                this.setState({loader: false});

                this.setState({QrMessage1: e.msg});

                // console.log(this.state.QrMessage1);
              } else if (e.status === 'failure') {
                //  console.log(e.status);
                this.setState({loader: false});

                this.setState({QrMessage1: e.msg});

               
              }
            })
            .catch((e) => console.log(e));
        });
      }
    };

    // const VoucherBox = () => {
    //   if (VoucherType === 2) {
    //     return (
    //       <View>
    //         <TouchableOpacity
    //           onPress={() => this.setState({VouchercodeModal: true})}>
    //           <View style={global.VoucherBtn}>
    //             <Text style={{fontFamily: 'Helvetica-Bold'}}>
    //               Enter Voucher Code
    //             </Text>
    //           </View>
    //         </TouchableOpacity>
    //       </View>
    //     );
    //   }
    // };

    return (
      <View>
        <Text>
          {this.state.Qrdata === '' ? (
            <QRCodeScanner
              onRead={this.onSuccess}
              permissionDialogMessage="Need Permission to Access Camera"
              reactivate={true}
              showMarker={true}
              markerStyle={{borderColor: '#fff', borderRadius: 10}}
            />
          ) : (
            ''
          )}
        </Text>

        <View style={global.QrtopArrow}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}>
            <Image source={require('../../images/Backarrow.png')} />
          </TouchableOpacity>
        </View>


        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible1}>
          <View style={global.QrmodelBg}>
            <View style={global.popupBox1}>
              {this.state.QrMessage !== '' ? (
                <View>
                  <Text style={global.popup_Title1}>
                    {this.state.QrMessage}
                  </Text>
                </View>
              ) : (
                <View>
                  {this.state.loader ? (
                    <ActivityIndicator color="#76543A" size="large" />
                  ) : (
                    <View style={global.ScanDetails}>
                      <View
                        style={{
                          width: 100,
                          height: 100,
                          marginBottom: 20,
                          borderRadius: 50,
                          borderWidth: 3,
                          borderColor: '#FFF5CE',
                          overflow: 'hidden',
                        }}>
                        <Image
                          source={require('../../images/placeholder-image.jpeg')}
                          resizeMode="cover"
                        />
                      </View>

                      <Text style={global.popup_Title1}>
                        {this.state.getMerchentdata.name}{' '}
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('../../images/call.png')}
                          style={{marginRight: 10}}
                        />
                        <Text style={global.pay_dt_bold}>
                          {' '}
                          {this.state.getMerchentdata.phone}{' '}
                        </Text>
                      </View>
                    </View>
                  )}

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingTop: 30,
                    }}>
                    <TouchableOpacity onPress={() => this.selectPaymenttype1()}>
                      <View style={global.Payment_Btn}>
                        <Image
                          source={require('../../images/Paymenticon.png')}
                          style={{width: 14, height: 14, marginRight: 7}}
                        />
                        <Text>Payment</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.selectPaymenttype2()}>
                      <View style={global.Payment_Btn}>
                        <Image
                          source={require('../../images/walleticon1.png')}
                          style={{width: 14, height: 14, marginRight: 7}}
                        />
                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                          }}>
                          <Text>Top-Up</Text>
                          <Text> wallet</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>

            <View style={{position: 'absolute', top: 30, left: 4}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}>
                <Image source={require('../../images/Backarrow.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible4}>
          <View style={global.QrmodelBg}>
            <View style={global.popupBox1}>
              <View>
                {this.state.loader ? (
                  <ActivityIndicator size="large" color="#76543A" />
                ) : (
                  <View>
                    <Text style={global.popup_Title1}>
                      {this.state.QrMessage1}{' '}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={{position: 'absolute', top: 30, left: 4}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Lastactivity')}>
                <Image source={require('../../images/Backarrow.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible2}>
          <View style={global.QrmodelBg}>
            <View style={global.popupBox1}>
              <Text style={global.popup_Title1}>Payment Method ?</Text>
              <Text style={global.popup_Title2}>
                {' '}
                Select Customer payment method
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 20,
                }}>
                <TouchableOpacity onPress={() => this.Paymentmethod1()}>
                  <View style={global.Payment_Btn}>
                    <Image
                      source={require('../../images/Paymenticon.png')}
                      style={{width: 14, height: 14, marginRight: 7}}
                    />
                    <Text>Wallet</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.Paymentmethod2()}>
                  <View style={global.Payment_Btn}>
                    <Image
                      source={require('../../images/creditcard.png')}
                      resizeMode="contain"
                      style={{width: 14, height: 14, marginRight: 7}}
                    />

                    <Text>Others</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{position: 'absolute', top: 30, left: 4}}>
            <TouchableOpacity
                onPress={() =>this.setState({modalVisible2:false},()=>{

this.setState({modalVisible1:true})

                }) }>
                <Image source={require('../../images/Backarrow.png')} />
              </TouchableOpacity>
              </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible3}
          onShow={() => {
            this.textInput.focus();
          }}>
          <View style={global.QrmodelBg}>
            <View style={global.popupBox}>
              <Text style={global.popup_Title1}>Enter Amount</Text>
              <Text style={global.popup_Title2}>Enter amount to Pay</Text>

              <View style={global.Inputbox}>
                <Text style={global.RmText}>RM</Text>

                <TextInput
                  style={{width: '100%'}}
                  keyboardType="decimal-pad"
                  ref={(input) => {
                    this.textInput = input;
                  }}
                  onChangeText={(text) => this.setState({text})}
                />
              </View>

              <TouchableOpacity onPress={() => this.fg()}>
                <View style={global.payment_submit_btn}>
                  <Text style={global.btnText}>Submit</Text>
                  <Text style={{marginLeft: 20}}>
                    {this.state.loader ? (
                      <ActivityIndicator size="small" color="#F8DB65" />
                    ) : (
                      ''
                    )}
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={global.closeIconsec}>
                <TouchableOpacity onPress={() => this.setState({modalVisible5:false},()=>{

                  this.setState({modalVisible1:true})
                })}>
                  <Image source={require('../../images/closeicon.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible5}
          onShow={() => {
            this.textInput.focus();
          }}>
          <View style={global.QrmodelBg}>
            <View style={global.popupBox}>
              <Text style={global.popup_Title1}>Enter Amount</Text>
              <Text style={global.popup_Title2}>Enter amount to Top-Up</Text>

              <View style={global.Inputbox}>
                <Text style={global.RmText}>RM</Text>

                <TextInput
                  style={{width: '100%'}}
                  keyboardType="decimal-pad"
                  ref={(input) => {
                    this.textInput = input;
                  }}
                  onChangeText={(text) => this.setState({text})}
                />
              </View>

              <TouchableOpacity onPress={() => this.topupPayment()}>
                <View style={global.payment_submit_btn}>
                  <Text style={global.btnText}>Submit</Text>
                  <Text style={{marginLeft: 20}}>
                    {this.state.loader ? (
                      <ActivityIndicator size="small" color="#F8DB65" />
                    ) : (
                      ''
                    )}
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={global.closeIconsec}>
                <TouchableOpacity onPress={() => this.RevertModal2()}>
                  <Image source={require('../../images/closeicon.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible6}
          onShow={() => {
            this.textInput.focus();
          }}>
          <View style={global.QrmodelBg}>
            <View style={global.popupBox}>
              <Text style={global.popup_Title1}>Enter Amount</Text>
              <Text style={global.popup_Title2}>Enter amount to Pay</Text>

              <View style={global.Inputbox}>
                <Text style={global.RmText}>RM</Text>

                <TextInput
                  style={{width: '100%'}}
                  keyboardType="decimal-pad"
                  ref={(input) => {
                    this.textInput = input;
                  }}
                  onChangeText={(text) => this.setState({text})}
                />
              </View>

              <TouchableOpacity onPress={() => this.Walletpayment()}>
                <View style={global.payment_submit_btn}>
                  <Text style={global.btnText}>Submit</Text>
                  <Text style={{marginLeft: 20}}>
                    {this.state.loader ? (
                      <ActivityIndicator size="small" color="#F8DB65" />
                    ) : (
                      ''
                    )}
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={global.closeIconsec}>
                <TouchableOpacity onPress={() => this.setState({modalVisible6:false},()=>{

this.setState({modalVisible1:true})


                })}>
                  <Image source={require('../../images/closeicon.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* <Modal animationType="slide" transparent={true} visible={this.state.VouchercodeModal}>
         <TouchableWithoutFeedback  onPress={() => {
                  Keyboard.dismiss();
                }}>

       

        <View style={global.BottomModal_Bg}>
          <View style={global.bottomModal}>
            <Text style={global.popup_Title1}>Enter your voucher code</Text>

            <TextInput style={global.reasonBox}   
               onChangeText={text => this.setState({text:text})}

               value={this.state.text}/>


            <View style={{marginTop: 50,alignItems:"center"}}>
              <TouchableOpacity onPress={()=>this.submitVoucher() } >
                <View style={global.smbutton}>
                  <Text style={global.btnwhite_Text}>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={global.closeIconsec}>
              <TouchableOpacity onPress={()=>this.setState({VouchercodeModal:false})}>
                <Image source={require('../../images/closeicon.png')} style={{width:25 ,height:25}} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
        */}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  merchentToken: state.loginDetails.token,

  walletDetails: state.WalletReducer.Walletdata,

  walletStatus: state.WalletReducer.status,
});

export default connect(mapStateToProps, {
  paymentAction,
  TopupAction,
  walletAction,
})(Qrscanner);
