import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Menu, useTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useModalState from '../../hooks/useModalState';

import { AppTheme } from '../../styles/theme/theme';
import { SORT_MENU } from '../../models/Constants';
import SortIcon from '../../assets/icons/sort.svg';
interface Props {
  sortMenuOption: (value: string) => void;
}

const SortMenu: React.FC<Props> = ({ sortMenuOption }) => {
  const { colors }: AppTheme = useTheme();

  const {
    modalState: visibleFilterModal,
    open: openVisibleFilterModal,
    close: closeVisibleFilterModal
  } = useModalState();

  const sortMenuItems = [
    {
      title: SORT_MENU.A_TO_Z,
      onPress: () => {
        sortMenuOption(SORT_MENU.A_TO_Z);
        closeVisibleFilterModal();
      }
    },
    {
      title: SORT_MENU.Z_TO_A,
      onPress: () => {
        sortMenuOption(SORT_MENU.Z_TO_A);
        closeVisibleFilterModal();
      }
    },
    {
      title: SORT_MENU.ACCOUNT_ASCENDING,
      onPress: () => {
        sortMenuOption(SORT_MENU.ACCOUNT_ASCENDING);
        closeVisibleFilterModal();
      }
    },
    {
      title: SORT_MENU.ACCOUNT_DESCENDING,
      onPress: () => {
        sortMenuOption(SORT_MENU.ACCOUNT_DESCENDING);
        closeVisibleFilterModal();
      }
    }
  ];

  useEffect(() => {}, []);

  return (
    <View>
      <Menu
        visible={visibleFilterModal}
        onDismiss={closeVisibleFilterModal}
        anchorPosition="bottom"
        keyboardShouldPersistTaps
        contentStyle={{ backgroundColor: colors.backgroundDefault }}
        anchor={
          <TouchableOpacity onPress={openVisibleFilterModal} style={{ marginRight: 5 }}>
            {/* <Image source={require('../../assets/images/filter-icon.png')} style={{ width: 24, height: 24 }} /> */}
            <SortIcon style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        }
      >
        {sortMenuItems.map((menuItem, index) => (
          <Menu.Item key={index} rippleColor={colors.primary} onPress={menuItem.onPress} title={menuItem.title} />
        ))}
      </Menu>
    </View>
  );
};

export default SortMenu;
