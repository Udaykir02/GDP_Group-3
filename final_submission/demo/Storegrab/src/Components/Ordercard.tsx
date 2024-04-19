import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, IconButton, Modal, Portal, Text, useTheme, Card, Divider } from 'react-native-paper';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import NetInfo from '@react-native-community/netinfo';

import { dateTimeConvert } from '../../utils/dataConvert';
import { IOrders } from '../../models/Orders';
import notificationHandler from '../../utils/notificationHandler';

import GlobalContext from '../core/GlobalContext';

import { AppTheme } from '../../styles/theme/theme';

interface Props {
  data: IOrders;
  index: number;
  isSubmitted: boolean;
  init: () => void;
}

const OrderCard: React.FC<Props> = ({ data, index, isSubmitted, init }) => {
  const { colors }: AppTheme = useTheme();

  const { user, orderDataService, activeCartCount, isAllLocationSelected } = useContext(GlobalContext);

  const [visible, setVisible] = React.useState(false);

  const [deleteData, setDeleteData] = React.useState<IOrders|undefined>();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const deleteOrder = async (datas: IOrders) => {
    let isNetConnected = true;
    await NetInfo.addEventListener(state => {
      isNetConnected = !!state.isInternetReachable;
    });

    if (isNetConnected) {
      const res = await orderDataService.deleteOrderById(user.userId, datas.updatedDeviceId, datas.orderId);
      if (res.status === 200) {
        await orderDataService.deleteOrderByIdInDb(datas.orderId);
        await orderDataService.deleteAllOrderDetailsByOrderId(datas.orderId);
      } else {
        const currentUTCDate = new Date().toISOString();
        const formattedUTCDate = currentUTCDate.slice(0, 19) + '.000';

        await orderDataService.offlineUpdateOrderDetailsByOrderId(datas.orderId, formattedUTCDate);
      }
      hideModal();
    } else {
      const currentUTCDate = new Date().toISOString();
      const formattedUTCDate = currentUTCDate.slice(0, 19) + '.000';

      await orderDataService.offlineUpdateOrderDetailsByOrderId(datas.orderId, formattedUTCDate);
      hideModal();
    }

    notificationHandler.show({
      message: `Your order ${datas?.orderId} ${
        user.isMultiStore ? `for ${user?.locations[0]?.name}` : ''
      } has been deleted`
    });

    init();
  };

  const styles = StyleSheet.create({
    container: {
      padding: 12,
      paddingHorizontal: 18,
      paddingTop: 16,
      backgroundColor: colors.brightWhite,
      marginBottom: 15,
      borderRadius: 8
    },
    border: {
      borderWidth: 2,
      borderColor: colors.primary
    },
    headerDiv: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    bodyContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    },
    bodyTitle: {
      color: colors.textSecondary,
      fontWeight: '400',
      fontSize: 12
    },
    bodyContent: {
      color: colors.textDefault,
      fontWeight: '700',
      fontSize: 12
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: 4
    },
    deviceContainer: {
      marginTop: 1.5,
      borderWidth: 1,
      paddingVertical: 3,
      paddingHorizontal: 6,
      borderRadius: 8,
      borderColor: colors.textSecondary
    },
    footer: {
      flex: 1
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    footerRow: {
      flexDirection: 'row'
    },
    footerRowTop: {
      flexDirection: 'row',
      marginBottom: 5
    },
    footerTitle: {
      marginRight: 3
    },
    bodyContentBold: {
      color: colors.textDefault,
      fontWeight: '700'
    },
    outlinedBtn: {
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 24,
      marginLeft: 5
    },
    IconCart: { marginLeft: 5 },
    activeCard: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 10
    },
    IconButton: {
      alignSelf: 'flex-start',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginTop: -5,
      marginRight: 0
    },
    textMemo: { marginTop: 10 },
    footerLeftContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 14
    },
    divider: {
      marginVertical: 10
    },
    footerTextContainer: {
      marginTop: 5
    },
    headerOrder: {
      marginTop: 2
    },
    textActiveCart: {
      color: colors.primary,
      fontWeight: '700',
      fontSize: 12
    },
    titleMedium: {
      color: colors.textDefault,
      fontWeight: '500'
    },
    modalFooter: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 15
    },
    btnFont: {
      fontSize: 12,
      fontWeight: '700'
    },
    containerStyle: { backgroundColor: colors.brightWhite, padding: 20, margin: 30, borderRadius: 10 },
    modalTextContainer: { fontWeight: '700', lineHeight: 0, color: colors.textDefault },
    deleteBtnContainer: {
      marginBottom: -10,
      marginTop: 8,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end'
    }
  });

  return (
    <>
      <Card
        mode="elevated"
        elevation={1}
        style={[styles.container, index === 0 && !isSubmitted && !isAllLocationSelected ? styles.border : {}]}
      >
        <View style={styles.headerDiv}>
          <View style={styles.headerOrder}>
            {index === 0 && !isSubmitted && !isAllLocationSelected && (
              <View style={styles.activeCard}>
                <Text style={styles.textActiveCart}>Active Cart </Text>
                <View style={styles.IconCart}>
                  <Icon size={17} color={colors.primary} source={'cart-outline'} />
                </View>
              </View>
            )}
            <Text
              style={{ color: colors.primary, marginBottom: index === 0 && !isSubmitted ? 10 : 0 }}
              variant="titleMedium"
            >
              Order # {data?.orderId}
            </Text>
            {isSubmitted && (
              <View style={{ ...styles.textContainer, marginBottom: 8, marginTop: 4 }}>
                <Text style={styles.bodyTitle}>Confirmation Code</Text>
                <Text style={{ ...styles.bodyContent, fontWeight: 'bold' }}>{data.confNumber}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.bodyContainer}>
          <View style={{ width: responsiveScreenWidth(70) }}>
            <View style={{ ...styles.textContainer, marginTop: 4 }}>
              <Text style={[styles.bodyTitle, { marginBottom: 10 }]}>
                {isSubmitted ? 'Submitted On' : 'Last Updated'}
              </Text>
              <Text style={styles.bodyContent}>{dateTimeConvert(data.updatedDateTime)}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.bodyTitle}>{isSubmitted ? 'Submitted By' : 'Last Updated By'}</Text>
              <Text style={styles.bodyContent}>{data.updatedBy}</Text>
            </View>
            {data.memo && (
              <View style={[styles.textContainer, styles.textMemo]}>
                <Text style={styles.bodyTitle}>Memo </Text>
                <Text style={[styles.bodyContent, { fontWeight: '400' }]}>{data?.memo}</Text>
              </View>
            )}
          </View>
          <View style={[styles.deviceContainer]}>
            <Text>{data?.lastUpdatedPlatform}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.footerContainer}>
          <View style={styles.footerLeftContainer}>
            <View>
              <View style={styles.textContainer}>
                <Text style={styles.bodyTitle}>Items</Text>
                <Text style={styles.bodyContentBold}>
                  {index === 0 && !isSubmitted && !isAllLocationSelected ? activeCartCount : data.totalLineItemCount}
                </Text>
              </View>
              <View style={[styles.textContainer, styles.footerTextContainer]}>
                <Text style={styles.bodyTitle}>Cartons</Text>
                <Text style={styles.bodyContentBold}>{data.totalCartonCount}</Text>
              </View>
            </View>
            <View>
              <View style={styles.textContainer}>
                <Text style={styles.bodyTitle}>Tags</Text>
                <Text style={styles.bodyContentBold}>{data.totalLabelCount}</Text>
              </View>
              <View style={[styles.textContainer, styles.footerTextContainer]}>
                <Text style={styles.bodyTitle}>PO</Text>
                <Text style={styles.bodyContentBold}>{data.customerPurchaseOrder}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text variant="titleMedium" style={{ color: colors.textDefault }}>
              ${Number(data?.netValue)?.toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={styles.deleteBtnContainer}>
          {!isSubmitted && (
            <IconButton
              icon="delete"
              size={20}
              rippleColor="transparent"
              onPress={() => {
                setDeleteData(data);
                showModal();
              }}
              style={styles.IconButton}
            />
          )}
        </View>
      </Card>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
          <Text variant="displayMedium" style={styles.modalTextContainer}>
            {`Are you sure you want to delete ${deleteData?.orderId}?`}
          </Text>
          <View style={styles.modalFooter}>
            <Button onPress={hideModal} labelStyle={styles.btnFont}>
              Cancel
            </Button>
            <Button
              style={styles.outlinedBtn}
              contentStyle={{ margin: -4 }}
              labelStyle={styles.btnFont}
              onPress={async () => {
                deleteData && await deleteOrder(deleteData);              }}
            >
              Delete
            </Button>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default OrderCard;
