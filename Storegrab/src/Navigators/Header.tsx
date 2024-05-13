import React, { useContext, useRef } from 'react';
import { Animated, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import { AppTheme } from '@/styles/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setModalVisible } from '../../reducers/locationReducer';

interface Props {
  name?: string;
  params?: any;
}



const Header: React.FC<Props> = ({ name }) => {
  const navigation = useNavigation();
  const address = useSelector((state:any)=> state.location.defaultLocation)
  const { selectedVendor } = useSelector((state:any)=> state.vendor)
  const dispatch = useDispatch();
  const styles = StyleSheet.create({
    viewContainer: {
      flexDirection: 'row'
    },
    iconContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginRight: 10 },
    imageContainer: { padding: 16, flex: 1, paddingLeft: 10 },
    navigationContainer: { padding: 16, flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 0 },
    title: {
      fontSize: 18
    },
    image: {
      width: responsiveWidth(30),
      height: responsiveHeight(4),
      resizeMode: 'contain',
      justifyContent: 'flex-start',
      flex: 1,
      display: 'flex',
      alignItems: 'flex-start'
    },
    appbar: { margin: 0 },
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    text: {
      // Your text styles here
      fontSize: name == 'Vendors'?18:14,
      fontWeight: 'bold',
      color: 'black'
      // Add any other text styles you want
    },
    underline: {
      borderBottomWidth: 4,
      borderBottomColor: 'black',
      borderStyle: 'dotted',
      flex: 1,
    },
  });
  const { colors }: AppTheme = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [40, 0],
    extrapolate: 'clamp'
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.5],
    extrapolate: 'clamp'
  });

  const DottedUnderlineText = ( children: string ) => {
    return (
      <TouchableOpacity onPress={()=>{
        dispatch(setModalVisible(true));
      }}>
      <View style={styles.container}>
        <Text style={styles.text}>{children? children : 'select a location'}</Text>
      </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <Appbar.Header mode="small" elevated style={{ backgroundColor: colors.brightWhite, marginRight: 16 }}>
        {name != 'HomeScreen' &&
          name != 'Login' &&
          name != 'Orders' &&
          name != 'Resources' &&
          name != 'Account' && <Appbar.BackAction onPress={() => navigation.goBack()} />}
        {name != 'Home' && name != 'Login' ? (
          <Appbar.Content title={name == 'Vendors'?DottedUnderlineText(address?.formatted_address?.split(',')[0]):name} titleStyle={styles.title} />
        ) : (
          <Appbar.Content title={<Image source={require('../Assets/images/logo.png')} style={styles.image} />} />
        )}
        {name != 'Scan To Order' && (
          <Appbar.Action icon="magnify" color={colors.textDefault} style={styles.appbar} size={28} onPress={() => {}} />
        )}
      </Appbar.Header>
    </>
  );
};

export default Header;
