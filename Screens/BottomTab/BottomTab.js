import React, { useRef ,useEffect } from "react";
import { View, Button  ,Text} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
 
export default function BottomTab({navigation}) {

  const searchInput = useRef();
  //console.log(searchInput.current)


  useEffect(() => {
  
    searchInput.current.open()

  }, []);
  



  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      
      }}
    >
<Text>dw</Text>
      
      <RBSheet
  ref={searchInput} 
        closeOnDragDown={()=>navigation.navigate('Table')}
        closeOnPressMask={()=>navigation.navigate('Table')}
        customStyles={{
          wrapper: {
            backgroundColor: "red"
          },
         
        }}
      >
      <Text>dwdwdw</Text>




      </RBSheet>
    </View>
  );
}
