import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Screen from '../commonComponent/Screen'
import * as Animatable from 'react-native-animatable';


const Splash = ({navigation}) => {
    useEffect(()=>{
    setTimeout(()=>{
        navigation.reset({index:0,  routes: [{ name: "Author List" }]})
    },2000)
    },[])
  return (
    <Screen>
        <View style={{}}>
        <Animatable.View animation={'zoomIn'} >
        <Text style={styles.splashText}>
            Blog
        </Text>
        <Text style={styles.splashText}>
            App
        </Text>
        </Animatable.View>
        </View>
    </Screen>
  )
}

export default Splash

const styles = StyleSheet.create({
    splashText:{
        fontSize:40,
        color:'#194553'

    }
})