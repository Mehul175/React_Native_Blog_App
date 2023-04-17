import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getApiRequest} from '../../service/serviceManager';
import { color } from '../../utils/colors';

export const AuthorCard = ({item, index, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Author Detail', {item, index,flag:'fromauthor'});
      }}
      style={[
        styles.card,
        {
          borderLeftColor:
            index % 2 ? color.lightbrown : index % 3 ?color.lightgreen:color.pink,
        },
      ]}>
      <View style={{flexDirection: 'row'}}>
        <AuthorShortName
          item={item}
          index={index}
          style={{width: 48, height: 48}}
          textstyle={{fontSize: 20}}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: '3%',
          }}>
          <Text>
            {item.firstName} {item.lastName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export const AuthorShortName = ({item, index, style, textstyle}) => {
  return (
    <View style={[styles.shortName, style]}>
      <Text
        style={[
          styles.name,
          textstyle,
          {color: index % 2 ? '#e6bbad' : index % 3 ? '#ade6bb' : '#e6add8'},
        ]}>
        {item.firstName[0]}
        {item.lastName[0]}
      </Text>
    </View>
  );
};

export const PostCard = ({item, index, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Post Screen', {item, index});
      }}
      style={[
        styles.card,
        {
          borderLeftColor:
            index % 2 ? color.lightbrown : index % 3 ? color.lightgreen : color.pink,
        },
      ]}>
      <View style={{}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: '3%',
          }}>
          <Text style={{color: 'black', fontSize: 16}}>{item.title} </Text>
        </View>
        <View
          style={{
            marginLeft: '3%',
          }}>
          <Text style={{color: 'grey'}}>
            {moment(item.datePublished).format('MMMM Do YYYY, h:mm:ss a')}
          </Text>
          <View
            style={{
              padding: 5,
              backgroundColor: 'white',
              flexDirection: 'row',
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Icon name="heart" size={14} color="red" />
              <Text style={styles.iconText}>
                {item.numLikes}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
              }}>
              <Icon name="comments" size={14} color="grey" />
              <Text style={styles.iconText}>
                {item.numComments}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const CommentCard = ({item, index, navigation}) => {
  const [authorDetail, setAuthorDetail] = useState();
  // const [loader,setLoader] = useState(false)
  async function getAuthorList() {
    let authorList = await getApiRequest(
      'http://127.0.0.1:3000/authors?id=' + item.authorId,
    );
    setAuthorDetail(authorList[0]);
    // setLoader(false)
  }
  useEffect(() => {
    // setLoader(true)
    getAuthorList();
  }, []);
  return (
    <View
      style={[
        styles.commentCard,
        {
          borderLeftColor:
            index % 2 ? '#e6bbad' : index % 3 ? '#ade6bb' : '#e6add8',
        },
      ]}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Author Detail',   {item:authorDetail, index,flag:'frompost'});
        }}
        style={{flexDirection: 'row'}}>
        {authorDetail && (
          <AuthorShortName
            item={authorDetail}
            index={index}
            style={{width: 30, height: 30}}
            textstyle={{fontSize: 12}}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: '2%',
          }}>
          <Text style={{fontSize: 12, color: 'black'}}>
            {authorDetail?.firstName} {authorDetail?.lastName}
          </Text>
        </View>
      </TouchableOpacity>
      <Text numberOfLines={1} style={{fontSize: 12}}>
        {item.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    borderLeftWidth: 3,
  },
  commentCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 5,
    // marginVertical: 5,
    padding: 5,
    borderRadius: 10,
    elevation: 4,
  },
  shortName: {
    elevation: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ':#FFFFFF',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconText:{
    fontSize: 12,
     paddingLeft: 5
    }
});
