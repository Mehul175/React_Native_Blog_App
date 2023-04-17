import {ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getApiRequest } from '../../service/serviceManager';
import { CommentCard } from '../commonComponent/commonComponent';


const PostScreen = ({route, navigation}) => {
  const item = route.params.item;
  const index = route.params.index;
  const [commentList,setCommentList] = useState()
  const [loader,setLoader] = useState(false)

  async function getcommentList(){
    let authorList= await getApiRequest('http://127.0.0.1:3000/comments?postId='+item?.id)
    setCommentList(authorList)
     setLoader(false)

 }
 useEffect(()=>{
     setLoader(true)
    getcommentList()
 },[])
  return (
    <ScrollView style={{flex: 1,backgroundColor:'#FFFFFF'}}>

      <View style={{margin:10}} >
        <Text style={{color: 'black', textAlign: 'center', fontSize: 26}}>
          {item.title}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <View
            style={{
              margin: 5,
              padding: 10,
              backgroundColor: 'white',
              flexDirection: 'row',
            }}>
            <Icon name="heart" size={24} color="red" />
            <Text style={{fontSize: 20, paddingLeft: 5}}>{item.numLikes}</Text>
          </View>
          
          <View
            style={{
              margin: 5,
              padding: 10,
              backgroundColor: 'white',
              flexDirection: 'row',
            }}>
            <Icon name="comments" size={24} color="grey" />
            <Text style={{fontSize: 20, paddingLeft: 5}}>
              {item.numComments}
            </Text>
          </View>
        </View>
      <View style={{margin:10}} >

      <Text style={{color: 'black', textAlign: 'justify', fontSize: 14}}>
          {item.description}
        </Text>
        </View>
        {!loader && commentList ? <FlatList
      data={commentList}
      keyExtractor={item => item.id}
    //   onEndReached={()=>{

    //   }}
    //   onEndReachedThreshold ={0.1}
      renderItem={({item,index})=>{
        return(
           <CommentCard item={item} index={index} navigation={navigation}/>
        )
      }}
      /> : <ActivityIndicator style={{flex:1,alignSelf:'center'}}/>
        } 
    </ScrollView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({});
