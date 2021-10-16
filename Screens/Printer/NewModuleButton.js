import React from 'react';
import { NativeModules, Button  ,SafeAreaView ,UIManager} from 'react-native';



const NewModuleButton = () => {


    const onPress = () => {
      NativeModules.RNtest1.addEvent ('testName', 'testLocation');
      };
  return (
  <SafeAreaView>

<Button
      title="Click to invoke your native module!"
      color="#841584"
      onPress={onPress}
    />

  </SafeAreaView>
  
  );
};

export default NewModuleButton;