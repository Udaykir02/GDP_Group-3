import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';




type FilterItemProps = {
    title: string;
    children: React.ReactNode;
    filterValue?: string;
}

const FilterItem = ({
    title,
    children,
    filterValue
}: FilterItemProps) => (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            {filterValue && (
                <Text style={styles.resetText}>{filterValue}</Text>
            )}
        </View>
        {children}
    </View>
);

export default FilterItem;

const styles = StyleSheet.create({
    container: { marginVertical: 10 },
    titleContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, width: '85%' },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
        marginRight: 16,
    },
    resetText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        marginRight: 16,
        alignSelf: 'flex-end',
        alignContent: 'flex-end',
        justifyContent: 'flex-end'
    },
});