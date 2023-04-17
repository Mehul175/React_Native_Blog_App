import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { Children } from 'react'

const Screen = ({children}) => {
  return (
    <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#add8e6'}}>
      {children}
    </SafeAreaView>
  )
}

export default Screen

const styles = StyleSheet.create({})