import React, { useContext } from 'react';
import { StyleSheet, View, Modal, SafeAreaView, Dimensions } from 'react-native';
import { Button, Divider, Text, useTheme, Portal } from 'react-native-paper';

import _isEmpty from 'lodash-es/isEmpty';

import LocationSelector from './LocationSelector';
import GlobalContext from '../core/GlobalContext';

import { AppTheme } from '@/styles/theme/theme';

interface Props {
  cancelClick: () => void;
  continueClick: () => void;
  visibleModal: boolean;
}

const LocationModal: React.FC<Props> = ({ cancelClick, continueClick, visibleModal }) => {
  const { user, activeLocation, setUser } = useContext(GlobalContext);
  const windowHeight = Dimensions.get('window').height;
  const { colors }: AppTheme = useTheme();

  const styles = StyleSheet.create({
    btnContainer: {
      alignSelf: 'flex-end',
      flexDirection: 'row',
      paddingRight: 16,
      width: '100%',
      bottom: 30,
      position: 'absolute',
      justifyContent: 'flex-end'
    },

    btnFont: {
      fontSize: 12,
      fontWeight: '700'
    }
  });

  const onLocationSelectionClick = async () => {
    setUser({ ...user, lastSelectedLocation: activeLocation.opcoCustomerId });
    continueClick();
  };

  return (
    <Modal visible={visibleModal} onDismiss={cancelClick}>
      <SafeAreaView style={{ flex: 1 }}>
        <Portal.Host>
          <View>
            <View style={{ paddingLeft: 16 }}>
              <Text variant="displayMedium" style={{ fontWeight: '400', color: colors.textDefault }}>
                Select Location
              </Text>
            </View>
            <Divider style={{ backgroundColor: colors.lightGrey }} />
            <LocationSelector locationListHeight={windowHeight - 300} closeOnSelection={false} />
          </View>
          <View style={styles.btnContainer}>
            <Button
              mode="text"
              onPress={() => {
                cancelClick();
                // setActiveLocation(null);
              }}
            >
              Cancel
            </Button>
            <View>
              <Button
                mode="outlined"
                labelStyle={styles.btnFont}
                style={[{ borderColor: activeLocation ? colors.primary : colors.lightGrey }]}
                disabled={_isEmpty(activeLocation)}
                onPress={onLocationSelectionClick}
              >
                Continue
              </Button>
            </View>
          </View>
        </Portal.Host>
      </SafeAreaView>
    </Modal>
  );
};

export default LocationModal;
