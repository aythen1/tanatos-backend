import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import MyOrderCard from './MyOrderCard';

import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';
import OrderNotFound from './OrderNotFound';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ApiRequest, { ApiRequestGet } from '../../Services/ApiRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastMessage} from '../../utils/Toast';

const Completed = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [orderData, setOrderData] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const [account_Type, setAccountType] = useState();

  // const [isModalVisibleCat, setModalVisibleCat] = useState(false);
  const handleOrderData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const account_Type = await AsyncStorage.getItem('account_Type');
    const store_id = await AsyncStorage.getItem('store_id');
    if (user_id) {
      try {
        setLoading(true);
        const dataForReq = {
          type: `/orders/${store_id}/orders/completed`,
       data:{
        table_name: 'orders',
        status: 'completed',
       }
        };
        // if (account_Type === 'customer') {
        //   dataForReq.own = 1;
        //   dataForReq.user_id = JSON.parse(user_id);
        // } else if (account_Type === 'store') {
        //   dataForReq.store_id = JSON.parse(store_id);
        // }
        // setRefreshing(false)
        setAccountType(account_Type);
        const res = await ApiRequestGet(dataForReq);
        const resp = res.data;

        setOrderData(resp);
        // console.log(resp, 'resp new order');
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }
  };

  //
  //
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    handleOrderData();
  };
  const [bottomLoader, setBottomLoader] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    setScrolled(true);
  };

  const handleOrderDataMore = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const account_Type = await AsyncStorage.getItem('account_Type');
    const store_id = await AsyncStorage.getItem('store_id');

    try {
      setBottomLoader(true);
      const dataForReq = {
        type: 'get_data',
        table_name: 'orders',
        status: 'completed',
        last_id: orderData[orderData.length - 1]?.id,
      };
      if (account_Type === 'customer') {
        dataForReq.own = 1;
        dataForReq.user_id = JSON.parse(user_id);
      } else if (account_Type === 'store') {
        dataForReq.store_id = JSON.parse(store_id);
      }
      // setRefreshing(false)
      setAccountType(account_Type);
      const res = await ApiRequest(dataForReq);
      const resp = res.data.data;
      setBottomLoader(false);
      if (resp && resp != undefined && resp.length > 0) {
        setOrderData([...orderData, ...resp]);
      }
      // setOrderData(resp);
      // console.log(resp, 'resp new order');
    } catch (err) {
      setBottomLoader(false);
    } finally {
      setLoading(false);
      setBottomLoader(false);
      setRefreshing(false);
    }
  };

  const handleOrderCancelData = async id => {
    // console.log(id, 'idddididi');
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setLoading(true);
      const res = await ApiRequest({
        type: 'update_data',
        table_name: 'orders',
        status: 'cancelled',
        id: id,
        // status: pending, completed, cancelled, accepted
      });
      const resp = res.data;
      if (resp?.result) {
        ToastMessage(resp.message);
        handleOrderData();
        navigation.navigate('Cancelled');
      }
      // console.log(resp, 'kkk');
      // setOrderData(resp);
    } catch (err) {
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  const handleOrderUpdateData = async id => {
    // console.log(id, 'idddididi');
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setLoading(true);
      const res = await ApiRequest({
        type: 'update_data',
        table_name: 'orders',
        status: 'accepted',
        id: id,
        // status: pending, completed, cancelled, accepted
      });
      const resp = res.data;
      if (resp?.result) {
        ToastMessage(resp.message);
        handleOrderData();
        navigation.navigate('Processing');
      }
      // console.log(resp, 'kkk');
      // setOrderData(resp);
    } catch (err) {
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    handleOrderData();
  }, [isFocused]);

  // const acceptedOrders = orderData?.filter(item => item?.status === 'pending');

  return (
    <Layout>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onScroll={handleScroll}
        onEndReached={scrolled ? handleOrderDataMore : null}
        ListEmptyComponent={<OrderNotFound />}
        ListFooterComponent={
          bottomLoader && <ActivityIndicator size="large" color={colors.gray} />
        }
        ListFooterComponentStyle={{
          width: '100%',
          marginTop: 5,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={orderData}
        renderItem={({item}) => {
          // const itemsArray = JSON.parse(item.items);}
          return (
            <MyOrderCard
              // key={index}
              // images={item.images}
              name={
                account_Type === 'store' ? item.esquela.name : item?.store?.name
              }
              // price={item?.store?.price}
              location={
                account_Type === 'store'
                  ? item.esquela.funeral_location
                  : item?.store?.location
              }
              phone={
                account_Type === 'store'
                  ? item.esquela.short_message
                  : item?.store?.phone
              }
              totalPrice={item.total_amount}
              // address={item.address}
              // status={item.status}
              // accept={() => handleOrderUpdateData(item.id)}
              // cancel={() => handleOrderCancelData(item.id)}
              onPress={() =>
                navigation.navigate('OrderAllDetails', {
                  item: item,
                  // funeral: orderData.funeral,
                  orderid: item.id,
                  total_amount: item.total_amount,
                  image: item.esquela?.image,
                  store: item.store,
                  dataToShow: item.items,
                  esquela: item.esquela,
                  message: item?.sympathy_text,
                  // status: pending, completed, cancelled, accepted
                  status: 'completed',
                  account_Type: account_Type,
                })
              }
            />
          );
        }}
      />
    </Layout>
  );
};

export default Completed;

const styles = StyleSheet.create({});
