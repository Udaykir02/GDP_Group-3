import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Portal, Snackbar, useTheme, Text, IconButton } from 'react-native-paper';

import { AppTheme } from '@/styles/theme/theme';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';

export interface CustomToastProps {
  message?: string;
  icon?: string;
  label?: string;
  callBackFunc?: { title: string; func: () => void };
}
export interface CustomToastHandles {
  show: (arg0: CustomToastProps) => void;
  hide: () => void;
}

const CustomToast = forwardRef<CustomToastHandles, any>((_, ref) => {
  const { colors }: AppTheme = useTheme();
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [callBackFunc, setSallBackFunc] = useState(null);

  useImperativeHandle(ref, () => ({
    show: Props => {
      setMessage(Props.message);

      if (Props.callBackFunc) {
        setSallBackFunc(Props.callBackFunc);
      }
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
      setMessage('');
    }
  }));

  const iconPress = () => {
    setVisible(false);
    setMessage('');
  };

  const clickCallbackFunction = (arg0: { func: () => void }) => {
    arg0.func();
  };

  return (
    <Portal>
      <Snackbar
        style={{ bottom: responsiveScreenHeight(5), marginHorizontal: 12, alignItems: 'center' }}
        visible={visible}
        duration={5000}
        onDismiss={iconPress}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 8,
            alignItems: 'flex-start',
            justifyContent: 'space-between'
          }}
        >
          <View style={{ width: '86%' }}>
          </View>

          <IconButton
            icon={'close'}
            onPress={iconPress}
            iconColor={colors.backgroundDefault}
            style={{ marginTop: -10 }}
          />
        </View>
        {callBackFunc ? (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginRight: 8,
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <TouchableOpacity onPress={() => clickCallbackFunction(callBackFunc)}>
              <Text variant="titleSmall" style={{ color: colors.primaryLight, fontWeight: '500' }}>
                {callBackFunc.title}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </Snackbar>
    </Portal>
  );
});

CustomToast.displayName = 'CustomToast';
export default CustomToast;
