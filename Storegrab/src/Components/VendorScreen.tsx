import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Linking, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
const  { width, height} = Dimensions.get('screen');
const VendorScreen = ({ navigation, route }: any) => {
    const [routeCoordinates, setRouteCoordinates] = useState<any>([]);

    const address = useSelector((state:any)=> state.location.defaultLocation)
    const { region } = useSelector((state:any)=> state.location)
    const [mapRegion, setMapRegion] = useState(region);
    useEffect(()=>{
        console.log("----->"+JSON.stringify(region))
        console.log("----->"+JSON.stringify(route?.params?.vendor))
    },[])
    useEffect(() => {
        console.log(route?.params?.vendor.geopoint.coordinates)
        fetchRoute()
    }, [route?.params?.vendor])

    const fetchRoute = async () => {
        try {
            const originLat = region?.latitude;
            const originLng = region?.longitude;
            const destLat = route?.params?.vendor?.geopoint.coordinates[1];
            const destLng = route?.params?.vendor?.geopoint.coordinates[0];
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${originLat},${originLng}&destination=${destLat},${destLng}&key=${process.env.GOOGLE_MAPS_API}`
            );
            const data = await response.json();
            if (data.status === 'OK') {
                
                const polyline = data.routes[0].overview_polyline.points;
                const decodedPolyline = decodePolyline(polyline);
                setRouteCoordinates(decodedPolyline);
                adjustMapRegion(decodedPolyline)
            } else {
                console.error('Error fetching route:', data.status);
            }
        } catch (error) {
            console.error('Error fetching route:', error);
        }
    };

    // Function to decode polyline points
    const decodePolyline = (encoded: any) => {
        const poly = [];
        let index = 0,
            len = encoded.length;
        let lat = 0,
            lng = 0;

        while (index < len) {
            let b,
                shift = 0,
                result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
            lat += dlat;
            shift = 0;
            result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
            lng += dlng;

            const latitude = lat / 1e5;
            const longitude = lng / 1e5;
            poly.push({ latitude, longitude });
        }
        return poly;
    };
    // Function to open the vendor's website in the default browser
    const openWebsite = () => {
        if (route?.params?.vendor.website) {
            Linking.openURL(route?.params?.vendor.website);
        }
    };

    // Function to adjust map region based on route coordinates
    const adjustMapRegion = (coords: any) => {
        if (coords.length > 0) {
            const minLat = Math.min(...coords.map((coord: any) => coord.latitude));
            const maxLat = Math.max(...coords.map((coord: any) => coord.latitude));
            const minLng = Math.min(...coords.map((coord: any) => coord.longitude));
            const maxLng = Math.max(...coords.map((coord: any) => coord.longitude));
            const deltaLat = maxLat - minLat;
            const deltaLng = maxLng - minLng;

            setMapRegion({
                latitude: (maxLat + minLat) / 2,
                longitude: (maxLng + minLng) / 2,
                latitudeDelta: deltaLat * 1.2,
                longitudeDelta: deltaLng * 1.2,
            });
        }
    };

    const handleSubmit = () => {

    }
    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <MapView region={mapRegion} style={styles.map} showsMyLocationButton showsUserLocation zoomControlEnabled>
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeColor="#00f"
                        strokeWidth={3}
                    />
                    <Marker
                        coordinate={{
                            latitude: route?.params?.vendor?.geopoint?.coordinates[1],
                            longitude: route?.params?.vendor?.geopoint?.coordinates[0],
                        }}
                        title={route?.params?.vendor?.vendor_name}
                        description={route?.params?.vendor?.vendor_location}
                        pinColor="red" // Customize the marker color
                    />
                </MapView>
            </View>
            <View style={styles.otherView}>
                <View style={styles.otherView}>
                    {/* Render vendor data */}
                    <Text style={styles.title}>{route?.params?.vendor.vendor_name}</Text>
                    <Text style={styles.info}>Location: {route?.params?.vendor.vendor_location}</Text>
                    <Text style={styles.info}>Contact: {route?.params?.vendor.vendor_contact_info}</Text>
                    <Text style={styles.info}>Rating: {route?.params?.vendor.rating}</Text>
                    <Text style={styles.info}>Employees: {route?.params?.vendor.employees}</Text>
                    <Text style={styles.info}>Founded Year: {route?.params?.vendor.founded_year}</Text>
                    <Text style={styles.description}>{route?.params?.vendor.vendor_description}</Text>
                    {/* {route?.params?.vendor.website && (
                        <Text style={styles.link} onPress={openWebsite}>Website</Text>
                    )} */}
                </View>
                <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={styles.button}
                    labelStyle={styles.buttonText}
                >
                    {'Select Vendor'}
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
    otherView: {
        flex: 1,
        backgroundColor: '#fff', // Example background color
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    info: {
        fontSize: 18,
        marginBottom: 5,
    },
    description: {
        fontSize: 18,
        marginBottom: 10,
        fontStyle: 'italic',
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    button: {
        marginRight: 50,
        marginLeft: 50,
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#68a0cf',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        width: width - 16 * 2,
        position: 'absolute',
        bottom: 50
    
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
});

export default VendorScreen;
