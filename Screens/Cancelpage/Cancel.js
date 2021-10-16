import React from 'react'
import { View, Text, TextInput, Platform,   StatusBar, SafeAreaView, Image, TouchableOpacity, Dimensions, TouchableHighlight } from 'react-native'
import { global } from '../../Styles/global'


export default function Cancel() {
    return (
       <View style={ Platform.OS ==="android" ?  global.successBanner  : global.successBanner_IOS }>

<View style={global.flexpart1}>
<Image source={require('../../images/Cancelicon.png')} style={{marginBottom:30 ,width:150 ,height:150 ,resizeMode:"contain"}}/>

<Text style={global.common_Title}>Insufficient Balance</Text>

<Text style={global.common_smtitle}>Customer has insufficient balance</Text>


</View>


<View style={global.flexpart2}>

<TouchableOpacity><View style={global.LargeBtn1}><Text style={ global.btnwhite_Text} >Cancel</Text></View></TouchableOpacity>


    
</View>







       </View>
    )
}
