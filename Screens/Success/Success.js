import React from 'react'
import { View, Text,Platform, TextInput, StatusBar, SafeAreaView, Image, TouchableOpacity, Dimensions, TouchableHighlight } from 'react-native'
import { global } from '../../Styles/global'


export default function Success() {
    return (
        <View style={ Platform.OS ==="android" ?  global.successBanner  : global.successBanner_IOS }>

<StatusBar backgroundColor="#EFCB38" barStyle="dark-content" networkActivityIndicatorVisible={true} />


<View style={global.flexpart1}>
<Image source={require('../../images/Tick.png')}  style={{marginBottom: 20, width: 140, height: 140}}/>

<Text style={global.common_Title}>Day End Successful</Text>

<Text style={global.common_smtitle}>Transaction No: 23454567877</Text>


</View>


<View style={global.flexpart2}>


{/* <TouchableOpacity><View style={global.LargeBtn1}><Text style={ global.btnwhite_Text} >View Downloaded Report(PDF)</Text></View></TouchableOpacity> */}


<TouchableOpacity><View style={global.Homebtn}><Text style={global.btnBrown_Text}>Back to Home</Text></View></TouchableOpacity>

    
</View>







       </View>
    )
}
