import React, {Component} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {global} from '../../Styles/global';
import {CONFIRM_DELETE} from '../API/Api';
import {connect} from 'react-redux';

class CancelOrderPin extends Component {
  constructor(props) {
    super(props);

    this.pin1Ref = React.createRef();
    this.pin2Ref = React.createRef();
    this.pin3Ref = React.createRef();
    this.pin4Ref = React.createRef();

    this.state = {
      modalVisible: true,
      activityLoader: false,
    };
  }

  render() {
    const {pin1, pin2, pin3} = this.state;

    const {showconfirmModel_id, closeConfirmmodel } = this.props;

    return (
      <View>
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible}
          onShow={() => {
            this.pin1Ref.current.focus();
          }}>
          <TouchableOpacity>
            <View style={global.popupBg}>
              <View style={global.popupBox}>
                <Text style={global.popup_Title1}>Enter Your PIN</Text>
                <Text style={global.popup_Title2}>
                  To proceed with Cancel Order
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
                        form.append('orderid', showconfirmModel_id);

                        fetch(
                            CONFIRM_DELETE,
                          {
                            method: 'POST',
                            headers: new Headers({
                              Accept: 'application/json',
                              'Content-Type': 'multipart/form-data',
                            }),
                            body: form,
                          },
                        )
                          .then((response) => response.json())
                          .then((data) => {
                              //console.log(data.data)
                          
                            this.setState({activityLoader: false});

                            if (data.status === 'success') {
                               
                              Alert.alert(data.data, '', [
                                {
                                  text: 'OK',
                                  onPress: () => closeConfirmmodel(),
                                },
                              ]);
                            }

                            if (data.status === 'failure') {
                              this.pin1Ref.current.focus();

                              this.setState({
                                pin1: '',
                                pin2: '',
                                pin3: '',
                                pin4: '',
                              });

                              Alert.alert(
                                data.data,
                                '',
                                [
                                  {
                                    text: 'OK',
                                   
                                  },
                                ],
                                {
                                  cancelable: false,
                                },
                              );
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
                  <TouchableOpacity onPress={() => closeConfirmmodel()}>
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

export default connect(mapStateToProps, {})(CancelOrderPin);
