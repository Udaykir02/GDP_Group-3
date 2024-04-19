import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Text, useTheme, Card, Badge } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { IOrderDashboardTile } from '../../models/Home';
import IUser from '../../models/User';
import { ORDER_DASHBOARD_TILE_TYPE } from '../../models/Constants';

import { AppTheme } from '../../styles/theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  tile: IOrderDashboardTile;
  data: IUser;
  index: number;
  orderDashboardClick: (tile: IOrderDashboardTile) => void;
}

const OrderDashboardCard: React.FC<Props> = ({ tile, data, index, orderDashboardClick }) => {
  const { colors }: AppTheme = useTheme();
  const windowWidth = Dimensions.get('window').width;

  const styles = StyleSheet.create({
    imgContainer: { flexDirection: 'row', justifyContent: 'center' },
    iconContainer: { marginTop: 0 },
    iconStyle: { color: colors.textDefault },
    iconView: {
      padding: 10,
      backgroundColor: colors.lightGrey,
      borderRadius: 100
    },
    img: { width: 32, height: 32 },
    count: {
      backgroundColor: colors.primary,
      fontSize: 12,
      fontWeight: 'bold',
      paddingHorizontal: 8
    },
    badge: {
      backgroundColor: colors.primary,
      color: colors.brightWhite,
      fontSize: 12,
      fontWeight: 'bold',
      borderRadius: 10,
      padding: 4,
      paddingHorizontal: 6
    },
    textContainer: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 5 },
    title: { fontWeight: '700', marginTop: 10, fontSize: 13 },
    dashboardCard: {
      width: (windowWidth - 48) / 2,
      elevation: 5,
      zIndex: 1099,
      alignItems: 'center',
      backgroundColor: colors.backgroundDefault,
      marginVertical: 10,
      paddingVertical: 13,
      marginTop: 5
    },
    dashboardContainer: {
      paddingHorizontal: 5,
      alignItems: 'center'
    }
  });

  const onOrderDashboardClick = tile => {
    orderDashboardClick(tile);
  };

  return (
    <TouchableOpacity onPress={() => onOrderDashboardClick(tile)} key={index}>
      <Card mode="elevated" style={[styles.dashboardCard, index % 2 ? { marginLeft: 16 } : {}]}>
        <View style={styles.dashboardContainer}>
          <View style={styles.iconContainer}>
            {tile.type === ORDER_DASHBOARD_TILE_TYPE.UNSUBMITTED_ORDER && (
              <View style={styles.iconView}>
                <MaterialIcons name="shopping-cart-checkout" size={32} style={styles.iconStyle} />
              </View>
            )}
            {tile.type === ORDER_DASHBOARD_TILE_TYPE.UPCOMING_DELIVERIES && (
              <View style={styles.iconView}>
                <MaterialCommunityIcons name="truck-outline" size={32} style={styles.iconStyle} />
              </View>
            )}
            {tile.type === ORDER_DASHBOARD_TILE_TYPE.CREDIT_REQUESTS && (
              <View style={styles.iconView}>
                 <MaterialCommunityIcons name="credit-card-plus-outline" size={32} style={styles.iconStyle} />
              </View>
            )}
            {tile.type === ORDER_DASHBOARD_TILE_TYPE.PRE_BOOK_ITEMS && (
              <View style={styles.iconView}>
              </View>
            )}
          </View>
          <Text style={styles.title}>{tile.title}</Text>
          <View style={[styles.textContainer]}>
            {!data.isMultiStore && tile.type === ORDER_DASHBOARD_TILE_TYPE.UPCOMING_DELIVERIES ? (
              <>
                <Text>{tile.count}</Text>

                <View style={[styles.badge]}>
                  <Text style={{ color: colors.brightWhite }}>{tile.status}</Text>
                </View>
              </>
            ) : (
              <>
                <Badge style={[styles.count, tile.flag ? {} : { backgroundColor: colors.alertRed }]} size={25}>
                  {tile.count}
                </Badge>
                <Text style={{ color: colors.textDefault }}>{tile.status}</Text>
              </>
            )}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderDashboardCard;
