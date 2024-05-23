import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

interface Size {
    h: number;
    l: number;
    w: number;
}

interface Item {
    skuId: string;
    item: string;
    price: number;
    qty: number;
    size: Size;
    features: string;
    categories: string[];
    image: string;
    description: string;
    brand: string;
}

interface Address {
    street1: string;
    street2: string;
    city: string;
    state: string;
    country: string;
    zip: string;
}

interface Shipping {
    address: Address;
    origin: Address;
    carrier: string;
    tracking: string;
}

interface Order {
    orderId: string;
    userId: string;
    paymentId: string;
    vendorId: string;
    paymentStatus: string;
    paymentMethod: string;
    status: string;
    currency: string;
    totalCost: number;
    items: Item[];
    shipping: Shipping;
    orderTime: Date;
    endTime?: Date;
}

interface Props {
    order: Order;
}

const Tracking: React.FC<Props> = ({ navigation, route }: any) => {
    const { order }: Props = route.params;

    const getTimeString = (dateString: any) => {
        return new Date(dateString).getMonth()+"/"+new Date(dateString).getDate()+"/"+new Date(dateString).getFullYear()
    }

    const timelineData = [
        ...[{ time: getTimeString(order.orderTime), title: 'Order Placed', description: 'Your order has been placed.' },
        { time: getTimeString(new Date(new Date().getTime())), title: 'Order Confirmed', description: 'Your order has been confirmed.' },
        { time: getTimeString(new Date(new Date().getTime() + 60*60*24*1000)), title: 'Shipped', description: 'Your order has been shipped.' }],
        ...(order.endTime ? [{ time: getTimeString(order.endTime), title: 'Order Completed', description: 'Your order has been completed.' }] : [])
    ];

    return (
        <View style={styles.container}>
                <Text style={styles.sectionHeader}>Order Tracking</Text>
                <Timeline
                    data={timelineData}
                    circleSize={20}
                    circleColor='rgba(0,0,255,0.2)'
                    lineColor='rgba(0,0,255,0.2)'
                    timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
                    timeStyle={{
                        textAlign: 'center',
                        backgroundColor: '#ff9797',
                        color: 'white',
                        padding: 5,
                        borderRadius: 13
                    }}
                    descriptionStyle={{ color: 'gray' }}
                    options={{
                        style: { paddingTop: 5 }
                    }}
                />

            {/* Rest of your code */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    subHeader: {
        fontSize: 18,
        marginBottom: 8,
    },
    section: {
        marginTop: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    item: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    itemImage: {
        width: 100,
        height: 100,
        marginRight: 16,
    },
    itemDetails: {
        flex: 1,
    },
    itemHeader: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Tracking;
