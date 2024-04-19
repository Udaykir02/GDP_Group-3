import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Badge } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { useAppTheme } from '@/styles/theme/theme';

const styles = StyleSheet.create({
  viewContainer: {},
  badge: { position: 'absolute', top: 10, right: 4, zIndex: 1, fontSize: 12, fontWeight: '500' },
  appbar: { margin: 0 }
});

interface Props {
  count: number;
  onPress: () => void;
  icon: IconSource;
  hideBadge: boolean;
  BadgeStyle: any;
}

const IconBadge: React.FC<Props> = ({ count, onPress, icon, hideBadge = false, BadgeStyle }) => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.viewContainer}>
      {!hideBadge && (
        <>
          {Boolean(count) && (
            <Badge size={18} style={[styles.badge, BadgeStyle]}>
              {count}
            </Badge>
          )}
          <Appbar.Action icon={icon} color={colors.textDefault} onPress={onPress} size={28} style={styles.appbar} />
        </>
      )}
    </View>
  );
};

export default IconBadge;
