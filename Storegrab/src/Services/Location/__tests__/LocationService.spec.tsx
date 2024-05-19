import * as requestLocation from '../LocationService'

import { PERMISSIONS } from 'react-native-permissions'
import  { getCurrentPosition } from '../LocationService'


describe('requestLocation', () => {
  it('returns the correct permission status', async () => {
    jest.spyOn(requestLocation, 'requestPermission').mockResolvedValueOnce({
      isGranted: true,
      'android.permission.ACCESS_COARSE_LOCATION': 'granted',
      'android.permission.ACCESS_FINE_LOCATION': 'granted',      
      'ios.permission.LOCATION_ALWAYS': 'granted',
      'ios.permission.LOCATION_WHEN_IN_USE': 'granted',
    })
    const result = await requestLocation.requestPermission()
    expect(result.isGranted).toBe(true)
    expect(result[PERMISSIONS.IOS.LOCATION_ALWAYS]).toBe('granted')
    expect(result[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).toBe('granted')   
    expect(result[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]).toBe('granted')
    expect(result[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).toBe('granted')
    
  })
  it('should return location data if permission is granted', async () => {
    // Place your location cordinates before checking the location sevice 
    const locationData = {
      coords: {
        latitude: 0,
        longitude: -122.4194,
        altitude: 0,
        accuracy: 0,
        altitudeAccuracy: 0,
        heading: 0,
        speed: 0
      },
      timestamp: 0
    };
    const result = await requestLocation.requestLocation();
    expect(result?.location.coords.latitude).toEqual(locationData.coords.latitude);
  });
  it('should resolve  when getCurrentposiotion successeded ', async () => {
    const result = getCurrentPosition()
    await expect(result).resolves.toBeTruthy()
  })
  it('returns null if permission is denied', async () => {
    jest.spyOn(requestLocation, 'requestPermission').mockResolvedValueOnce({
      isGranted: false,
      'android.permission.ACCESS_COARSE_LOCATION': 'denied',
      'android.permission.ACCESS_FINE_LOCATION': 'denied',    
      'ios.permission.LOCATION_ALWAYS': 'denied',
      'ios.permission.LOCATION_WHEN_IN_USE': 'denied',     
    })
    const result = await requestLocation.requestPermission()
    expect(result.isGranted).toBe(false)
    expect(result[PERMISSIONS.IOS.LOCATION_ALWAYS]).toBe('denied')
    expect(result[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).toBe('denied')   
    expect(result[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]).toBe('denied')
    expect(result[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).toBe('denied') 
  })
  it('should resolve  when getRequestLocation successeded ', async () => {
    const result = requestLocation.requestLocation()
    await expect(result).resolves.toBeTruthy()
  })
})
