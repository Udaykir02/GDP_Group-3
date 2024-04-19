import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

import

interface Props {
  imageData: IResourceItem[];
}
const PromotionCarousel: React.FC<Props> = ({ imageData }) => {
  const promotionalImageList: IResourceItem[] = imageData;

  const styles = StyleSheet.create({
    scrollview: { flex: 1 },
    loading: { flexDirection: 'row', height: responsiveScreenHeight(10), width: responsiveScreenWidth(92) },
    img: {
      width: '100%',
      height: '100%',
      resizeMode: 'stretch',
      borderRadius: 10
    },
    card: {
      marginVertical: 5,
      marginLeft: 0,
      alignItems: 'center',
      justifyContent: 'center',
      width: responsiveScreenWidth(34),
      height: responsiveScreenHeight(14)
    }
  });

  return (
    <ScrollView horizontal={true} style={styles.scrollview}>
      <View style={{ flex: 1 }}>
        <Carousel
          style={{ width: responsiveScreenWidth(100) }}
          width={responsiveScreenWidth(95) / 2.6}
          height={responsiveScreenWidth(32)}
          scrollAnimationDuration={0}
          loop
          //autoPlay
          data={promotionalImageList}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <Image style={styles.img} source={{ uri: item.imageUrl }} key={index} />
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default PromotionCarousel;
