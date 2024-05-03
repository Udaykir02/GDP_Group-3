import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, useTheme, IconButton } from 'react-native-paper';

import { AppTheme } from '../styles/theme/theme';

interface Props {
  searchTextChange?: (searchValue: string) => void;
}

const SearchComponent: React.FC<Props> = ({ searchTextChange = () => {} }) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [listeningStarted, setListeningStarted] = useState<boolean>(false);
  const { colors }: AppTheme = useTheme();

  const onCloseSearch = () => {
    setSearchInput('');
    if (listeningStarted) {
      setListeningStarted(false);
    }
  };


  useEffect(() => {
    searchTextChange(searchInput);
  }, [searchInput]);

  return (
    <View style={{ width: '86%' }}>
        <TextInput
          placeholder={'Search Location'}
          dense
          value={searchInput}
          outlineColor={colors.lightGrey}
          mode="outlined"
          onChangeText={text => setSearchInput(text)}
          right={
            searchInput?.length ? (
              <TextInput.Icon icon="close" color={colors.textSecondary} onPress={() => onCloseSearch()} />
            ) : (<></>)
          }
          left={<TextInput.Icon icon="magnify" />}
          outlineStyle={{ borderRadius: 8 }}
          style={{
            backgroundColor: colors.backgroundDefault,
            height: 40,
            color: colors.textSecondary
          }}
        />
    </View>
  );
};

export default SearchComponent;
