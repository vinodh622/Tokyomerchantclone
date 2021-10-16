import React, {useState} from 'react';
import {View, Text, Modal, ActivityIndicator} from 'react-native';
import {global} from '../../Styles/global';

export default function ActivityLoader() {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View>
      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <View style={{  padding: 10,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
    flex: 1}}>
          <View style={global.indicatorBg}>
            <ActivityIndicator size="large" color="#EFCB38" />
          </View>
        </View>
      </Modal>
    </View>
  );
}
