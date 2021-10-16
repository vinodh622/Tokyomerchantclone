import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  SafeAreaView,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  ImageBackground,
  Alert,
  ActivityIndicator,
  TouchableHighlight,
  RefreshControl,
} from 'react-native';

import {global} from '../../Styles/global';

import * as Animatable from 'react-native-animatable';
import {STOCK_STATUS_UPDATE, BASEURL} from '.././API/Api';

import {connect} from 'react-redux';

import ActivityLoader from '../ActivityLoader/ActivityLoader';
import {
  stockstatusAction,
  stockstatusUpdate,
} from '../../actions/stockstatusAction';
import Toast from 'react-native-simple-toast';

import {ProductlistAction} from '../../actions/ProductlistAction';

import {CategorylistAction} from '../../actions/CategorylistAction';
import {Category_wise_product} from '../../actions/Category_wise_productAction';


const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalvisibe1: false,
      modalvisibe2: false,
      products: [],
      category: [],

      Error: false,
      loading: true,
      search: '',
      selectedId: 0,
      homecategory: [
        {
          id: 0,
          categoryname: 'All',
        },
      ],
      productName: '',
      productId: '',
      productAmount: '',
      productImage: '',
      setStatus: 'Select Availability Status',
      outletDropdown: false,
      setstatusId: '',
      indicatorLoader: false,
      pageRefreshing: false,
      setcategoryName: ' ',
      isEnabled: false,
    };
  }
  abort = new AbortController();

  listProduct = async () => {
    // this.setState({loading: true});
    await this.props
      .ProductlistAction(this.props.merchentToken)

      .then(() => {
        this.setState({loading: false});

        if (this.props.productlistStatus === 'success') {
          /// console.log("w")
          this.setState({products: [...this.props.productListdata]});

          this.setState({Error: false});

          //console.log("ok")
        } else if (this.props.productlistStatus === 'failure') {
          this.setState({products: []});

          this.setState({Error: true});
        }
      });
  };

  //listProduct();

  listCategory = async () => {
    await this.props
      .CategorylistAction(this.props.merchentToken)

      .then(() => {
        if (this.props.categorylistStatus === 'success') {
          this.setState({category: this.props.categorylistData});

          this.setState({Error: false});
        } else if (this.props.categorylistStatus === 'failure') {
          this.setState({category: []});

          this.setState({Error: true});
        }
      });
  };

  catProducts = async (id) => {
    await this.props
      .Category_wise_product(this.props.merchentToken, id)

      .then(() => {
        this.setState({loading: false});

        if (this.props.categorywise_Status === 'success') {
          // console.log("succ")

          this.setState({products: this.props.categorywise_Data});
          this.setState({Error: false});
        } else if (this.props.categorywise_Status === 'failure') {
          //console.log("fail")
          this.setState({products: []});

          this.setState({Error: true});
        }
      });
  };

  componentDidMount() {
    this.setState({loading: true});

    if (this.state.selectedId === 0) {
      this.listProduct();
    } else {
      this.catProducts(this.state.selectedId);
    }

    this.listCategory();

    this.props.stockstatusAction(this.props.merchentToken);
  }

  componentWillUnmount() {
    this.abort.abort();
  }

  categoryProduct = (id) => {
    // console.log(id)
    this.setState({loading: true});

    this.setState({selectedId: id});

    if (id === 0) {
      this.listProduct();
    } else {
      this.catProducts(id);
    }
  };

  getStausdata = async (id, stock_status) => {
    var form = new FormData();

    form.append('api_token', this.props.merchentToken);
    form.append('productid', id);
    form.append('status', stock_status === 'Available' ? 2 : 1);

    fetch(STOCK_STATUS_UPDATE, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())

      .then((data) => {
        if (this.state.selectedId === 0) {
          this.listProduct();
        } else {
          this.catProducts(this.state.selectedId);
        }

        if (data.status === 'success') {
          Alert.alert(
            '',
            data.data,
            [
              {
                text: 'OK',
              },
            ],
            {cancelable: false},
          );
        }
      })

      // .then(() => {
      //   if (this.state.selectedId === 0) {

      //   } else {
      //     this.catProducts(this.state.selectedId);
      //   }
      // })

      .catch((e) => console.log(e));
    // console.log(image);
    // this.setState({modalvisibe1: true});
    // this.setState({
    //   productId: id,
    //   productImage: image,
    //   productName: name,
    //   productAmount: amount,
    //   setcategoryName: categoryName,
    // });
  };

  onRefresh = () => {
    this.setState({pageRefreshing: true});
    wait(1000)
      .then(() => {
        if (this.state.selectedId === 0) {
          this.listProduct();
        } else {
          this.catProducts(this.state.selectedId);
        }

        this.listCategory();
      })
      .then(() => {
        this.setState({pageRefreshing: false});
      });
  };

  render() {
    const updateSearch = this.state.products.filter((e) =>
      e.name.toLowerCase().includes(this.state.search.toLowerCase()),
    );

    // const {navigation}=this.props
    //console.log(navigation)
    //  this.listProduct()

    return (
      <View style={global.innerpageContainer}>
        <StatusBar
          backgroundColor="#EFCB38"
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
              onPress={() => this.props.navigation.openDrawer()}>
              <Image source={require('../../images/HamburgerMenu.png')} />
            </TouchableOpacity>

            <Image source={require('../../images/Logo.png')} style={global.headLogo} />

            <Text></Text>
          </View>

          <View style={global.common_header_layer2}>
            <View>
              <Text style={global.common_Title}>Menu</Text>
            </View>
          </View>

          <View style={global.common_header2_btn_wrapper}>
            <View style={global.searchBox}>
              <Image
                source={require('../../images/searchIcon.png')}
                style={{width: 20, height: 20}}
              />

              <TextInput
                placeholder="Search  by item  name"
                placeholderTextColor="#BCBCBC"
                style={{width: '100%', height: 40, paddingLeft: 15}}
                onChangeText={(e) => this.setState({search: e})}
              />
            </View>
          </View>
        </View>

        <View style={{paddingTop: 20, paddingHorizontal: 15}}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl onRefresh={() => this.onRefresh()} />
            }>
            {this.state.homecategory.map((e) => {
              return (
                <View key={e.id}>
                  <TouchableOpacity onPress={() => this.categoryProduct(e.id)}>
                    <View
                      style={
                        e.id === this.state.selectedId
                          ? global.listsBox_Active
                          : global.listsBox_Inactive
                      }>
                      <Text
                        style={
                          e.id === this.state.selectedId
                            ? global.active_ListText
                            : global.inactive_Liststext
                        }>
                        {e.categoryname}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}

            {this.state.category.map((e) => {
              return (
                <View key={e.id}>
                  <TouchableOpacity onPress={() => this.categoryProduct(e.id)}>
                    <View
                      style={
                        e.id === this.state.selectedId
                          ? global.listsBox_Active
                          : global.listsBox_Inactive
                      }>
                      <Text
                        style={
                          e.id === this.state.selectedId
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 20,
            paddingBottom: 60,
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.pageRefreshing}
              onRefresh={() => this.onRefresh()}
            />
          }>
          <Animatable.View animation="fadeInUp">
            <View>
              {this.state.loading ? (
                <ActivityLoader />
              ) : (
                <View>
                  {this.state.Error ? (
                    <View style={global.EmptyListbox}>
                      <Text style={global.emptyBoxtext}>
                        No Products Found.
                      </Text>
                    </View>
                  ) : (
                    <View>
                      {updateSearch.length > 0 ? (
                        updateSearch.map((e) => {
                          return (
                            <View key={e.id}>
                              <View style={global.menuBox}>
                                <View style={{flex: 0.9, overflow: 'hidden'}}>
                                  <Image
                                    source={{
                                      uri: BASEURL + e.image,
                                    }}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      aspectRatio: 1 / 1,
                                      borderTopLeftRadius: 5,
                                      borderBottomLeftRadius: 5,
                                    }}
                                    resizeMode="cover"
                                  />
                                </View>

                                <View style={global.menuBox_col2}>
                                  <Text
                                    style={global.productName}
                                    numberOfLines={1}
                                    ellipsizeMode="tail">
                                    {e.id < 10 ? '00' + e.id : e.id} {e.name}
                                  </Text>

                                  <Text style={global.productPrice}>
                                    RM{' '}
                                    {(Math.round(e.amount * 100) / 100).toFixed(
                                      2,
                                    )}
                                  </Text>

                                  <Text
                                    style={global.producType}
                                    numberOfLines={1}
                                    ellipsizeMode="tail">
                                    {e.catename}
                                  </Text>
                                </View>

                                <View style={global.menuBox_col3}>
                                  {e.stock_status === 'Out of Stock' ? (
                                    <TouchableOpacity
                                      style={global.switchActive}
                                      onPress={() =>
                                        this.getStausdata(e.id, e.stock_status)
                                      }>
                                      <Text style={{color: '#fff'}}>On</Text>

                                      <View
                                        style={{
                                          width: 22,
                                          height: 22,
                                          backgroundColor: '#fff',
                                          borderRadius: 50,
                                        }}></View>
                                    </TouchableOpacity>
                                  ) : (
                                    <TouchableOpacity
                                      style={global.switchInActive}
                                      onPress={() =>
                                        this.getStausdata(e.id, e.stock_status)
                                      }>
                                      <View
                                        style={{
                                          width: 22,
                                          height: 22,
                                          backgroundColor: '#fff',
                                          borderRadius: 50,
                                        }}></View>

                                      <Text>Off </Text>
                                    </TouchableOpacity>
                                  )}

                                 

                                  <Text
                                    style={global.productStatus}
                                    numberOfLines={1}>
                                    {e.stock_status}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          );
                        })
                      ) : (
                        <View style={global.EmptyListbox}>
                          <Text style={global.emptyBoxtext}>
                            No Products Found.
                          </Text>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              )}
            </View>
          </Animatable.View>
        </ScrollView>

        <View
          style={
            Platform.OS === 'ios'
              ? global.CustomTabheader_IOS
              : global.CustomTabheader
          }>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Lastactivity')}>
            <View style={global.tabbarMenuwidth}>
              <Image
                source={require('../../images/Hometab.png')}
                style={{width: 18, height: 18}}
              />
              <Text style={global.MenuName}>Home</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Table')}>
            <View style={global.tabbarMenuwidth}>
              <Image
                source={require('../../images/tableicon.png')}
                style={{width: 18, height: 18}}
              />
              <Text style={global.MenuName}>Table</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Actionsheet')}>
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

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Reservation')}>
            <View style={global.tabbarMenuwidth}>
              <Image
                source={require('../../images/calendar.png')}
                style={{width: 18, height: 18}}
              />
              <Text style={global.MenuName}>Reservation</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Summary')}>
            <View style={global.tabbarMenuwidth}>
              <Image
                source={require('../../images/logout.png')}
                style={{width: 18, height: 18}}
              />
              <Text style={global.MenuName}>Day End</Text>
            </View>
          </TouchableOpacity>
        </View>

        {this.state.loading === true ? <ActivityLoader /> : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  merchentToken: state.loginDetails.token,

  stockStatus: state.stocklistReducer.stockStatus,

  stockUpdate_data: state.stockupdateReducer.stockUpdate_data,

  stockupdateStatus: state.stockupdateReducer.stockupdateStatus,

  productlistStatus: state.ProductlistReducer.productlistStatus,

  productListdata: state.ProductlistReducer.productListdata,

  categorylistStatus: state.CategorylistReducer.categorylistStatus,

  categorylistData: state.CategorylistReducer.categorylistData,

  categorywise_Data: state.Category_wise_productReducer.categorywise_Data,
  categorywise_Status: state.Category_wise_productReducer.categorywise_Status,
});
export default connect(mapStateToProps, {
  stockstatusAction,
  stockstatusUpdate,
  ProductlistAction,
  CategorylistAction,
  Category_wise_product,
})(Menu);
