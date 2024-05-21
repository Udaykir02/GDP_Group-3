import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';

import { ILocation } from '@/models/User';
import GlobalContext from '../core/GlobalContext';

import { AppTheme } from '@/styles/theme/theme';
import SearchComponent from '../shared/SearchComponent';
import SortMenu from '../shared/SortMenu';
import { SORT_MENU } from '../../models/Constants';

interface Props {
  toggleModal?: () => void;
  locationListHeight: number;
  closeOnSelection?: boolean;
}

const LocationSelector: React.FC<Props> = ({ toggleModal, locationListHeight, closeOnSelection }) => {
  const { user, activeLocation, setActiveLocation, isAllLocationSelected, setIsAllLocationSelected, hideAllLocation } =
    useContext(GlobalContext);
  const [searchInput, setSearchInput] = useState<string>('');
  const { colors }: AppTheme = useTheme();

  const remainingLocations = user.locations.filter(
    location => location.opcoCustomerId !== activeLocation?.opcoCustomerId
  );

  const [locationList, setLocationList] = useState<ILocation[] | undefined>(
    activeLocation
      ? [activeLocation, ...remainingLocations.sort((a, b) => a.name.localeCompare(b.name))]
      : [...user.locations.sort((a, b) => a.name.localeCompare(b.name))]
  );

  const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      backgroundColor: colors.backgroundDefault,
      borderTopWidth: 1,
      borderTopColor: colors.lightGrey
    },

    headerContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 12
    },

    flatListContainer: {
      maxHeight: locationListHeight,
      width: '100%',
      marginTop: 8
    }
  });

  const sortMenuFilterChange = value => {
    let sortedData = null;
    switch (value) {
      case SORT_MENU.A_TO_Z:
        sortedData = (activeLocation ? remainingLocations : [...user.locations]).sort((a, b) => {
          return a.name.localeCompare(b.name); // Case-insensitive sorting
        });

        setLocationList(activeLocation ? [activeLocation, ...sortedData] : [...sortedData]);
        break;
      case SORT_MENU.Z_TO_A:
        sortedData = (activeLocation ? remainingLocations : [...user.locations]).sort((a, b) => {
          return b.name.localeCompare(a.name); // Case-insensitive sorting
        });

        setLocationList(activeLocation ? [activeLocation, ...sortedData] : [...sortedData]);
        break;
      case SORT_MENU.ACCOUNT_ASCENDING:
        sortedData = (activeLocation ? remainingLocations : [...user.locations]).sort(
          (a, b) => a.opcoCustomerId - b.opcoCustomerId
        );

        setLocationList(activeLocation ? [activeLocation, ...sortedData] : [...sortedData]);
        break;
      case SORT_MENU.ACCOUNT_DESCENDING:
        sortedData = (activeLocation ? remainingLocations : [...user.locations]).sort(
          (a, b) => b.opcoCustomerId - a.opcoCustomerId
        );

        setLocationList(activeLocation ? [activeLocation, ...sortedData] : [...sortedData]);
        break;
    }
  };

  const onSortMenuItemClick = value => {
    sortMenuFilterChange(value);
  };

  useEffect(() => {
    if (searchInput.length) {
      const tempLocationList = user.locations;
      const localLocationList = tempLocationList.filter(
        location =>
          location.address1.toLowerCase().includes(searchInput.toLowerCase()) ||
          location.address2.toLowerCase().includes(searchInput.toLowerCase()) ||
          location.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          location.opcoCustomerId.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
          location.city.toLowerCase().includes(searchInput.toLowerCase()) ||
          location.state.toLowerCase().includes(searchInput.toLowerCase()) ||
          location.country.toLowerCase().includes(searchInput.toLowerCase()) ||
          location.zipcode.toString().toLowerCase().includes(searchInput.toLowerCase())
      );
      setLocationList(localLocationList);
    } else {
      setLocationList(
        activeLocation
          ? [activeLocation, ...remainingLocations.sort((a, b) => a.name.localeCompare(b.name))]
          : [...user.locations.sort((a, b) => a.name.localeCompare(b.name))]
      );
    }
  }, [searchInput]);

  const onSearchChange = text => {
    setSearchInput(text);
  };

  useEffect(() => {
    if (activeLocation?.opcoCustomerId) {
      const remainingLocations = user.locations.filter(
        location => location.opcoCustomerId !== activeLocation.opcoCustomerId
      );

      setLocationList([activeLocation, ...remainingLocations.sort((a, b) => a.name.localeCompare(b.name))]);
    }
  }, [activeLocation]);

  return (
    <GestureHandlerRootView>
      <View>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <SearchComponent searchTextChange={onSearchChange} />
            <SortMenu sortMenuOption={onSortMenuItemClick}></SortMenu>
          </View>
          <View style={styles.flatListContainer}>
            {!hideAllLocation && !searchInput.length && (
              <TouchableOpacity
                onPress={() => {
                  setIsAllLocationSelected(true);
                  if (toggleModal) {
                    toggleModal();
                  }
                }}
              >
                <View
                  style={[
                    {
                      borderBottomColor: colors.lightGrey,
                      borderBottomWidth: 1,
                      paddingHorizontal: 16,
                      paddingBottom: 12,
                      paddingTop: 8
                    },
                    isAllLocationSelected && {
                      backgroundColor: colors.primarySuperLight
                    }
                  ]}
                >
                  <Text style={{ fontWeight: '700' }}>All Locations</Text>
                </View>
              </TouchableOpacity>
            )}
            <FlatList
              data={locationList}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={async () => {
                    setActiveLocation(item);
                    setIsAllLocationSelected(false);
                    if (toggleModal && closeOnSelection) {
                      toggleModal();
                    }
                  }}
                >
                  <View
                    key={index}
                    style={[
                      !isAllLocationSelected &&
                        activeLocation?.name === item.name && {
                          backgroundColor: colors.primarySuperLight
                        },
                      {
                        borderBottomColor: colors.lightGrey,
                        borderBottomWidth: 1,
                        paddingVertical: 16
                      }
                    ]}
                  >
                    <View style={{ paddingHorizontal: 16, display: 'flex', gap: 2 }}>
                      <Text style={{ fontWeight: '700' }}>
                        {item.name} #{item.opcoCustomerId}
                      </Text>
                      <Text style={{ color: colors.textSecondary, textTransform: 'capitalize' }}>
                        {item.address1} {item.address2}
                      </Text>
                      <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ color: colors.textSecondary, textTransform: 'capitalize' }}>{item.city} </Text>
                        <Text style={{ color: colors.textSecondary }}>
                          {item.state} {item.zipcode}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default LocationSelector;
