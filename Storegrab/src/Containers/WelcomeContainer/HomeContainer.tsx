import { ORDER_DASHBOARD_TILE_TYPE } from '../../models/Constants';
import { useState } from 'react';
import { View, Button, Text, Image, ImageBackground } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import createToBeImplementedStyle from "./HomeContainerStyle";

const HomeContainer = ({ navigation }: any) => {
    const styles = createToBeImplementedStyle();
    const [loading,setIsLoading] = useState(true);

    if(!loading){
        return (    
            <SkeletonPlaceholder borderRadius={4}>
                <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                  <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
                  <SkeletonPlaceholder.Item marginLeft={20}>
                    <SkeletonPlaceholder.Item width={120} height={20} />
                    <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>)
    }
    return (
        <View style={styles.container}>
        </View>
    )
}

export default HomeContainer