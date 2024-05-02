import { Linking, Platform } from 'react-native'
import {
  requestMultiple,
  PERMISSIONS,
  Permission,
  PermissionStatus,
  RESULTS,
  request,
} from 'react-native-permissions'
//import Geolocation from 'react-native-geolocation-service'
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation'

export interface RequestLocationReturnType {
  location: GeolocationResponse
  permissions: PermissionsGrantedType
}

export interface PermissionsGrantedType {
  isGranted: boolean
  [PERMISSIONS.IOS.LOCATION_ALWAYS]: PermissionStatus
  [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]: PermissionStatus
  [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]: PermissionStatus
  [PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]: PermissionStatus
}

/**
 * Fetches the locartion of the user, checks if the permission is available before requesting.
 * @returns {Promise<Geolocation.GeoPosition | null>}
 * @throws {Error} if an error occurs while fetching the location or requesting permissions.
 */
export const requestLocation =
  async (): Promise<RequestLocationReturnType | null> => {
    const perms = await requestPermission()
    if (perms.isGranted) {
      const data = await getCurrentPosition()
      return {
        location: data,
        permissions: perms,
      }
    }
    return null
  }

export const requestPermission = async () => {
  try {
    const perms = await requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.IOS.LOCATION_ALWAYS,
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    ])
    //console.log('granted', perms)
    const newPerms = { ...perms, isGranted: false }
    if (Platform.OS === 'ios') {
      newPerms.isGranted =
        perms[PERMISSIONS.IOS.LOCATION_ALWAYS] === 'granted' ||
        perms[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === 'granted'
    } else {
      newPerms.isGranted =
        perms[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === 'granted' ||
        perms[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === 'granted'
    }
    return newPerms
  } catch (err) {
    throw err
  }
}

/**
 * Fetches the current location of the device
 * @returns {Promise<Geolocation.GeoPosition>}
 */
export const getCurrentPosition = (): Promise<GeolocationResponse> => {
  return new Promise(async (resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve(position)
      },
      error => {
        reject(error)
      },
      {
        enableHighAccuracy: true,
        // Remove timeout and maximum age as they were causing problems in some devices
      },
    )
  })
}
