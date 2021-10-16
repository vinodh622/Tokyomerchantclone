import {StyleSheet, Dimensions} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;

export const global = StyleSheet.create({
  // =========== SplashScreen ===== //

  // =========== SplashScreen ===== //

  splashScreenwrapper: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  splashText: {
    fontSize: 60,
    color: '#76543A',
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
  },

  // =========== SplashScreen ===== //

  //<<<====== Login ==========>>//

  loginsec1: {
    flex: 0.4,
    backgroundColor: '#EFCB38',
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginsec2: {
    backgroundColor: '#FFE36E',
    paddingHorizontal: 23,
    paddingTop: 80,
    flex: 1,
    position: 'relative',
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
  },

  commonFlex: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#EFCB38',
  },

  brandText: {fontSize: 40, color: '#fff'},

  LtTitle: {
    fontSize: 25,
    color: '#76543A',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 40,
  },
  headLogo:{ width:90,   height:90},

  flexForm: {
    flexDirection: 'row',
    backgroundColor: '#EBCE59',
    marginBottom: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  ltTextinput: {width: '90%', height: 47, paddingHorizontal: 15},

  loginButtonsec: {marginTop: 20},
  loginButton: {
    backgroundColor: '#76543A',
    color: '#fff',
    padding: 15,
    textAlign: 'center',
    height: 50,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMsg: {color: '#CF091B', fontSize: 12, position: 'relative', top: -2},

  loginErrorMsg: {backgroundColor: '#C7451F', padding: 16, width: '100%'},

  //// ======== Last Activity ======== //

  common_header1: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 55,
    backgroundColor: '#F1D049',
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
    marginBottom: 30,
  },

  common_header1_IOS: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 70,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
    backgroundColor: '#F1D049',
    marginBottom: 30,
  },
  homeHead: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F1D049',
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
    marginBottom: 30,
  },
  homeHead_IOS: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#F1D049',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginBottom: 30,
  },

  noLists: {
    padding: 30,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  common_header_layer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,alignItems:"center"
  },

  iconwrapper: {
    backgroundColor: '#fff',
    padding: 10,
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
    color: '#fff',
  },

  common_header_layer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    
  },

  cmn_header_date: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: '#76543A',
  },
  cm_header_addr: {
    fontSize: 17,
    fontFamily: 'Helvetica-Bold',
    color: '#76543A',


    width: 100,
    textAlign: 'right',
  },

  common_header_bgImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    overflow: 'hidden',
    position: 'absolute',
    top: 10,
    borderWidth: 4,
    borderColor: '#DFC66B',
  },

  innerpageContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF5CE',
  },

  activityLists: {
    flexDirection: 'column',
    padding: 15,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    marginBottom: 14,
    borderRadius: 8,
  },

  activityList_wrap1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  activityList_wrap2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 7,
  },

  EmptyListbox: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexWrap: 'wrap',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    marginBottom: 14,
    borderRadius: 6,
  },

  emptyBoxtext: {color: '#ACACAC', fontSize: 14},

  common_wrapper: {
    paddingHorizontal: 15,
    paddingTop: 30,

    borderRadius: 7,
  },

  nohead_wrapper: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },

  nohead_wrapper_IOS: {
    paddingHorizontal: 15,
    paddingTop: 40,
  },

  common_wrapper_IOS: {
    paddingHorizontal: 15,
    paddingTop: 65,

    borderRadius: 7,
  },

  flextitleSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },

  common_Title: {fontSize: 20, color: '#76543A', fontFamily: 'Helvetica-Bold'},

  activitycancel_Btn: {
    backgroundColor: '#76543A',
    paddingVertical: 4,
    borderRadius: 29,
    paddingHorizontal: 13,
  },
  activitycancled_btn: {
    backgroundColor: '#E7E7E7',
    paddingVertical: 4,
    borderRadius: 29,
    paddingHorizontal: 11,
  },

  activitycancled_Text: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#BDBDBD',
  },

  activityView_All: {
    backgroundColor: '#EFCB38',
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 29,
  },

  yellow_btn_text: {
    color: '#76543A',
    fontFamily: 'Helvetica-Bold',
    fontSize: 14,
  },
  brown_btn_text: {color: '#fff', fontFamily: 'Helvetica-Bold', fontSize: 12},
  brownText_btn: {color: '#76543A', fontFamily: 'Helvetica-Bold', fontSize: 12},

  activitydetailbox: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    marginBottom: 19,
    borderRadius: 8,
  },
  activitydt_Flexctx: {flexDirection: 'row', marginBottom: 13},

  common_header2: {
    paddingTop: 20,
    paddingBottom: 60,
    backgroundColor: '#EFCB38',
    padding: 20,
    flexDirection: 'column',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    marginBottom: 40,
  },

  common_header2IOS: {
    paddingTop: 70,
    backgroundColor: '#EFCB38',
    padding: 20,
    flexDirection: 'column',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    marginBottom: 40,
  },

  common_header_bg_image: {
    width: 140,
    height: 140,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#FFF5CE',
  },

  outletId: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 26,
    color: '#76543A',
  },
  outletName: {marginTop: 10, color: '#76543A', textAlign: 'center'},
  common_header2_btn_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
  },

  common_btn_box: {
    backgroundColor: '#76543A',
    flexDirection: 'row',
    minWidth: 155,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btnText: {color: '#fff', marginLeft: 10, fontFamily: 'Helvetica-Bold'},

  white_Btn: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    minWidth: 155,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  brown_Btn: {
    backgroundColor: '#76543A',
    flexDirection: 'row',
    minWidth: 155,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  diasbleBtn: {
    backgroundColor: '#BBB083',
    flexDirection: 'row',
    minWidth: 155,
    padding: 15,
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  btnText_white: {
    color: '#76543A',
    marginLeft: 10,
    fontFamily: 'Helvetica-Bold',
  },

  activityLabel: {
    width: wp('30%'),
    color: '#ACACAC',
    fontFamily: 'Helvetica-Bold',
    fontSize: 14,
  },
  activityValue: {
    width: wp('55%'),
    color: '#ACACAC',
    paddingLeft: 20,
    fontFamily: 'Helvetica',
    fontSize: 14,
  },

  popupBg: {
    backgroundColor: '#00000045',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    paddingTop: 70,
  },

  popupBg1: {
    backgroundColor: "#3B3B3B7F",
    padding: 10,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
    flex: 1,
  },
  QrmodelBg: {
    backgroundColor: '#000000cf',
    padding: 10,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
  },

  popupBox: {
    backgroundColor: '#EFCB38',

    paddingHorizontal: 16,
    width: '100%',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'relative',
  },

  popupBox1: {
    backgroundColor: '#EFCB38',
    paddingVertical: 50,
    paddingHorizontal: 16,
    width: '100%',

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    position: 'relative',
  },

  pinBox: {
    backgroundColor: '#fff',

    width: 50,
    paddingHorizontal: 3,
    paddingVertical: 10,

    borderRadius: 9,
    textAlign: 'center',
    color: '#EFCB38',

    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
  },

  popup_Title1: {
    fontSize: 25,
    color: '#76543A',
    marginBottom: 10,
    textAlign: 'center',

    fontFamily: 'Helvetica-Bold',
  },

  popup_Title2: {
    fontSize: 15,
    color: '#76543A',
    marginBottom: 15,
    textAlign: 'center',
  },
  closeIconsec: {position: 'absolute', top: 13, right: 13},

  confirm_btncancel: {
    paddingHorizontal: 30,
    paddingVertical: 13,
    backgroundColor: '#fff',
    color: '#76543A',
    width: 131,
    textAlign: 'center',
    marginHorizontal: 7,
    borderRadius: 6,
  },

  confirm_proceed: {
    paddingHorizontal: 30,
    paddingVertical: 13,
    backgroundColor: '#76543A',
    color: '#fff',
    width: 131,
    textAlign: 'center',
    borderRadius: 6,
    marginHorizontal: 7,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  successBanner: {
    flex: 1,
    backgroundColor: '#EFCB38',
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 30,
  },

  successBanner_IOS: {
    flex: 1,
    backgroundColor: '#EFCB38',
    paddingHorizontal: 15,
    paddingTop: 100,
    paddingBottom: 30,
  },
  flexpart1: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  flexpart2: {flex: 1, justifyContent: 'flex-end'},
  common_smtitle: {fontSize: 15, marginTop: 15, color: '#76543A'},

  LargeBtn1: {
    backgroundColor: '#76543A',
    padding: 14,
    textAlign: 'center',
    borderRadius: 5,
    marginBottom: 16,
  },

  Homebtn: {
    backgroundColor: '#FFF5CE',
    padding: 14,
    textAlign: 'center',
    borderRadius: 5,
    marginBottom: 16,
  },
  btnwhite_Text: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
  },
  btnBrown_Text: {
    color: '#76543A',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
  },
  whiteText: {color: '#fff', textAlign: 'center', fontFamily: 'Helvetica-Bold'},
  white_Btn_Text: {
    color: '#76543A',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
  },

  //======= Payment page's ===== //
  paymentdt_Section: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 30,
    borderRadius: 7,
  },

  Paymentdt_Amount: {
    color: '#76543A',
    fontFamily: 'Helvetica-Bold',
    fontSize: 18,
    marginVertical: 10,
  },

  pay_dt_bold_Md: {color: '#76543A', fontFamily: 'Helvetica', fontSize: 14},

  transaction_cancelBtn: {},

  activity_trimText: {
    color: '#76543A',
    fontFamily: 'Helvetica',
    fontSize: 14,
    width: 100,
    textTransform: 'capitalize',
  },

  pay_dt_bold: {color: '#76543A', fontSize: 17, fontFamily: 'Helvetica-Bold'},

  pay_mer_amt: {
    color: '#76543A',
    fontSize: 17,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
  },

  pay_merName: {
    color: '#76543A',
    fontSize: 17,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
    width: 144,
  },

  pay_dt_md: {color: '#B0B0B0', fontFamily: 'Helvetica', fontSize: 14},
  pay_dt_topUp: {marginTop: 6, color: '#B0B0B0', fontFamily: 'Helvetica'},

  pay_dt_date: {marginTop: 6, color: '#B0B0B0', fontFamily: 'Helvetica'},

  Transaction_lists: {flexDirection: 'column', marginBottom: 10},

  tr_list_label: {color: '#B2B2B2', fontSize: 14, fontFamily: 'Helvetica'},
  tr_list_value: {
    fontSize: 14,
    color: '#B2B2B2',
    fontFamily: 'Helvetica-Bold',
    marginTop: 4,
  },

  BottomModal_Bg: {
    backgroundColor: '#00000082',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  bottomModal: {
    backgroundColor: '#EFCB38',
    padding: 17,
    paddingVertical: 60,
    flex: 0.6,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    position: 'relative',
  },
  reasonBox: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 13,
    marginTop: 30,
    elevation: 4,
    minHeight: 60,
  },

  smbutton: {
    backgroundColor: '#76543A',
    padding: 15,
    width: 260,
    borderRadius: 12,
    margin: 0,
    alignItems: 'center',
  },

  Payment_Btn: {
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'row',
    borderRadius: 6,
    paddingHorizontal: 30,
    height: 45,
    marginHorizontal: 10,
  },

  Inputbox: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    height: 49,
    paddingHorizontal: 12,
    borderRadius: 10,
    width: '100%',
    marginTop: 15,
  },

  RmText: {
    fontSize: 19,
    paddingRight: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#76543A',
  },

  payment_submit_btn: {
    backgroundColor: '#76543A',
    width: 200,
    padding: 15,
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  CustomTabheader: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#F1D049',
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
  },

  CustomTabheader_IOS: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#F1D049', height:60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17, paddingVertical:10,
  },

  Menu_Align: {alignItems: 'center', position: 'relative'},

  MenuName: {fontSize: 12, paddingTop: 3, fontFamily: 'Helvetica',},

  Active_menu: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#C7451F',
    paddingTop: 3,
  },
  circleMenu_layer1: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',

    top: -44,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  circleMenu_layer2: {
    width: 50,
    height: 50,
    backgroundColor: '#EFCB38',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  Menu_Center: {fontSize: 12 ,paddingTop:22  ,fontFamily: 'Helvetica',},

  Actionsheet_bg: {
    backgroundColor: '#FFF5CE',
    paddingHorizontal: 10,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },

  actionBox: {backgroundColor: '#fff', borderRadius: 10},

  actionHeader: {padding: 16, textAlign: 'center'},

  sheetContent: {padding: 18, borderBottomColor: '#ccc', borderTopWidth: 1},

  sheetCancel: {
    backgroundColor: '#C7451F',
    padding: 15,
    borderRadius: 6,
    marginVertical: 20,
  },
  sheetCancel_Text: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },

  Sheethead_title: {
    fontSize: 17,
    textAlign: 'center',
    color: '#C7451F',
    fontFamily: 'Helvetica-Bold',
  },

  Sheet_ctx_text: {
    fontSize: 16,
    color: '#76543A',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
  },

  ScanDetails: {justifyContent: 'center', alignItems: 'center'},

  indicatorBg: {
    width: 80,
    height: 80,
 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  dateSection: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 0,
    color: '#76543A',
    textAlign: 'right',
  },

  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#76543A',
    textAlign: 'center',
    width: 123,
    borderRadius: 5,
    color: '#fff',
  },

  QrtopArrow: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  QrMessage: {fontSize: 16, fontFamily: 'Helvetica-Bold', textAlign: 'center'},

  //========== Profile ======>>>> ////

  GradientBg_bigsec: {
    width: '100%',
    position: 'relative',
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 80,
  },
  GradientBg_bigsec_IOS: {
    width: '100%',
    position: 'relative',
    marginBottom: 20,
    paddingTop: 40,
    paddingBottom: 80,
  },

  Profileheader: {
    paddingHorizontal: 15,
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },

  profileImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },

  ProfileImagebox: {
    width: 140,
    height: 140,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#FFF5CE',
    marginBottom: 20,
  },
  Normal_Text: {color: '#76543A', paddingTop: 10},

  listsBox_Active: {
    backgroundColor: '#fff',
    paddingHorizontal: 23,
    paddingVertical: 8,
    borderRadius: 50,
    marginRight: 14,
  },
  listsBox_Inactive: {
    backgroundColor: '#76543A',
    paddingHorizontal: 23,
    paddingVertical: 8,
    borderRadius: 50,
    marginRight: 14,
  },

  active_ListText: {
    color: '#76543A',
    fontFamily: 'Helvetica-Bold',
    textTransform: 'capitalize',
  },

  inactive_Liststext: {
    color: '#fff',
    fontFamily: 'Helvetica-Bold',
    textTransform: 'capitalize',
  },

  header_arrow: {paddingLeft: 15},

  //========== Profile ======>>>> ////

  reservationLists: {marginBottom: 20},

  listWrapper1: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#76543A',
  },
  listWrapper2: {
    fontSize: 13,
    fontFamily: 'Helvetica',
    color: '#ACACAC',
  },
  listWrapper_Text: {
    width: 100,
    fontSize: 13,
    fontFamily: 'Helvetica',
    color: '#ACACAC',
    textTransform: 'capitalize',
  },
  outlet_Text: {
    width: 100,
    fontSize: 13,
    fontFamily: 'Helvetica',
    color: '#ACACAC',
    textTransform: 'capitalize',
  },

  date_Reservation: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: '#76543A',
    marginVertical: 10,
  },
  reservation_Time: {fontSize: 15, fontFamily: 'Helvetica', color: '#76543A'},

  ButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  singleButtonWrapper: {},

  PAX_counterSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 250,
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',

    elevation: 5,
    marginTop: 30,
    paddingBottom: 15,
  },

  counterBox: {
    flexDirection: 'row',
    borderRadius: 6,
    width: '100%',
    marginBottom: 20,
  },

  paxCount: {
    backgroundColor: '#FFF5CE',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '40%',
    textAlign: 'center',
    color: '#76543A',
  },

  pax_Counters: {
    backgroundColor: '#EFCB38',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  pax_Title: {marginBottom: 15, textAlign: 'center'},

  countIcons: {fontSize: 30, color: '#76543A'},

  ///====== Day end Reprt ==== ///

  reportCalendersec: {
    padding: 15,
    backgroundColor: '#F3D96E',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
  },

  downArrow: {width: 16, height: 16},

  ///====== Day end Reprt ==== ///

  reservationModels: {
    backgroundColor: '#000000cf',

    width: '100%',
    height: '100%',
    flexDirection: 'column',

    position: 'relative',

    justifyContent: 'flex-end',
  },

  reservationBox: {
    backgroundColor: '#EFCB38',

    paddingHorizontal: 16,
    paddingTop: 100,
    paddingBottom: 20,
    width: '100%',

    alignItems: 'center',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'relative',
    flex: 0.7,
  },

  reservationInputbox: {
    paddingVertical: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 19,
    borderRadius: 15,
    width: 340,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  selectOutletbox: {
    backgroundColor: '#fff',
    padding: 10,
    width: 330,
    height: 260,
    paddingBottom: 0,
    borderRadius: 7,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    overflow: 'hidden',
  },
  outletLists: {padding: 15, borderRadius: 7},

  outletNmae: {color: '#957C1F', fontFamily: 'Helvetica'},

  slectoutletHead: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 12,
    justifyContent: 'space-between',
    paddingLeft: 16,
  },
  slectoutletheadText: {color: '#B6B6B6'},

  LargeBtn_cancelled: {
    backgroundColor: '#BBB083',
    paddingVertical: 16,
    borderRadius: 6,
  },
  LargeBtn_cancelledText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
  },

  //------Menu Box ------//

  menuBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    height: 80,
    marginBottom: 20,
  },
  productName: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#76543A',
   
  },
  productPrice: {fontSize: 13, fontFamily: 'Helvetica-Bold', color: '#76543A'},

  menuBox_col2: {
    flex: 1.1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'space-between', 
  },
  menuBox_col3: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'flex-end'
  },

  pr_Editbtn: {
    backgroundColor: '#E7E7E7',
    paddingHorizontal: 10,
    borderRadius: 100,
    paddingVertical: 5,
  },

  productStatus: {
    fontFamily: 'Helvetica',
    color: '#76543A',
    textAlign: 'right',fontSize:13
  },
  pr_statusText: {color: '#8F8F8F', fontSize: 13},

  producType: {color: '#ACACAC', fontFamily: 'Helvetica', width: 150},

  productImagebanner: {width: '100%', height: 215  },

  //------Menu Box End's ------//

  //Product-Detail//

  productDetail_Box: {
    backgroundColor: '#fff',
    paddingHorizontal: 19,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 4,
    paddingVertical: 20,
  },
  productAmount: {
    fontSize: 17,
    color: '#76543A',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 15,
  },

  md_Button: {
    backgroundColor: '#76543A',
    paddingHorizontal: 20,
    paddingVertical: 17,
    borderRadius: 7,
    width: 320,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  Btn_ctx: {justifyContent: 'center', alignItems: 'center', marginTop: 30},
  //Product-Detail End's//

  selecter_Box: {
    padding: 16,

    backgroundColor: '#F3D96E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  selecter_Dropdown: {
    backgroundColor: '#F3D96E',
    padding: 10,
    width: '100%',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },

  normalText: {fontFamily: 'Helvetica', color: '#76543A', fontSize: 14},
  selecter_Dropdowntypes: {
    paddingHorizontal: 10,
    borderRadius: 7,
    paddingVertical: 14,
  },
  Bold_Text: {color: '#76543A', fontFamily: 'Helvetica-Bold'},
  greyText: {color: '#ACACAC', fontFamily: 'Helvetica'},

  Tablecheckin_Btn: {
    backgroundColor: '#76543A',
    paddingVertical: 5,
    borderRadius: 29,
    paddingHorizontal: 13,
    marginBottom: 10,
  },

  Tablecheckout_Btn: {
    backgroundColor: '#EFCB38',
    paddingVertical: 5,
    borderRadius: 29,
    paddingHorizontal: 13,
    marginBottom: 10,
  },

  //<<=========  Table ====>>>
  tableBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 13,
  },

  //<<=========  Table End's ====>>>

  //===== Summary-Box ======== //

  summaryBox: {
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 20,
    marginBottom: 20,
  },
  summaryWrapcol1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  summaryWrapcol2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  normalText_Bold: {fontFamily: 'Helvetica-Bold', color: '#76543A'},

  sm_Productname: {
    fontFamily: 'Helvetica-Bold',
    color: '#76543A',
    width: 200,
    marginBottom: 10,
  },

  sm_trashIcon: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: '#C93434',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  sm_cancelop0: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 100,
    backgroundColor: '#BBB083',
  },

  sm_cancelop1: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 100,
    backgroundColor: '#76543A',
  },

  //===== Summary-Box End's ======== //
  VoucherBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    right: 0,
    backgroundColor: '#EFCB38',
    padding: 20,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchBox: {
    backgroundColor: '#fff',
    padding: 8,
    flexDirection: 'row',
    borderRadius: 12,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 20,
  },

  tabbarMenuwidth: {width: windowWidth / 5, alignItems: 'center' ,justifyContent:"flex-end"},

  pr_detailhead: {padding: 15},

  

  print_Box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 15,
  },
    switchActive:{width:60 ,backgroundColor:"#76543A",borderRadius:100 ,height:30 ,flexDirection:"row" ,justifyContent:"space-between" ,alignItems:"center",paddingLeft:6 ,paddingRight:3 ,paddingVertical:2}
,
  switchInActive:{width:60 ,backgroundColor:"#eee",borderRadius:100 ,height:30 ,flexDirection:"row" ,justifyContent:"space-between" ,alignItems:"center",paddingLeft:3 ,paddingRight:6,paddingVertical:2}

  
  
});
