import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  Image,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {global} from '../../Styles/global';
import {CHECK_PIN, CANCEL_PAYMENT} from '../API/Api';
import Toast from 'react-native-simple-toast';

import {connect} from 'react-redux';

class CustomPinModal extends Component {
  constructor(props) {
    super(props);
    this.pin1Ref = React.createRef();
    this.pin2Ref = React.createRef();
    this.pin3Ref = React.createRef();
    this.pin4Ref = React.createRef();

    this.state = {
      modalVisible1: false,
      commentBox: true,
      comments: '',

      activityLoader: false,
    };
    //console.log(this.state.comments+"qsqs")
  }

  submitReasonbox = () => {
    this.setState({commentBox: false});

    this.setState({modalVisible1: true});
  };

  render() {
    const {navigation, route} = this.props;
    const {pin1, pin2, pin3} = this.state;

    return (
      <View>
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.commentBox}>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={global.BottomModal_Bg}>
                <View style={global.bottomModal}>
                  <Text style={global.popup_Title1}>Enter Reason</Text>

                  <Text style={global.popup_Title2}>
                    Why cancel the transaction ?
                  </Text>

                  <TextInput
                    style={global.reasonBox}
                    multiline={true}
                    onChangeText={(text) => this.setState({comments: text})}
                    value={this.state.comments}
                  />

                  <View style={{marginTop: 50, alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => this.submitReasonbox()}>
                      <View style={global.smbutton}>
                        <Text style={global.btnwhite_Text}>Submit</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={global.closeIconsec}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Image
                        source={require('../../images/closeicon.png')}
                        style={{width: 25, height: 25}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible1}
          onShow={() => {
            this.pin1Ref.current.focus();
          }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={global.popupBg}>
              <View style={global.popupBox}>
                <Text style={global.popup_Title1}>Enter PIN</Text>
                <Text style={global.popup_Title2}>To Cancel Payment</Text>

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
                        //this.setState({loader: true});

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
                             // console.log(this.state.comments)
                              var form = new FormData();
                              form.append(
                                'api_token',
                                this.props.merchentToken,
                              );
                              form.append('paymentid', this.props.setpaymentId);
                              form.append('comment', this.state.comments);

                              fetch(CANCEL_PAYMENT, {
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
                                  //  console.log(data)
                                    this.setState({activityLoader: false});

                                    this.props.navigation.goBack();

                                    Toast.show(
                                      'Payment Cancelled Successfully',
                                    );

                                    //  console.log(this.state.dayEndTransaction)
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
                    onPress={() => this.props.navigation.goBack()}>
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
  setpaymentId: state.getpaymentId.uniquePaymentID,
  merchentToken: state.loginDetails.token,

});
export default connect(mapStateToProps)(CustomPinModal);
