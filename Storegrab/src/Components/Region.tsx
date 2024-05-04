import React, { useState, useEffect, useMemo, useCallback } from "react";
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, Image, ScrollView } from "react-native";
import MapView, { Region } from 'react-native-maps';
import { connect, useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';

import {
    setDefaultLocation,
    setChosenLocation,
    setMapRegion,
    setChosenRegion,
    setChosenAddress
} from '../../reducers/locationReducer';
import { Button, Icon } from "react-native-paper";
// import { addShops, shopsPagination } from '../../../actions/vendorActions';

const { width } = Dimensions.get("screen");

const RegionContainer = ({  navigation, route }: any) => {
    const [loading, setLoading] = useState(false);
    const [markerPoint, setMarkerPoint] = useState();
    const { region, defaultLocation } = useSelector((state: any) => state.location);
    const dispatch = useDispatch();

    useEffect(()=>{
        setMarkerPoint(region)
    },[])

    const handleSubmit = async () => {
        if (route.params.userlocation) {
            setLoading(true);
            dispatch(setChosenLocation(region));
            dispatch(setChosenRegion(region));
              navigation.navigate('VendorsTab');
        } else {
            if (route.params.edit) {
                navigation.navigate('Addresses', { edit: route.params.edit, address_index: route.params.address_index });
            } else {
                navigation.navigate('Addresses', { edit: route.params.edit });
            }
        }
    };


    const onRegionChange = async (newRegion: any) => {
        console.log(JSON.stringify(newRegion))
        dispatch(setMapRegion(newRegion));
        const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + newRegion.latitude + ',' + newRegion.longitude + '&key=AIzaSyA8dUT9FqaVVWyicIDocW-l3PY8npYofMY');
        if (response.status === 200) {
            const address_json = await response.json();
            if (address_json.results.length > 0) {
                dispatch(setDefaultLocation({ ...address_json.results[0], ...{ tag: false, title: '', tagaddress: '' } }));
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                {/* <Icon
                    source="person-pin-circle"
                    size={40}
                    color="black" /> */}
                <MapView
                    region={markerPoint}
                    onRegionChangeComplete={(newRegion) => { onRegionChange(newRegion) }}
                    style={styles.map}
                    provider='google'
                    showsMyLocationButton={true}
                >
                </MapView>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                    Please choose a more specific location below or move the pin on the map to the intended location.
                </Text>
            </View>
            <View style={styles.divider} />
            
            <View style={styles.locationContainer}>
                <Text style={styles.locationText}>
                    Select delivery location
                </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.addressContainer}>
                <View style={styles.iconContainer}>
                    {/* <Icon source="checkcircleo" size={18} color='#2881e7' /> */}
                </View>
                <TouchableOpacity onPress={() => { (route.params.userlocation) ? navigation.goBack() : navigation.navigate('Location', { address_search: true }) }}>
                    <Text style={styles.addressText} numberOfLines={1}>
                        {defaultLocation?.formatted_address}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { (route.params.userlocation) ? navigation.goBack() : navigation.navigate('Location', { address_search: true }) }}>
                    <Text style={styles.changeText}>
                        Change
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <Button color="success"  mode="contained" style={styles.button} loading={loading} disabled={loading} onPress={() => { handleSubmit() }}>
                    Confirm location & proceed
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapContainer: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    infoContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#2881e7',
    },
    infoText: {
        fontSize: 14,
        color: '#fff',
    },
    divider: {
        width: "100%",
        borderWidth: 0.5,
        borderColor: "#E9ECEF",
    },
    locationContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    locationText: {
        fontWeight: 'bold',
        fontSize: 17,
        color: "#32325D",
    },
    addressContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        minHeight: 80
    },
    iconContainer: {
        flex: 0.1,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressText: {
        flex: 0.7,
        fontSize: 14,
        color: "#32325D",
    },
    changeText: {
        flex: 0.2,
        fontSize: 13,
        color: "#CB202D",
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        width: width - 40,
    },
});

export default RegionContainer;
