import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from './Splash'
import AuthorList from './AuthorList'
import PostScreen from './PostScreen'
import AuthorDetails from './AuthorDetails'
// import { createDrawerNavigator } from '@react-navigation/drawer'

const Stack = createNativeStackNavigator()
// const Drawer = createDrawerNavigator()
// const DrawerScreen = () =>{
//   return(
//     <Drawer.Navigator initialRouteName="Author List">
//     <Drawer.Screen name="Author List" component={AuthorList} />
//     <Drawer.Screen name="Post List" component={PostList} />
//   </Drawer.Navigator>
//   )
// }
const Route = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash' >
            <Stack.Screen name="Splash"    options={{headerShown: false}} component={Splash} />
            <Stack.Screen name="Author List" component={AuthorList} />
            <Stack.Screen name="Author Detail" component={AuthorDetails} />
            <Stack.Screen name="Post Screen" component={PostScreen} />
            {/* <Stack.Screen name="drawer" component={DrawerScreen}/> */}


            {/* <Stack.Screen name="DrawerScreen" component={DrawerScreen} >
            </Stack.Screen> */}
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Route

const styles = StyleSheet.create({})