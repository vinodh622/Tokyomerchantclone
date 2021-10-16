import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';
import {global} from '../../Styles/global';
import * as Animatable from 'react-native-animatable';
import {Ltout} from '../../actions/loginActions';
//import {useDispatch, useSelector} from 'react-redux';
import {FULL_DAY_REPORT, DAY_END_REPORT} from '../API/Api';
import ActivityLoader from '../ActivityLoader/ActivityLoader';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import moment from 'moment';

import {connect} from 'react-redux';

const windowWidth = Dimensions.get('window').width;



class DayendHistory extends Component {
  constructor(props) {
    super(props);

    // this.myRef = React.createRef();

    this.state = {
      summaryDatas: {},
      loading: false,
      dayEndTransaction: {},
      isDatePickerVisible: false,
      getCurrentdate: 'Select Date',
      vb: '',
      report: [],
      reportError: false,
    };
    //  console.log(this.state.vb)
  }

  ac = new AbortController();

  fulldayReport = () => {
    this.setState({loading: true});

    var form = new FormData();
    form.append('api_token', this.props.merchentToken);

    fetch(
      FULL_DAY_REPORT,
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
        this.setState({getCurrentdate: 'Select Date', loading: false});

        if (data.status === 'success') {
          this.setState({report: data.data});

          this.setState({reportError: false});
        } else if (data.status === 'failure') {
          this.setState({reportError: true});
        }
      })
      .catch((e) => console.log(e));
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({loading: true});

      this.fulldayReport();
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

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  handleConfirm = async (date) => {
    this.setState({loading: true});

    this.setState({isDatePickerVisible: false});

    //  console.log(date)

    let currentDate = date;
    let setCurrentdate = moment(currentDate).format('YY/MM/DD');

    this.setState({getCurrentdate: setCurrentdate});

    var form = new FormData();
    form.append('api_token', this.props.merchentToken);
    form.append('date', setCurrentdate);

    fetch(DAY_END_REPORT, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({getCurrentdate: 'Select Date', loading: false});

        if (data.status === 'success') {
          this.setState({report: data.data});

          this.setState({reportError: false});
        } else if (data.status === 'failure') {
          this.setState({reportError: true});
        }
      })
      .catch((e) => console.log(e));
  };

  render() {
    const {navigation, route} = this.props;
    // const {pin1, pin2, pin3} = this.state;

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
            {/* <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={require('../../images/HamburgerMenu.png')} />
            </TouchableOpacity> */}
            <View></View>

            <Image source={require('../../images/Logo.png')}  style={global.headLogo} resizeMode="contain"/>

            <Text></Text>
          </View>

          <View style={global.common_header_layer2}>
            <View>
              <Text style={global.common_Title}>Day End</Text>
            </View>
          </View>

          <View style={global.common_header2_btn_wrapper}>
            <View style={global.white_Btn}>
              <Image
                source={require('../../images/Coinyellow_icon.png')}
                style={{width: 18, height: 18}}
              />

              <Text style={global.btnText_white}>History</Text>
            </View>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Summary')}>
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
          <TouchableOpacity onPress={this.showDatePicker}>
            <View style={global.reportCalendersec}>
              <Text>{this.state.getCurrentdate} </Text>

              <Image
                source={require('../../images/down-arrow.png')}
                style={global.downArrow}
              />
            </View>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible}
            mode="date"
            onConfirm={this.handleConfirm}
            onCancel={this.hideDatePicker}
            headerTextIOS="Pick a Date"
          />
        </View>

        <ScrollView
          contentContainerStyle={{paddingHorizontal: 15, paddingBottom: 40}}
          showsVerticalScrollIndicator={false}>
          <Animatable.View animation="fadeInUp">
            {this.state.reportError ? (
              <View style={global.EmptyListbox}>
                <Text style={global.emptyBoxtext}>No Reports Found..</Text>
              </View>
            ) : (
              <View>
                {this.state.report.map((e) => {
                  return (
                    <View style={global.activitydetailbox} key={e.id}>
                      <View style={global.activitydt_Flexctx}>
                        <Text style={global.activityLabel}>Day End Date </Text>

                        <Text>:</Text>
                        <Text style={global.activityValue}>
                          {moment(e.created_at).format('MMMM Do YYYY')}
                        </Text>
                      </View>

                      <View style={global.activitydt_Flexctx}>
                        <Text style={global.activityLabel}>Day End Time </Text>
                        <Text>:</Text>
                        <Text style={global.activityValue}>
                          {moment(e.created_at).format('h:mm a')}
                        </Text>
                      </View>

                      <View style={global.activitydt_Flexctx}>
                        <Text style={global.activityLabel}>Total Wallet </Text>
                        <Text>:</Text>
                        <Text style={global.activityValue}>
                          RM{' '}
                          {(Math.round(e.total_wallet * 100) / 100).toFixed(2)}
                        </Text>
                      </View>

                      <View style={global.activitydt_Flexctx}>
                        <Text style={global.activityLabel}>Total others </Text>
                        <Text>:</Text>
                        <Text style={global.activityValue}>
                          RM{' '}
                          {(Math.round(e.total_others * 100) / 100).toFixed(2)}
                        </Text>
                      </View>

                      <View style={global.activitydt_Flexctx}>
                        <Text style={global.activityLabel}>Total Top-up </Text>
                        <Text>:</Text>
                        <Text style={global.activityValue}>
                          RM{' '}
                          {(Math.round(e.total_topup * 100) / 100).toFixed(2)}
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
                            Math.round(e.payment_cancelled * 100) / 100
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
                          {(Math.round(e.topup_cancelled * 100) / 100).toFixed(
                            2,
                          )}
                        </Text>
                      </View>
                    </View>
                  );
                })}
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
            <View style={{width: windowWidth / 5, alignItems: 'center'}}>
              <Image
                source={require('../../images/Hometab.png')}
                style={{width: 18, height: 18}}
              />
              <Text style={global.MenuName}>Home</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
            <View style={{width: windowWidth / 5, alignItems: 'center'}}>
              <Image
                source={require('../../images/drawericon3.png')}
                style={{width: 18, height: 18}}
              />
              <Text style={global.MenuName}>History</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Actionsheet')}>
            <View style={global.Menu_Align}>
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
            <View style={{width: windowWidth / 5, alignItems: 'center'}}>
              <Image
                source={require('../../images/drawerIcon1.png')}
                style={{width: 18, height: 18}}
              />
              <Text style={global.MenuName}>Profile</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Summary')}>
            <View style={{width: windowWidth / 5, alignItems: 'center'}}>
              <Image
                source={require('../../images/focusedLogout.png')}
                style={{width: 18, height: 18}}
              />
              <Text style={global.Active_menu}>Day End</Text>
            </View>
          </TouchableOpacity>
        </View>

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
export default connect(mapStateToProps, {Ltout})(DayendHistory);
