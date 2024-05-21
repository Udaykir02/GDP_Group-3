import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Modal, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '../../styles/theme/theme';
import AppPageWrapper from '../../shared/AppPageWrapper';
import LocationContainer from '../../Components/Location/LocationContainer';
import DeliveryCard from '../../Components/DeliveryCard';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, placeOrders } from '../../../actions/userActions';
import createToBeImplementedStyle from "../Order/OrderContainerStyle";
import { getVendorRequestByID } from '../../../actions/vendorActions';
import LoadingSpinner from '../../Components/shared/LoadingSpinner';

const OrderContainer: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const styles = createToBeImplementedStyle();
  const dispatch = useDispatch();
  const { user, vendorAdmin, token } = useSelector((state: any) => state.auth)
  const { orders, loading } = useSelector((state: any) => state.order)
  const { selectedVendor } = useSelector((state: any) => state.vendor)
  useEffect(() => {
    if (vendorAdmin) {
      if (selectedVendor && selectedVendor?.vendorId)
        dispatch(getVendorRequestByID(selectedVendor?.vendorId, token))
    } else {
      console.log('user', user?.userId ? user.userId : '')
      dispatch(getOrders(user?.userId ? user.userId : '', token))
    }
  }, [vendorAdmin])

  useEffect(() => {
    console.log('orders', orders)
  }, [orders])

  const { colors } = useAppTheme();
  if (loading)
    return (<AppPageWrapper>
      <LoadingSpinner />
    </AppPageWrapper>)
  return (
    <AppPageWrapper>
      <FlatList
        data={orders}
        // ListHeaderComponent={renderHeader}
        renderItem={({ item, index }: any) => (
          <DeliveryCard order={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
        extraData={orders}
        onEndReachedThreshold={0.1}
        //   ListFooterComponent={(moreproducts) ? <View row space="evenly" style={{ paddingVertical: 16 }}><View flex center><ActivityIndicator size="large" /></View></View> : null}
        refreshing={loading}
        // onEndReached={() => fetchMore()}
        style={styles.articles}
        showsVerticalScrollIndicator={false}
      />
    </AppPageWrapper>
  );
};

export default OrderContainer;
