import { ORDER_DASHBOARD_TILE_TYPE } from '../../models/Constants';
import { useState } from 'react';
import { View, Button, Text, Image, ImageBackground, Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import createToBeImplementedStyle from "./HomeContainerStyle";
import DealCard from '../../Components/DealCard';
import SaleItem from '../../Components/SaleItem';
import AppSwiper from '../../Components/AppSwiper';
const SCREEN_WIDTH = Dimensions.get('window').width;
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
                <View style={{ flex: 1, backgroundColor: '#d5d5d6' }}>
                    <AppSwiper />
                    <View style={{ flexDirection: 'row', height: SCREEN_WIDTH / 3, backgroundColor: '#fff' }}>
                        <SaleItem imageUri={require('../../Assets/images/clone_dummy/sale_0.jpg')} />
                        <SaleItem imageUri={require('../../Assets/images/clone_dummy/sale_1.jpg')} />
                        <SaleItem imageUri={require('../../Assets/images/clone_dummy/sale_2.jpg')} />
                    </View>
                    <View style={{ flex: 1, height: 90, backgroundColor: '#2874f0', paddingHorizontal: 10 }}>
                        <ImageBackground
                            source={require('../../Assets/images/clone_dummy/deal_of_day_bg.jpg')}
                            style={{ width: '100%', height: '100%' }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#2874f090' }}>

                                <View>
                                    <Text style={{ fontSize: 18, color: '#fff' }}>Deal of the Day</Text>
                                    <Text style={{ color: '#fff' }}>16hr 32m remaning</Text>
                                </View>

                                <Text style={{ backgroundColor: '#fff', fontWeight: '400', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 2 }}>
                                    View All
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#2874f0', padding: 10 }}>
                        <View style={{ flex: 1, flexDirection: "row", backgroundColor: '#fff', borderRadius: 5, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            <DealCard
                                imageUri={require('../../Assets/images/clone_dummy/deal1.jpeg')}
                                heading="Headphones&Speakers"
                                price="Under ₹1049"
                            />
                            <DealCard
                                imageUri={require('../../Assets/images/clone_dummy/deal2.jpeg')}
                                heading="Laptop Skins"
                                price="Under ₹129"
                            />
                            <DealCard
                                imageUri={require('../../Assets/images/clone_dummy/deal3.jpeg')}
                                heading="Mixers & Hand Blenders"
                                price="Under ₹699"
                            />
                            <DealCard
                                imageUri={require('../../Assets/images/clone_dummy/deal4.jpeg')}
                                heading="Home Decor Range"
                                price="Under ₹999"
                            />
                        </View>
                    </View>
                </View>
        </View>
    )
}

export default HomeContainer