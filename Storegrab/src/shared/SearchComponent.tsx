import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, useTheme, IconButton } from 'react-native-paper';
import Voice from '@react-native-community/voice';

import { AppTheme } from '../../styles/theme/theme';
import MicrophoneIcon from '../../assets/icons/mic.svg';

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

  /////////////// VOICE TO SPEECH ////////////////////
  const stopRecording = async () => {
    try {
      await Voice.stop();
      setListeningStarted(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const startSpeechRecognizing = async () => {
    setListeningStarted(true);
    try {
      await Voice.start('en-US');
      setTimeout(() => {
        stopRecording();
      }, 5000);
    } catch (e) {
      console.error(e);
    }
  };

  const onMicrophoneClick = () => {
    setListeningStarted(true);
    startSpeechRecognizing();
  };

  const onSpeechStart = e => {
    console.log('speechStart successful', e);
  };
  const onSpeechEnd = e => {
    console.log('speechend successful', e);
    setListeningStarted(false);
  };
  const onSpeechError = e => {
    console.log(JSON.stringify(e.error));
  };
  const onSpeechResults = e => {
    console.log(' result ' + e.value);
    setSearchInput(e.value[0]);
    stopRecording();
  };

  const onSpeechPartialResults = e => {
    console.log(' partial result ' + e.value);
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  /////////////////////////////////////////////////////

  useEffect(() => {
    searchTextChange(searchInput);
  }, [searchInput]);

  return (
    <View style={{ width: '86%' }}>
      {listeningStarted && (
        <View
          style={{
            borderColor: colors.primary,
            borderWidth: 1,
            borderRadius: 8,
            height: 40,
            paddingLeft: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: colors.textSecondary
            }}
          >
            Listening.....
          </Text>
          <View>
            <IconButton icon="close" iconColor={colors.textSecondary} size={22} onPress={() => stopRecording()} />
          </View>
        </View>
      )}
      {!listeningStarted && (
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
            ) : (
              <TextInput.Icon
                icon={() => <MicrophoneIcon color={colors.primary} />}
                color={colors.primary}
                onPress={() => {
                  onMicrophoneClick();
                }}
              />
            )
          }
          left={<TextInput.Icon icon="magnify" />}
          outlineStyle={{ borderRadius: 8 }}
          style={{
            backgroundColor: colors.backgroundDefault,
            height: 40,
            color: colors.textSecondary
          }}
        />
      )}
    </View>
  );
};

export default SearchComponent;
