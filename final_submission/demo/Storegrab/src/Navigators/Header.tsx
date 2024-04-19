import React, { useContext, useRef } from 'react';
import { Animated, Image, StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import { AppTheme } from '@/styles/theme/theme';
import { useNavigation } from '@react-navigation/native';

interface Props {
  name?: string;
  params?: any;
}

const Header: React.FC<Props> = ({ name }) => {
  const navigation = useNavigation();

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
    appbar: { margin: 0 }
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
  return (
    <>
      <Appbar.Header mode="small" elevated style={{ backgroundColor: colors.brightWhite, marginRight: 16 }}>
        {name != 'HomeScreen' &&
          name != 'Login' &&
          name != 'Orders' &&
          name != 'VendorsScreen' &&
          name != 'Resources' &&
          name != 'Account' && <Appbar.BackAction onPress={() => navigation.goBack()} />}
        {name != 'Home' && name != 'Login' ? (
          <Appbar.Content title={name} titleStyle={styles.title} />
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
