import React, { useEffect, useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, View } from 'react-native';
import { Card, Divider, Icon, Text } from 'react-native-paper';
import { useAppTheme } from '../styles/theme/theme';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

const DeliveryCard: React.FC = ({order}:any) => {
  const { colors } = useAppTheme();

  useEffect(()=>{
    console.log("--->deliverycard"+JSON.stringify(order))
  })
  const styles = StyleSheet.create({
    footerContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    footerLeftContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: 20
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: 6
    },
    cardContainer: {
      padding: 16,
      backgroundColor: colors.backgroundDefault,
      elevation: 5,
      borderRadius: 8
    },
    footerChildContainer: {
      display: 'flex',
      gap: 4
    }
  });

  const setTitleValueUi = (title: string, value: string | number) => {
    return (
      <View style={styles.contentContainer}>
        <Text style={{ color: colors.textSecondary }}>{title}</Text>
        <Text style={{ color: colors.textDefault, fontWeight: '700' }}>{value}</Text>
      </View>
    );
  };

  const setTruckContainerText = (title: number, value: string) => {
    return (
      <View>
        <Text
          style={{
            color: colors.backgroundSecondary,
            fontWeight: '700',
            fontSize: responsiveScreenHeight(2),
            textAlign: 'center'
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: colors.backgroundSecondary,
            fontWeight: '700',
            fontSize: responsiveScreenHeight(0.9),
            textAlign: 'center'
          }}
        >
          {value}
        </Text>
      </View>
    );
  };

  const heightLeftAnim = useRef(new Animated.Value(responsiveScreenHeight(4.3))).current;
  const heightMiddleAnim = useRef(new Animated.Value(responsiveScreenHeight(4.3))).current;
  const heightRightAnim = useRef(new Animated.Value(responsiveScreenHeight(4.3))).current;

  const shrinkLeftHeight = () => {
    Animated.timing(heightLeftAnim, {
      toValue: responsiveScreenHeight(0),
      duration: 1000,
      useNativeDriver: false
    }).start();
  };

  const expandLeftHeight = () => {
    Animated.timing(heightLeftAnim, {
      toValue: responsiveScreenHeight(4.3),
      duration: 1000,
      useNativeDriver: false
    }).start();
  };

  const shrinkRightHeight = () => {
    Animated.timing(heightRightAnim, {
      toValue: responsiveScreenHeight(0),
      duration: 800,
      useNativeDriver: false
    }).start();
  };

  const expandRightHeight = () => {
    Animated.timing(heightRightAnim, {
      toValue: responsiveScreenHeight(4.3),
      duration: 800,
      useNativeDriver: false
    }).start();
  };

  const shrinkMiddleHeight = () => {
    Animated.timing(heightMiddleAnim, {
      toValue: responsiveScreenHeight(0),
      duration: 1000,
      useNativeDriver: false
    }).start();
  };

  const expandMiddleHeight = () => {
    Animated.timing(heightMiddleAnim, {
      toValue: responsiveScreenHeight(4.3),
      duration: 800,
      useNativeDriver: false
    }).start();
  };

// Function to get the estimated time remaining
const getEstimatedTimeRemaining = () => {
  const endTimeDate: any = new Date(order.endTime);
  const currentTimeDate:any = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = endTimeDate - currentTimeDate;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return days.toString()+"d "+hours.toString()+"h" ;
}

  return (
    <View style={{ marginVertical: 10}}>
      <Card style={styles.cardContainer}>
        <View>
          <Text variant="titleMedium" style={{ color: colors.primary }}>Estimated {getEstimatedTimeRemaining()}</Text>
          <View style={[styles.contentContainer, { alignItems: 'center', marginVertical: 10 }]}>
            <Icon source="truck-outline" size={24} color={colors.primary} />
            <Text style={{ color: colors.primary, fontWeight: '700' }}>On the Way</Text>
          </View>
        </View>
        {setTitleValueUi('Vendor', order.vendorId)}
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              position: 'relative',
              height: responsiveScreenHeight(10),
              width: responsiveScreenWidth(85.5)
            }}
          >
            <Image
              source={require('../Assets/images/truck-images/truck.gif')}
              style={{ height: responsiveScreenHeight(10), width: responsiveScreenWidth(85.5) }}
            />

            {/* <ImageBoxContainer variant="left" left="9.9%" />
            <ImageBoxContainer variant="middle" left="34.73%" />
            <ImageBoxContainer variant="right" left="59.5%" /> */}

            <Animated.View
              style={{
                height: heightLeftAnim, // Bin
                // width: responsiveScreenWidth(19.5),
                width: '22.75%',
                position: 'absolute',
                zIndex: 1,
                top: responsiveScreenHeight(1),
                // left: responsiveScreenWidth(8.413),
                left: '9.9%'
              }}
            >
              <Pressable
                onPress={() => {
                  // setImgClickDataObj({ ...imgClickDataObj, leftClick: true });
                  shrinkLeftHeight();

                  setTimeout(() => {
                    //  setImgClickDataObj({ ...imgClickDataObj, leftClick: false });
                    expandLeftHeight();
                  }, 5000);
                }}
              >
                <Image
                  source={require('../Assets/images/truck-images/door-left.png')}
                  style={{
                    height: '100%',
                    width: '100%'
                  }}
                />
              </Pressable>
            </Animated.View>

            <Animated.View
              style={{
                height: heightMiddleAnim, // Bin
                // width: responsiveScreenWidth(19.5),
                width: '22.75%',
                position: 'absolute',
                zIndex: 1,
                top: responsiveScreenHeight(1),
                // left: responsiveScreenWidth(29.75)
                left: '34.73%'
              }}
            >
              <Pressable
                onPress={() => {
                  // setImgClickDataObj({ ...imgClickDataObj, leftClick: true });
                  shrinkMiddleHeight();

                  setTimeout(() => {
                    //  setImgClickDataObj({ ...imgClickDataObj, MiddleClick: false });
                    expandMiddleHeight();
                  }, 5000);
                }}
              >
                <Image
                  source={require('../Assets/images/truck-images/door-middle.png')}
                  style={{
                    height: '100%',
                    width: '100%'
                  }}
                />
              </Pressable>
            </Animated.View>

            <Animated.View
              style={{
                height: heightRightAnim, // Bin
                // width: responsiveScreenWidth(19.5),
                width: '22.9%',
                position: 'absolute',
                zIndex: 1,
                top: responsiveScreenHeight(1),
                // left: responsiveScreenWidth(51.04)
                left: '59.5%'
              }}
            >
              <Pressable
                onPress={() => {
                  // setImgClickDataObj({ ...imgClickDataObj, leftClick: true });
                  shrinkRightHeight();

                  setTimeout(() => {
                    //  setImgClickDataObj({ ...imgClickDataObj, RightClick: false });
                    expandRightHeight();
                  }, 5000);
                }}
              >
                <Image
                  source={require('../Assets/images/truck-images/door-middle.png')}
                  style={{
                    height: '100%',
                    width: '100%'
                  }}
                />
              </Pressable>
            </Animated.View>

            <View
              style={{
                position: 'absolute',
                bottom: responsiveScreenHeight(5.3),
                // left: responsiveScreenWidth(17.5)
                left: '20%'
              }}
            >
              {setTitleValueUi('Order Id', order?.orderId)}
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: responsiveScreenHeight(5.3),
                // left: responsiveScreenWidth(38.2),
                left: '44.5%'
              }}
            >
              {setTitleValueUi('Payment Status', order?.paymentStatus)}
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: responsiveScreenHeight(5.3),
                // left: responsiveScreenWidth(59.2)
                left: '69.5%'
              }}
            >
              {setTitleValueUi('Status', order?.status)}
            </View>
          </View>
        </View>
        <Divider style={{ marginVertical: 12 }} />
        <View style={styles.footerContainer}>
          <View style={styles.footerLeftContainer}>
            <View style={styles.footerChildContainer}>
              {setTitleValueUi('Items', order?.items?.length)}
            </View>
            <View style={styles.footerChildContainer}>

            </View>
          </View>
          <View style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <Text variant="titleMedium" style={{ color: colors.textDefault }}>
              ${order?.totalCost}
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default DeliveryCard;
