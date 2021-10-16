import React, {Component} from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  DeviceEventEmitter,
  NativeEventEmitter,
  Switch,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  StatusBar,
  Image,
  TextInput,
  Alert ,NativeModule
} from 'react-native';
import {
  BluetoothEscposPrinter,
  BluetoothManager,
  BluetoothTscPrinter,
} from 'react-native-bluetooth-escpos-printer';

import {global} from '../../Styles/global';
import {connect} from 'react-redux';

import ActivityLoader from '../ActivityLoader/ActivityLoader';

import moment from 'moment';

import {WEB_ORDERS} from '../API/Api'




class Printer extends Component {
  _listeners = [];

  constructor(props) {
    super(props);
    this.state = {
      devices: null,
      pairedDs: [],
      foundDs: [],

      bleOpend: false,
      loading: true,
      boundAddress: '',
      debugMsg: '',
    };
  }

  componentDidMount() {
    BluetoothManager.isBluetoothEnabled().then(
      (enabled) => {
        this.setState({
          bleOpend: false,
          loading: false,
        });
      },
      (err) => {
        err;
      },
    );

    if (Platform.OS === 'ios') {
      let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
          (rsp) => {
            this._deviceAlreadPaired(rsp);
          },
        ),
      );
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_FOUND,
          (rsp) => {
            this._deviceFoundEvent(rsp);
          },
        ),
      );
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_CONNECTION_LOST,
          () => {
            this.setState({
              name: '',
              boundAddress: '',
            });
          },
        ),
      );
    } else if (Platform.OS === 'android') {
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
          (rsp) => {
            this._deviceAlreadPaired(rsp);
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_FOUND,
          (rsp) => {
            this._deviceFoundEvent(rsp);
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_CONNECTION_LOST,
          () => {
            this.setState({
              name: '',
              boundAddress: '',
            });
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT,
          () => {
            ToastAndroid.show(
              'Device Not Support Bluetooth !',
              ToastAndroid.LONG,
            );
          },
        ),
      );
    }
  }

  componentWillUnmount() {
    //    this._unsubscribe();
  }

  _deviceAlreadPaired(rsp) {
    var ds = null;
    if (typeof rsp.devices == 'object') {
      ds = rsp.devices;
    } else {
      try {
        ds = JSON.parse(rsp.devices);
      } catch (e) {}
    }
    if (ds && ds.length) {
      let pared = this.state.pairedDs;
      pared = pared.concat(ds || []);
      this.setState({
        pairedDs: pared,
      });
    }
  }

  _deviceFoundEvent(rsp) {
    //alert(JSON.stringify(rsp))
    var r = null;
    try {
      if (typeof rsp.device == 'object') {
        r = rsp.device;
      } else {
        r = JSON.parse(rsp.device);
      }
    } catch (e) {
      //alert(e.message);
      //ignore
    }
    //alert('f')
    if (r) {
      let found = this.state.foundDs || [];
      if (found.findIndex) {
        let duplicated = found.findIndex(function (x) {
          return x.address == r.address;
        });
        //CHECK DEPLICATED HERE...
        if (duplicated == -1) {
          found.push(r);
          this.setState({
            foundDs: found,
          });
        }
      }
    }
  }

  _renderRow(rows) {
    let items = [];
    for (let i in rows) {
      let row = rows[i];
      if (row.address) {
        items.push(
          <View>
            <TouchableOpacity
              key={new Date().getTime() + i}
              onPress={() => {
                this.setState({
                  loading: true,
                });
                BluetoothManager.connect(row.address).then(
                  (s) => {
                    //  console.log(row);
                    this.setState(
                      {
                        loading: false,
                        boundAddress: row.address,
                        name: row.name || 'UNKNOWN',
                      },
                      () => {
                        this.PrinterData();
                      },
                    );
                    // console.log(this.state.name)
                  },
                  (e) => {
                    this.setState(
                      {
                        loading: false,
                      },
                      () => {},
                    );
                    alert(e);
                  },
                );
              }}>
              <View style={global.print_Box}>
                <Text style={global.Bold_Text}>{row.name || 'UNKNOWN'}</Text>
              </View>
            </TouchableOpacity>
          </View>,
        );
      }
    }
    return items;
  }

  PrinterData = async () => {

    
    try {

     
     


      await BluetoothEscposPrinter.printerInit();
      await BluetoothEscposPrinter.printerLeftSpace(0);

      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER,
      );
      await BluetoothEscposPrinter.setBlob(0);
      //    await  BluetoothEscposPrinter.printText( this.state.test+ "\r\n", {

      //        encoding: 'GBK',
      //        codepage: 0,
      //        widthtimes: 3,
      //        heigthtimes: 3,
      //        fonttype: 1
      //    });

      //    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);

      //    await  BluetoothEscposPrinter.printText("--------------------------------\r\n", {});

      //    let columnWidths = [12, 8 ,12];
      //       await BluetoothEscposPrinter.printColumn(columnWidths,
      //        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT,  BluetoothEscposPrinter.ALIGN.RIGHT],
      //        ["Name", 'Qty', 'Price',], {});

      //        let columnAligns = [12, 8 ,12];

      //        await  BluetoothEscposPrinter.printText("\r\n", {});
      //        {this.state.arr.map(async(e)=>{

      //             await BluetoothEscposPrinter.printColumn(columnAligns,
      //             [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
      //             [`${e.name}`,`${e.id}`,`${e.color}`], {

      //             })

      //             //await  BluetoothEscposPrinter.printText( e.name + e.id +   "\r\n", {

      //        })}

      //   await BluetoothEscposPrinter.printColumn([12,  12],
      //    [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
      //    [this.props.tableName ,"CheckInTime:"+moment(this.props.checkin_date).format('h:mm a'),], {});

      await BluetoothEscposPrinter.printText('\r\n', {});
      await BluetoothEscposPrinter.printText( this.props.tableName + '\n\r', {});
      await BluetoothEscposPrinter.printText('\r\n', {});

      await BluetoothEscposPrinter.printColumn(
        [24],
        [BluetoothEscposPrinter.ALIGN.CENTER],
        ['Check In Time:' + moment(this.props.checkin_date).format('h:mm a')],
        {},
      );

      await BluetoothEscposPrinter.printQRCode(
        WEB_ORDERS + this.props.qrCode,
        300,
        BluetoothEscposPrinter.ERROR_CORRECTION.L,
      ); //.then(()=>{alert('done')},(err)=>{alert(err)});

      await BluetoothEscposPrinter.printText('\r\n', {});
      await BluetoothEscposPrinter.printText('\r\n', {});
      await BluetoothEscposPrinter.printText('\r\n', {});
  
    } catch (e) {
      alert(e.message || 'ERROR');
    }
  };

  render() {
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
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}>
              <Image source={require('../../images/icons8-chevron-left-30.png')} />
            </TouchableOpacity>

            <Image source={require('../../images/Logo.png')} />

            <Text></Text>
          </View>

          <View style={global.common_header_layer2}>
            <View>
              <Text style={global.common_Title}>Printer</Text>
            </View>
          </View>
        </View>
        <ScrollView contentContainerStyle={{paddingHorizontal: 15}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <Text style={global.Bold_Text}>
              Connected To:
              <Text style={{color: '#000'}}>
                {!this.state.name ? 'No Devices' : this.state.name}
              </Text>
            </Text>

            <Switch
              trackColor={{false: '#76543A', true: '#EFCB38'}}
              value={this.state.bleOpend}
              onValueChange={(v) => {
                this.setState({
                  loading: true,
                });

                if (!v) {
                  BluetoothManager.disableBluetooth().then(
                    () => {
                      this.setState({
                        bleOpend: false,
                        loading: false,
                        foundDs: [],
                        pairedDs: [],
                      });
                    },
                    (err) => {
                      alert(err);
                    },
                  );
                } else {
                  BluetoothManager.enableBluetooth().then(
                    (r) => {
                      var paired = [];
                      if (r && r.length > 0) {
                        for (var i = 0; i < r.length; i++) {
                          try {
                            paired.push(JSON.parse(r[i]));
                          } catch (e) {
                            //ignore
                          }
                        }
                      }
                      this.setState({
                        bleOpend: true,
                        loading: false,
                        pairedDs: paired,
                      });
                    },
                    (err) => {
                      this.setState({
                        loading: false,
                      });
                      alert(err);
                    },
                  );
                }
              }}
            />
          </View>

          <View>
            {/* {this.state.loading ? (<ActivityIndicator  color="#EFCB38" animating={true}/>) : null} */}
            <View>{this._renderRow(this.state.foundDs)}</View>
          </View>

          {this.state.loading ? <ActivityLoader /> : null}

          <View style={{flex: 1, flexDirection: 'column'}}>
            {this._renderRow(this.state.pairedDs)}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingVertical: 30,
            }}>
            {/* {  this.state.boundAddress.length > 0 ?    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () =>  this.PrinterData() }
      ],
      { cancelable: false }
    )
   : null



              } */}
          </View>
        </ScrollView>
      </View>
    );
  }

  _selfTest() {
    this.setState(
      {
        loading: true,
      },
      () => {
        BluetoothEscposPrinter.selfTest(() => {});

        this.setState({
          loading: false,
        });
      },
    );
  }

  _scan() {
    this.setState({
      loading: true,
    });
    BluetoothManager.scanDevices().then(
      (s) => {
        var ss = s;
        var found = ss.found;
        try {
          found = JSON.parse(found); //@FIX_it: the parse action too weired..
        } catch (e) {
          //ignore
        }
        var fds = this.state.foundDs;
        if (found && found.length) {
          fds = found;
        }
        this.setState({
          foundDs: fds,
          loading: false,
        });
      },
      (er) => {
        this.setState({
          loading: false,
        });
        alert('error' + JSON.stringify(er));
      },
    );
  }
}

const mapStateToProps = (state) => ({
  tableName: state.summaryReducer.tableName,

  checkin_date: state.summaryReducer.checkin_date,

  qrCode: state.summaryReducer.qrCode,
});
//console.log(this.props.checkin_date)

export default connect(mapStateToProps)(Printer);
