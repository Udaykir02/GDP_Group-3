import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, FlatList, TouchableHighlight, View, Text } from 'react-native';


import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import useLocationService from '../../Hooks/useLocationService';
import Input from '../Input';
import { Icon, useTheme } from 'react-native-paper';
import { AppTheme } from '@/styles/theme/theme';
import SearchComponent from '../SearchComponent';
import axios from 'axios';
import { setDefaultLocation, setMapRegion } from '../../../reducers/locationReducer';
import { useNavigation } from '@react-navigation/native';
import MyIcon from '../MyIcon';
import LocationSearchBox from '../LocationSearchBox';

const { width } = Dimensions.get('screen');


const LocationContainer = ({ addresses, route, controlModal}: any) => {
    const [searching, setSearching] = useState(false);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState('');
    const [search, setSearch] = useState<any>([]);
    const [searchText, setSearchText] = useState('');
    const { colors }: AppTheme = useTheme();
    const { currentLocation } = useLocationService();
    const dispatch = useDispatch();
    const navigation:any= useNavigation();

    //   useEffect(() => {
    //     const fetchAddresses = async () => {
    //       if (addresses.length === 0) {
    //         setLoading(true);
    //         try {
    //           const getAddress = fire.functions('asia-east2').httpsCallable('getAddresses');
    //           const result = await getAddress({});
    //           if (result.data.type === 'success') {
    //             userAddresses(result.data.payload.addresses);
    //             setLoading(false);
    //           }
    //         } catch (error) {
    //           console.error('Error fetching addresses:', error);
    //         }
    //       } else {
    //         setLoading(false);
    //       }
    //     };

    //     fetchAddresses();
    //   }, []);

    const getLocation = async () => {

        let location = await currentLocation();
        // let address = await Location.reverseGeocodeAsync({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    };


    const renderRegion = async () => {
        let location = await currentLocation();
        try {

            const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + location?.location.coords.latitude + ',' + location?.location.coords.longitude + '&key=AIzaSyA8dUT9FqaVVWyicIDocW-l3PY8npYofMY');


            if (response.status === 200) {
                const address_json = await response.json();
                if (address_json.results.length > 0) {
                      dispatch(setDefaultLocation({ ...address_json.results[0], ...{ tag: false, title: '', tagaddress: '' } }));
                }
            }
        } catch (error) {

        }

        dispatch(setMapRegion({
            latitude: location?.location.coords.latitude,
            longitude: location?.location.coords.longitude,
            latitudeDelta: 0.019175200768195566,
            longitudeDelta: 0.01609325408935547
        }));
        if (route?.params?.address_search) {
            navigation.goBack();
        } else {
            controlModal(false)
            navigation.navigate('Region', { userlocation: true });
        }
    };

    const renderHeader = () => {
        return (
            <View style={{ width }}>
                <TouchableOpacity onPress={renderRegion} accessibilityLabel={'current_location_testid'} testID={'current_location_testid'}>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                        {/* <Icon name="enviromento" type="AntDesign" size={15} color="#CB202D" /> */}
                        <Text style={{ color: '#CB202D', fontSize: 15, alignSelf: 'center' }} numberOfLines={1}>
                            {'Use current location'}
                        </Text>
                    </View>
                </TouchableOpacity>
                {searchText.length > 2 ? <></> : <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderBottomWidth: 0.5, borderBottomColor: '#E9ECEF' }}>
                    <Text>
                        Saved Addresses
                    </Text>
                </View>}
            </View>
        );
    };

    const handleSubmit = (index: number) => {
        if (searchText.length>2) {
            dispatch(setMapRegion({latitude: search[index].geometry.location.lat, longitude: search[index].geometry.location.lng, latitudeDelta: 0.019175200768195566,longitudeDelta: 0.01609325408935547}))
            dispatch(setDefaultLocation({...search[index],...{tag:false,title:'',tagaddress:''}}));
            controlModal(false)
            if (route?.params?.address_search) {
              navigation.goBack()
            }
            else{
              navigation.navigate('Region', {userlocation: true})
            }
          }
          else{
            setMapRegion(addresses[index].choosenregion);
            setDefaultLocation(addresses[index].choosenlocation);
            controlModal(false)
            if (route?.params?.address_search) {
              navigation.goBack()
            }
            else{
              navigation.navigate('Region', {userlocation: true})
            }
          }
    };

    const searchTextChange = (text: string) => {
        setSearchText(text)
        if (text.length > 2) {
            setLoading(false)
            fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + text.split(" ").join("+") + '&key='+'AIzaSyA8dUT9FqaVVWyicIDocW-l3PY8npYofMY')
                .then(
                    (response) => {
                        if (response.status !== 200) {

                            return;
                        }

                        // Examine the text in the response
                        response.json().then(result => {
                            setSearch(result.results)
                            setLoading(false)
                        });
                    }
                )
                .catch(function (err) {

                });
        }
    }

    return (
        <View style={styles.home}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <LocationSearchBox searchTextChange={searchTextChange} />
                    </View>

                    <TouchableOpacity style={{ alignSelf: 'center', marginRight: 10 }} onPress={() => { controlModal(false)}}>
                        <Icon source={'close'} size={24} color={colors.textDarken} />
                    </TouchableOpacity>

                </View>
                <FlatList
                    data={searchText.length > 2 ? search : addresses}
                    ListHeaderComponent={renderHeader}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => handleSubmit(index)}>
                            <View style={{ paddingHorizontal: 10, paddingTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                                <MyIcon name='Entypo|location-pin' style={{ fontSize: 25, color: "#000"}} />
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <Text >
                                        {searchText.length > 2 ? searchText : item.title}
                                    </Text>
                                    <Text>
                                        {searchText.length > 2 ? item.formatted_address : item.address}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={searchText.length > 2 ? search : addresses}
                    refreshing={loading}
                />
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    home: {
        flex: 1,
        width,
        backgroundColor: '#FFFFFF'
    },
    articles: {
        width: width - 20,
        paddingVertical: 10
    },
    search: {
        height: 38,
        width: width - 32,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#8898AA'
    },
    divider: {
        width: '90%',
        borderWidth: 0.5,
        borderColor: '#E9ECEF'
    }
});


export default LocationContainer
