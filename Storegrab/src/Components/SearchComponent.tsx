import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, useTheme, IconButton } from 'react-native-paper';

import { AppTheme } from '../styles/theme/theme';
import { useRoute } from '@react-navigation/native';

interface Props {
  searchTextChange?: (searchValue: string) => void;
  searchStyle?: any;
  placeHolder?: string;
  searchText?: string;
  selectLocationTextChange?: (searchValue: string) => void;

}

const SearchComponent: React.FC<Props> = ({ searchTextChange = () => {}, searchStyle, placeHolder, searchText, selectLocationTextChange  }) => {
  const [searchInput, setSearchInput] = useState<string>(searchText?searchText:'');
  const [listeningStarted, setListeningStarted] = useState<boolean>(false);
  const { colors }: AppTheme = useTheme();
  const route = useRoute();

  const onCloseSearch = () => {
    setSearchInput('');
    if (listeningStarted) {
      setListeningStarted(false);
    }
  };


  useEffect(() => {
    (route.name === 'LocationContainer') && searchTextChange(searchInput);
  }, [searchInput]);

  if(route.name === 'LocationContainer'){
    return (
      <View style={[{ width: '86%' },searchStyle?searchStyle: null]}>
          <TextInput
            placeholder={placeHolder?placeHolder:'Search Location'}
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
  }

  return (
    <View style={[{ width: '86%' },searchStyle?searchStyle: null]}>
        <TextInput
          placeholder={placeHolder?placeHolder:'Search Location'}
          dense
          value={searchText?searchText:searchInput}
          outlineColor={colors.lightGrey}
          mode="outlined"
          onChangeText={text => searchTextChange?searchTextChange(text):setSearchInput(text)}
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
