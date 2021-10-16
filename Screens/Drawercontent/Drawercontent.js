import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Dimensions, Image} from 'react-native';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import {useDispatch} from 'react-redux';
import {Ltout} from '../../actions/loginActions';

const windowHeight = Dimensions.get('window').height;

export function Drawercontent(props) {

  const dispatch = useDispatch();

  const flushPage = () => {
    dispatch(Ltout());
  };

  return (
    <View
      style={{flex: 1, flexDirection: 'column', backgroundColor: '#FFF5CE'}}>
      <DrawerContentScrollView {...props}>
        <View>
          <View style={styles.drawerMenuSec}>

            {/* <View style={styles.drwawerLogobox}>
              <Image
                source={require('../../images/Drawerlogo.png')}
                style={{width: 107, height: 43}}
                resizeMode="cover"
              />
            </View> */}


            <View  style={{justifyContent:"center",alignItems:"center",marginBottom:20}}>
              <Image
                source={require('../../images/Logo_Big1.png')}
               
                resizeMode="cover"
              />
            </View>



            <View style={styles.menuLists}>
              <Image
                source={require('../../images/drawerIcon1.png')}
                style={styles.drawrIcons}
              />

              <Text
                style={styles.drwerMenus}
                onPress={() => props.navigation.navigate('Profile')}>
                Profile
              </Text>
            </View>

            <View style={styles.menuLists}>
              <Image
                source={require('../../images/drawericon2.png')}
                style={styles.drawrIcons}
              />
              <Text
                style={styles.drwerMenus}
                onPress={() => props.navigation.navigate('Menu')}>
                Menu
              </Text>
            </View>

            <View style={styles.menuLists}>
              <Image
                source={require('../../images/drawericon3.png')}
                style={styles.drawrIcons}
              />

              <Text
                style={styles.drwerMenus}
                onPress={() => props.navigation.navigate('TransactionHistory')}>
                Payment History
              </Text>
            </View>

          
            <View style={styles.menuLists}>
              <Image
                source={require('../../images/printericon.png')}
                style={styles.drawrIcons}
              />

              <Text
                style={styles.drwerMenus}
                onPress={() => props.navigation.navigate('Settings')}>
                Printer
              </Text>
            </View>




          
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drwawerLogobox: {
    backgroundColor: '#EFCB38',
    paddingHorizontal: 10,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    paddingVertical: 25,
  },

  drawerContent: {
    flex: 1,
    flexDirection: 'column',
  },

  drawerMenuSec: {
    padding: 30,
  },
  menuLists: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  drwerMenus: {
    fontSize: 20,
    color: '#76543A',
    fontFamily: 'Helvetica',
    paddingLeft: 20,
  },
  supportSec: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
  },
  drawerBottomMenu: {
    paddingLeft: 20,
    fontSize: 15,
    color: '#000',
  },
  drawrIcons: {width: 20, height: 20},
});
