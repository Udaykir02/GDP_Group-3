import React, { useContext } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { Icon, Menu, Text, useTheme } from 'react-native-paper';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';

import useModalState from '../../hooks/useModalState';
import LocationSelector from './LocationSelector';
import GlobalContext from '../core/GlobalContext';

import { AppTheme } from '../../styles/theme/theme';

interface Props {
  locationHeaderTextChange?: boolean;
  closeOnSelection?: boolean;
}

const LocationViewer: React.FC<Props> = ({ locationHeaderTextChange, closeOnSelection }) => {
  const { activeLocation, isAllLocationSelected, hideAllLocation } = useContext(GlobalContext);
  const windowHeight = Dimensions.get('window').height;

  const { colors }: AppTheme = useTheme();

  const {
    modalState: visibleLocationModal,
    toggle: toggleVisibleLocation,
    close: closeVisibleLocationModal
  } = useModalState();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundDefault,
      paddingHorizontal: 3,
      paddingVertical: 8,
      shadowColor: colors.textDarken,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
      marginBottom: 2
    },
    headerContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 8
    },
    modalContainerStyle: {
      backdropColor: colors.backgroundDefault,
      marginTop: -290
    }
  });

  return (
    <View style={{ width: responsiveScreenWidth(100) }}>
      <Menu
        visible={visibleLocationModal}
        onDismiss={closeVisibleLocationModal}
        anchorPosition="bottom"
        keyboardShouldPersistTaps
        contentStyle={{
          paddingTop: 0,
          paddingBottom: 1,
          width: responsiveScreenWidth(100),
          marginLeft: -10
        }}
        style={{ marginTop: 0 }}
        anchor={
          <View>
            <Pressable onPress={toggleVisibleLocation}>
              <View style={[styles.container]}>
                <View style={styles.headerContainer}>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                    <Icon source={'map-marker-outline'} size={24} color={colors.primary} />
                    <Text style={{ fontWeight: '700', color: colors.textDefault }}>
                      {isAllLocationSelected && !hideAllLocation
                        ? 'All Locations'
                        : `${activeLocation?.name} #${activeLocation?.opcoCustomerId}`}
                    </Text>
                  </View>
                  {locationHeaderTextChange ? (
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          color: colors.primary,
                          fontWeight: '700',
                          textAlign: 'center'
                        }}
                      >
                        {!visibleLocationModal ? 'Change\nLocation' : 'Done'}
                      </Text>
                    </View>
                  ) : (
                    <Icon
                      source={!visibleLocationModal ? 'chevron-down' : 'chevron-up'}
                      size={24}
                      color={colors.primary}
                    />
                  )}
                </View>
              </View>
            </Pressable>
          </View>
        }
      >
        <LocationSelector
          closeOnSelection={closeOnSelection}
          toggleModal={toggleVisibleLocation}
          locationListHeight={windowHeight - 350}
        />
      </Menu>
    </View>
  );
};

export default LocationViewer;
