import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getApiRequest} from '../../service/serviceManager';
import {FlatList} from 'react-native-gesture-handler';
import {AuthorCard} from '../commonComponent/commonComponent';
import { color } from '../../utils/colors';

const AuthorList = ({navigation}) => {
  const [authorList, setAuthorList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  async function getAuthorList() {
    let getauthorList = await getApiRequest(
      'http://127.0.0.1:3000/authors?_page=' + currentPage + '&_limit=20',
    );
    setAuthorList([...authorList, ...getauthorList]);
    setLoader(false);
  }
  function onRefresh() {
    setLoader(true);
    setCurrentPage(0);
    setAuthorList([]);
    getAuthorList();
  }
  useEffect(() => {
    setLoader(true);
    getAuthorList();
  }, [currentPage]);

  const renderLoader = () => {
    return loader ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#ccc" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    console.log('loademore');
    setCurrentPage(currentPage + 1);
  };
  return (
    <View style={styles.maincontainer}>
      {authorList ? (
        <FlatList
          data={authorList}
          keyExtractor={({item, index}) => index}
          refreshControl={
            <RefreshControl
              onRefresh={() => onRefresh()}
              refreshing={isRefreshing}
            />
          }
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
          renderItem={({item, index}) => {
            return (
              <AuthorCard index={index} item={item} navigation={navigation} />
            );
          }}
        />
      ) : (
        <ActivityIndicator size="large" style={{alignSelf: 'center'}} />
      )}
    </View>
  );
};

export default AuthorList;

const styles = StyleSheet.create({
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:color.backgroundColor
  },
});
