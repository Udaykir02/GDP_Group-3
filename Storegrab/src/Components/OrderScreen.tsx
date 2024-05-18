import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

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

const OrderScreen: React.FC<Props> = ({ navigation, route }: any) => {
    const { order }: Props = route.params;
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.subHeader}>Order ID: {order.orderId}</Text>
            <Text>Status: {order.status}</Text>
            <Text>Payment Status: {order.paymentStatus}</Text>
            <Text>Total Cost: {order.currency} {order.totalCost}</Text>
            <Text>Order Time: {new Date(order.orderTime).toDateString()}</Text>
            {order.endTime && <Text>End Time: {new Date(order.endTime).toLocaleString()}</Text>}

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Shipping Information</Text>
                <Text>Carrier: {order.shipping.carrier}</Text>
                <Text>Tracking: {order.shipping.tracking}</Text>
                <Text>Address: {order.shipping.address.street1}, {order.shipping.address.street2}, {order.shipping.address.city}, {order.shipping.address.state}, {order.shipping.address.country} - {order.shipping.address.zip}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Items</Text>
                {order.items.map((item, index) => (
                    <View key={item.skuId} style={styles.item}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemHeader}>{item.item}</Text>
                            <Text>Brand: {item.brand}</Text>
                            <Text>Price: {order.currency} {item.price.toFixed(2)}</Text>
                            <Text>Quantity: {item.qty}</Text>
                            <Text>Size: {item.size.h}x{item.size.l}x{item.size.w}</Text>
                            <Text>Features: {item.features}</Text>
                            <Text>Categories: {item.categories.join(', ')}</Text>
                            <Text>Description: {item.description}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
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

export default OrderScreen;
