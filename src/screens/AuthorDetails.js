import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AuthorShortName, PostCard} from '../commonComponent/commonComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FlatList} from 'react-native-gesture-handler';
import {getApiRequest} from '../../service/serviceManager';
import {color} from '../../utils/colors';

const AuthorDetails = ({route, navigation}) => {
  const item = route.params.item;
  const index = route.params.index;
  const flag = route.params.flag;
  console.log('item', item, flag);
  const [viewFullPostList, setViewFullPostList] = useState(false);
  const [postList, setPostList] = useState([]);
  const [topLikedPostList,setTopLikedPostList] = useState([])
  const [topCommentedPostList,setTopCommentedPostList] = useState([])
  const [numLikesOrder, setNumLikesOrder] = useState('asc');
  const [topflag,setTopflag] =useState('')
  const [datePublishedOrder, setDatePublishedOrder] = useState('asc');
  const [top10View,setTop10View] =useState(false)

  async function getpostList() {
    let postList = await getApiRequest(
      'http://localhost:3000/posts?authorId=' +
        item.id +
        '&_sort=numLikes,datePublished' +
        '&_order=' +
        numLikesOrder +
        ',' +
        datePublishedOrder,
    );
    setPostList(postList);
    //  setLoader(false)
  }
  async function gettoppostList(flag) {
    setTopflag(flag)
    let postList = await getApiRequest(
     flag == 'numlikes' ?  'http://localhost:3000/posts?authorId='+item.id+'&_sort=numLikes&_order=desc&_page=0&_limit=10' :
     'http://localhost:3000/posts?authorId='+item.id+'&_sort=numComments&_order=desc&_page=0&_limit=10'
    );
    flag == 'numlikes' ? setTopLikedPostList(postList) : setTopCommentedPostList(postList);
    //  setLoader(false)
  }
  useEffect(() => {
    if (numLikesOrder && datePublishedOrder) getpostList();
    //  setLoader(true)
    //  getAuthorList()
  }, [numLikesOrder, datePublishedOrder]);
  return (
    <View style={styles.maincontainer}>
      <View style={{height: !viewFullPostList ? '65%' : '0%'}}>
        <View
          style={{justifyContent: 'center', alignItems: 'center', margin: 10}}>
          <AuthorShortName
            item={item}
            index={index}
            style={{width: 150, height: 150, borderRadius: 80}}
            textstyle={{fontSize: 75}}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: '3%',
            }}>
            <Text style={styles.name}>
              {item.firstName} {item.lastName}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <View style={styles.iconView}>
            <Icon name="heart" size={24} color="red" />
            <Text style={styles.iconText}>{item.numLikes}</Text>
          </View>
          <View style={styles.iconView}>
            <Icon name="wpforms" size={24} color="black" />
            <Text style={styles.iconText}>{item.numPosts}</Text>
          </View>
          <View style={styles.iconView}>
            <Icon name="comments" size={24} color="grey" />
            <Text style={styles.iconText}>{item.numComments}</Text>
          </View>
        </View>
        <View
          style={{
            margin: 5,
            padding: 10,
            backgroundColor: 'white',
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <Icon name="mobile-phone" size={28} color="#020708" />
          <Text style={{fontSize: 20, paddingLeft: 5}}>{item.phone}</Text>
        </View>
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={()=>{setTop10View(true),gettoppostList("numcomments")}} >
            <Text>Top 10 commented post</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setTop10View(true),gettoppostList("numlikes")}}>
            <Text>Top 10 liked post</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: viewFullPostList ? '95%' : '30%',
          backgroundColor: 'red',
          width: '95%',
          alignSelf: 'center',
          backgroundColor: '#FFFFFF',
          borderColor: '#ccc',
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
          margin: 10,
        }}>
        <View
          style={{
            margin: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'black', fontSize: 20}}>Posts</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Icon name="heart" size={20} color="red" />
            <TouchableOpacity
              style={{paddingLeft: 5}}
              onPress={() => {
                if (numLikesOrder == 'asc') {
                  setNumLikesOrder('desc');
                } else {
                  setNumLikesOrder('asc');
                }
              }}>
              <Icon
                name={
                  numLikesOrder == 'asc'
                    ? 'arrow-circle-up'
                    : 'arrow-circle-down'
                }
                size={20}
                color="grey"
              />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Icon name="clock-o" size={20} color="red" />
            <TouchableOpacity
              style={{paddingLeft: 5}}
              onPress={() => {
                if (datePublishedOrder == 'asc') {
                  setDatePublishedOrder('desc');
                } else {
                  setDatePublishedOrder('asc');
                }
              }}>
              <Icon
                name={
                  datePublishedOrder == 'asc'
                    ? 'arrow-circle-up'
                    : 'arrow-circle-down'
                }
                size={20}
                color="grey"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              setViewFullPostList(!viewFullPostList);
            }}>
            <Text style={{color: 'grey', fontSize: 16}}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={postList}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <PostCard index={index} item={item} navigation={navigation} />
            );
          }}
        />
      </View>
      {top10View ? <View style={{position:'absolute',width:'100%',height:'100%',backgroundColor:color.backgroundColor}}>
        {console.log("topLikedPostList",flag)}
      <FlatList
          data={topflag == 'numlikes' ? topLikedPostList : topCommentedPostList
        }
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <PostCard index={index} item={item} navigation={navigation} />
            );
          }}
        />
        <TouchableOpacity style={{position:'absolute',right:0,left:0,bottom:30,justifyContent:'center',alignItems:'center',}} onPress={()=>{
          setTop10View(false)
        }}>
        
        <Icon name="times" size={50} color="grey" />

        </TouchableOpacity>
      </View>:null}
    </View>
  );
};

export default AuthorDetails;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  iconView: {
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  name: {
    fontSize: 36,
  },
  iconText: {
    fontSize: 20,
    paddingLeft: 5,
  },
});
